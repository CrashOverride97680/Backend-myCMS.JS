// IMPORT MODULES NODEJS
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
// BUFFER LIBRARY
const buffer = require('buffer').Buffer;
// PASSWORD LIBRARY IMPORTING
const generator = require('secure-random-password');
// IMPORTING LOCAL CACHING BLACKLIST
const blkLocal = process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('../autentication/blacklist-local/blacklist-local')
  : null;
// IMPORT MONGO DB ( MONGOSCHEMA )
const mongoose = require('mongoose');
// IMPORT SMTP ( IMPORTING SMTP)
// IMPORTING LANG AND DEBUG
const langServer = `../../lang/${process.env.LANG_SERVER || 'eng'}`;
const lang = require(langServer);
// IMPORT ENV DATA OR DEBUG
const secret = process.env.SECRET_KEY || 'secret_key';
const bcrypt = require('bcryptjs');

const testUser = process.env.NODE_ENV_DEV
  ? {
    id: Math.floor(Math.random() * (999999999 - 99999999 + 1) + 99999999),
    admin: true,
    email: 'email@test.xd',
    password: 'testUser',
    username: 'TestUser',
    surname: 'TestUser',
    confirmed: true,
  }
  : null;
const testUserMail = process.env.NODE_ENV_DEV
  ? {
    from: 'test@test.test',
    to: 'test@test.test',
    email: 'email@test.xd',
    subject: 'test',
    username: 'testUsername',
  }
  : null;
//  REDIS CACHING MODULE
const redis = !process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('redis')
  : null;
const redisConfig = !process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('../cache/config/config')
  : null;
//  IMPORTING CACHING WHITELIST FOR REGENERATE TOKEN
const whtlstlocal = !process.env.NODE_ENV_LOCAL_WHITELIST
  ? require('../autentication/whitelist-local/whitelist-local')
  : null;
//  IMPORTING GENERAL FUNCTIONS
const fs = require('fs');
const path = require('path');
const genFunctions = require('../general');
const smtp = require('../smtp/smtp');

const files = path.join(__dirname, '..', '..', 'uploads');
const configEmail = require('../smtp/config/config');

const expLogin = (process.env.NODE_ENV_EXP_TOKEN_LOGIN) ? process.env.NODE_ENV_EXP_TOKEN_LOGIN : '1d';
const expSTMP = (process.env.NODE_ENV_TOKEN_EMAIL_SMTP) ? process.env.NODE_ENV_TOKEN_EMAIL_SMTP : '15m';
//  EXPORTING MODULE
module.exports = {
/*
-------------------------------------------------------------------------

        CONTROLLER TEST THIS PART OF CODE CONTENT ALL TEST
        FOR TESTING CMS

-------------------------------------------------------------------------
*/
  // FATTO
  test: (req, resp) => {
    resp
      .json({
        resp: lang.LABEL_JSON_STATUS_NUMBER,
        server: lang.LABEL_JSON_STATUS,
      });
  },
  // FATTO
  adminCreateForTesting: (req, resp) => {
    try {
      const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        token: req.headers.authorization,
      };
      const passwords = generator.randomPassword({
        length: process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH ? process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH : 10,
        characters: [generator.lower, generator.upper, generator.digits],
      });

      if (process.env.NODE_ENV_TEST) {
        user.password = passwords;
        console.log(lang.LANG_DEBUG_DATA, user);
      }

      bcrypt
        .hash(passwords, 10, (err, hash) => {
          if (!err) {
            if (process.env.NODE_ENV_TEST) {
              console.log(lang.LANG_DEBUG_HASH, hash);
              console.log(lang.LANG_DEBUG_PASSWORD, passwords);
            }

            const findUser = mongoose.model('user', 'users');
            findUser.find(
              {
                email: user.email,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_DATA, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }
                if (data.length > 2) {
                  console.log(lang.LANG_DEBUG_MULTIPLE_DATA_COLLECTION, data);
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                } else if (data.length > 0) {
                  if (data[0].confirmed === false) {
                    resp
                      .status(202)
                      .json(lang.LABEL_RESEND_EMAIL);
                  } else {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                } else {
                  const createUser = mongoose.model('user', 'users');
                  const dateObj = new Date();
                  createUser.create(
                    {
                      admin: user.admin,
                      email: user.email,
                      password: hash,
                      username: user.username,
                      name: user.name,
                      surname: user.surname,
                      admin: true,
                      create: dateObj.toISOString(),
                    }, (err, result) => {
                      if (err === null) {
                        resp
                          .status(201)
                          .json(lang.LABEL_201_HTTP);
                      }
                    },
                  );
                }
              },
            );
          } else {
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  testMail: (req, resp) => {
    smtp
      .testMail()
      .then((data) => {
        const SMTPConfig = smtp.createTransport({
          host: data.smtp.host,
          port: data.smtp.port,
          secure: data.smtp.secure,
          auth: {
            user: data.user,
            pass: data.pass,
          },
        });
        smtp
          .send({
            SMTPConfig,
            from: testUserMail.from,
            to: testUserMail.to,
            subject: testUserMail.subject,
            html: smtp.template.register({ username: testUserMail }),
          })
          .then((rejection) => {
            if (rejection.accepted) {
              resp
                .status(200)
                .json(lang.LABEL_ACCEPTED_SMTP);
            } else {
              resp
                .status(500)
                .json(lang.LABEL_ERROR_SMTP);
            }
          })
          .catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
      })
      .catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
  },
  // FATTO
  testSendingEmail: (req, resp) => {
    const SMTP_CONFIG = smtp.createTransport(configEmail);
    smtp.createTransport(configEmail).verify((error, success) => {
      if (error) { console.error(error); } else { console.log('works?', success); }
    });
    smtp
      .send({
        SMTPConfig: SMTP_CONFIG,
        from: configEmail.user,
        to: configEmail.auth.user,
        subject: lang.LANG_TEST_SMTP_SUBJECT,
        html: smtp.template.testSend,
      })
      .then((result) => {
        resp
          .status(200)
          .json(lang.LABEL_200_HTTP);
      })
      .catch((err) => {
        console.log(lang.LANG_DEBUG_ERROR, err);
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      });
  },
  // FATTO
  secretTest: (req, resp) => resp.json(lang.LABELL_ACCESS_PAGE),
  // FATTO
  checkTokenTest: (req, resp) => {
    const token = req.headers.authorization;
    console.log('AUTHORIZATION:', token);
    jwt
      .verify(token, secret, (err, decoded) => {
        if (!err) {
          resp
            .status(200)
            .json({
              info: lang.LABEL_DECODE_TOKEN_TEST,
              message: decoded,
            });
        } else {
          console.log(lang.LABEL_ERROR_RETURN, err);
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        }
      });
  },
  // FATTO
  sendTestToken: (req, resp) => {
    const id = generator.randomPassword({
      length: 25,
      characters: [generator.lower, generator.upper, generator.digits],
    });
    jwt
      .sign({
        _id: id, username: 'loremIpsumAdmin', admin: true, auth: true,
      }, secret, { expiresIn: expLogin }, (err, token) => {
        if (err) {
          console.log(lang.LABEL_ERROR_RETURN, err);
          resp
            .status(500)
            .json(lang.LABEL_500_HTTP);
        } else {
          resp
            .json({
              token,
            });
        }
      });
  },
  // FATTO
  uploadTest: (req, resp) => {
    try {
      console.log(lang.LABEL_TEST_UPLOAD, req.file);
      console.log(lang.LABEL_RESULT_UPLOAD_OK);
      resp.status(200).json(lang.LABEL_200_HTTP);
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },

  /*
-------------------------------------------------------------------------

        CONTROLLER ALLERT THIS PART OF CODE CONTENT ALL METHOD
        FOR EMERGENCY RESTORE WEBSITE AND INSTALL CMS

-------------------------------------------------------------------------
*/
  // FATTO
  adminCreateForAllert: (req, resp) => {
    try {
      const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        token: req.headers.authorization,
      };
      const passwords = generator.randomPassword({
        length: process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH ? process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH : 10,
        characters: [generator.lower, generator.upper, generator.digits],
      });

      if (process.env.NODE_ENV_TEST) {
        user.password = passwords;
        console.log(lang.LANG_DEBUG_DATA, user);
      }

      bcrypt
        .hash(passwords, 10, (err, hash) => {
          if (!err) {
            if (process.env.NODE_ENV_TEST) {
              console.log(lang.LANG_DEBUG_HASH, hash);
              console.log(lang.LANG_DEBUG_PASSWORD, passwords);
            }

            const findUser = mongoose.model('user', 'users');
            findUser.find(
              {
                email: user.email,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_DATA, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }
                if (data.length > 2) {
                  console.log(lang.LANG_DEBUG_MULTIPLE_DATA_COLLECTION, data);
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                } else if (data.length > 0) {
                  if (data[0].confirmed === false) {
                    resp
                      .status(202)
                      .json(lang.LABEL_RESEND_EMAIL);
                  } else {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                } else {
                  const createUser = mongoose.model('user', 'users');
                  const dateObj = new Date();
                  createUser.create(
                    {
                      admin: user.admin,
                      email: user.email,
                      password: hash,
                      username: user.username,
                      name: user.name,
                      surname: user.surname,
                      admin: true,
                      create: dateObj.toISOString(),
                    }, (err, result) => {
                      if (process.env.NODE_ENV_DEV) {
                        console.log(lang.LANG_DEBUG_RESULT, result);
                        console.log(lang.LANG_DEBUG_ERROR, err);
                      }

                      if (err === null) {
                        resp
                          .status(201)
                          .json(lang.LABEL_201_HTTP);
                      }
                    },
                  );
                }
              },
            );
          } else {
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  installcms: (req, resp) => {
    const user = mongoose.model('user');
    bcrypt
      .hash('rootAdmin', 10, (err, hash) => {
        user.find({
          email: 'root@root.com',
        }, (err, result) => {
          if (err == null) {
            const dateObj = new Date();
            user.create({
              admin: true,
              email: 'root@root.com',
              password: hash,
              username: 'root',
              name: 'root',
              surname: 'root',
              confirmed: true,
              create: dateObj.toDateString(),
            }, (err, data) => {
              if (err !== null) { console.log(lang.LABEL_DEBUG_INSTALLATION, err); } else if (data.length > 0) {
                console.log(lang.LABEL_USER_ADMIN_EXIST);
                resp
                  .status(401)
                  .json(lang.LABEL_401_HTTP);
              } else {
                console.log(lang.LABEL_INSTALLATION_COMPLETE);
                resp
                  .status(200)
                  .json(lang.LABEL_200_HTTP);
              }
            });
          } else {
            console.log(lang.LABEL_USER_EXIST_INSTALLED);
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        });
      });
  },

  /*
-------------------------------------------------------------------------

        CONTROLLER USERS EX: LOGIN/LOGOUT
        CREATE/MODIFY/DELETE USER

-------------------------------------------------------------------------
*/
  // FATTO
  login: (req, resp) => {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
      };

      if (user.email === testUser.email && user.password === testUser.password) {
        if (process.env.NODE_ENV_DEV) {
          const {
            id,
            username,
            admin,
          } = testUser;
          jwt
            .sign({
              _id: id, username, admin, auth: true,
            }, secret, { expiresIn: expLogin }, (err, token) => {
              if (err) {
                console.log(lang.LABEL_ERROR_RETURN, err);
                resp
                  .status(500)
                  .json(lang.LABEL_500_HTTP);
              } else
              if (admin) {
                const access = mongoose.model('access', 'access');
                access.create(
                  {
                    idUser: testUser.id,
                    ip: req.ip,
                  }, (err, data) => {
                    if (process.env.NODE_ENV_DEV) {
                      console.log(lang.LANG_DEBUG_RESULT, data);
                      console.log(lang.LANG_DEBUG_ERROR, err);
                    }

                    if (err == null) {
                      resp
                        .json({
                          token,
                        });
                    } else {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    }
                  },
                );
              } else {
                resp
                  .status(200)
                  .json({
                    token,
                  });
              }
            });
        } else {
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        }
      } else {
        try {
          const mongoUser = mongoose.model('user', 'users');
          const { email, password } = user;
          mongoUser
            .findOne({
              email,
              confirmed: true,
            }, (err, result) => {
              if (process.env.NODE_ENV_DEV) { console.log(lang.LANG_DEBUG_RESULT, result); }
              if (err === null) {
                if (result !== null) {
                  const data = result;
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, data);
                  }
                  bcrypt
                    .compare(password, data.password, (err, result) => {
                      if (result) {
                        const { _id, username, admin } = data;
                        jwt
                          .sign({
                            _id, username, admin, auth: true,
                          }, secret, { expiresIn: expLogin }, (err, token) => {
                            if (err) {
                              console.log(lang.LABEL_ERROR_RETURN, err);
                              resp
                                .status(500)
                                .json(lang.LABEL_500_HTTP);
                            } else
                            if (admin) {
                              const access = mongoose.model('access', 'access');
                              access.create({
                                idUser: _id,
                                ip: req.ip,
                              }, (err, data) => {
                                if (err == null) {
                                  resp
                                    .status(200)
                                    .json({
                                      token,
                                    });
                                } else {
                                  resp
                                    .status(500)
                                    .json(lang.LABEL_500_HTTP);
                                }
                              });
                            } else {
                              resp
                                .status(200)
                                .json({
                                  token,
                                });
                            }
                          });
                      } else {
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              } else {
                resp
                  .status(403)
                  .json(lang.LABEL_403_HTTP);
              }
            });
        } catch (err) {
          console.log(lang.LABEL_ERROR_RETURN, err);
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        }
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  logout: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            if (process.env.NODE_ENV_DEV) {
              console.log(lang.LANG_DEBUG_RESULT, decoded);
              console.log(lang.LANG_DEBUG_ERROR, err);
            }

            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              blkLocal
                .insert_LOCAL({
                  name: 'tokens',
                  data: {
                    _id,
                    username,
                    token,
                  },
                });
              resp
                .status(200)
                .json(lang.LABEL_200_HTTP);
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, reply);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!reply) {
                  const data = new Date();
                  const value = JSON
                    .stringify(
                      {
                        _id,
                        username,
                        time: data.toISOString(),
                      },
                    );
                  client.set(token, value, redis.print);
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  requireSignin: () => expressJWT({ secret }),
  // FATTO
  register: (req, resp) => {
    try {
      const user = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
      };

      if (process.env.NODE_ENV_DEV) { console.log(lang.LANG_DEBUG_USER, user); }

      if (!user.token) {
        const findUser = mongoose.model('user', 'users');
        try {
          findUser
            .findOne({ email: user.email }, (error, data) => {
              if (process.env.NODE_ENV_TEST) {
                console.log(lang.LANG_DEBUG_ERROR, error);
                console.log(lang.LANG_DEBUG_DATA, data);
              }
              if (error === null) {
                if (data !== null) {
                  if (data.confirmed == false) {
                    const {
                      _id,
                      email,
                      name,
                    } = data;
                    jwt
                      .sign(
                        {
                          _id,
                          email,
                        }, secret, { expiresIn: expSTMP }, (err, token) => {
                          if (!err) {
                            const SMTP_CONFIG = smtp.createTransport(configEmail);
                            smtp
                              .send({
                                SMTPConfig: SMTP_CONFIG,
                                from: configEmail.user,
                                to: configEmail.auth.user,
                                subject: lang.LANG_TEST_SMTP_SUBJECT,
                                html: smtp.template.register(token, name),
                              })
                              .then((result) => {
                                resp
                                  .status(202)
                                  .json(lang.LABEL_202_HTTP);
                              })
                              .catch((err) => {
                                resp
                                  .status(500)
                                  .json(lang.LABEL_500_HTTP);
                              });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        },
                      );
                  } else {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                } else {
                  bcrypt
                    .hash(user.password, 10, (err, hash) => {
                      if (!err) {
                        const createUser = mongoose.model('user', 'users');
                        const dateObj = new Date();
                        createUser.create({
                          email: user.email,
                          password: hash,
                          username: user.username,
                          name: user.name,
                          surname: user.surname,
                          create: dateObj.toISOString(),
                        },
                        (err, result) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, result);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }
                          if (err == null) {
                            const {
                              _id,
                              email,
                              name,
                            } = result;
                            jwt
                              .sign(
                                {
                                  _id,
                                  email,
                                }, secret, { expiresIn: expSTMP }, (err, token) => {
                                  if (!err) {
                                    const SMTP_CONFIG = smtp.createTransport(configEmail);
                                    smtp
                                      .send({
                                        SMTPConfig: SMTP_CONFIG,
                                        from: configEmail.user,
                                        to: configEmail.auth.user,
                                        subject: lang.LANG_REGISTERED_USER_SUBJECT,
                                        html: smtp.template.register(token, name),
                                      })
                                      .then((result) => {
                                        resp
                                          .status(201)
                                          .json(lang.LABEL_201_HTTP);
                                      })
                                      .catch((err) => {
                                        resp
                                          .status(500)
                                          .json(lang.LABEL_500_HTTP);
                                      });
                                  } else {
                                    resp
                                      .status(500)
                                      .json(lang.LABEL_500_HTTP);
                                  }
                                },
                              );
                          }
                        });
                      }
                    });
                }
              } else {
                resp
                  .status(403)
                  .json(lang.LABEL_403_HTTP);
              }
            });
        } catch (e) {
          console.log(lang.LABEL_ERROR_RETURN, e);
          resp
            .status(500)
            .json(lang.LABEL_500_HTTP);
        }
      } else {
        resp
          .status(403)
          .json(lang.LABEL_403_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  registerAdmin: (req, resp) => {
    try {
      const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        surname: req.body.surname,
        token: req.headers.authorization,
      };

      Promise.all([
        genFunctions.isValidToken({
          token: user.token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token: user.token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const passwords = generator.randomPassword({
              length: process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH ? process.env.NODE_ENV_PASSWORD_ADMIN_LENGTH : 10,
              characters: [generator.lower, generator.upper, generator.digits],
            });

            if (process.env.NODE_ENV_TEST) {
              user.password = passwords;
              console.log(lang.LANG_DEBUG_DATA, user);
            }

            bcrypt
              .hash(passwords, 10, (err, hash) => {
                if (!err) {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_HASH, hash);
                    console.log(lang.LANG_DEBUG_PASSWORD, passwords);
                  }

                  const findUser = mongoose.model('user', 'users');
                  findUser.find(
                    {
                      email: user.email,
                    }, (err, data) => {
                      if (process.env.NODE_ENV_DEV) {
                        console.log(lang.LANG_DEBUG_DATA, data);
                        console.log(lang.LANG_DEBUG_ERROR, err);
                      }
                      if (data.length > 2) {
                        console.log(lang.LANG_DEBUG_MULTIPLE_DATA_COLLECTION, data);
                        resp
                          .status(500)
                          .json(lang.LABEL_500_HTTP);
                      } else if (data.length > 0) {
                        if (data[0].confirmed === false) {
                          resp
                            .status(401)
                            .json(lang.LABEL_ADMIN_PROBLEM_NOT_CONFIRMED_EMAIL);
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        const createUser = mongoose.model('user', 'users');
                        const dateObj = new Date();
                        createUser.create(
                          {
                            admin: user.admin,
                            email: user.email,
                            password: hash,
                            username: user.username,
                            name: user.name,
                            surname: user.surname,
                            admin: true,
                            create: dateObj.toISOString(),
                          }, (err, result) => {
                            if (err === null) {
                              const {
                                _id,
                                name,
                                email,
                              } = result;
                              jwt
                                .sign(
                                  {
                                    _id,
                                    email,
                                  }, secret, { expiresIn: expSTMP }, (err, token) => {
                                    const SMTP_CONFIG = smtp.createTransport(configEmail);
                                    smtp
                                      .send({
                                        SMTPConfig: SMTP_CONFIG,
                                        from: configEmail.user,
                                        to: configEmail.auth.user,
                                        subject: lang.LANG_REGISTERED_USER_SUBJECT,
                                        html: smtp.template.registerAdmin(token, name, email, passwords),
                                      })
                                      .then((result) => {
                                        resp
                                          .status(201)
                                          .json(lang.LABEL_201_HTTP);
                                      })
                                      .catch((err) => {
                                        resp
                                          .status(500)
                                          .json(lang.LABEL_500_HTTP);
                                      });
                                  },
                                );
                            }
                          },
                        );
                      }
                    },
                  );
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  validateRegistration: (req, resp) => {
    try {
      const { token } = req.params;
      jwt
        .verify(token, secret, (err, decoded) => {
          if (process.env.NODE_ENV_TEST) { console.log(lang.LANG_DEBUG_ERROR, err); }
          if (err !== null) {
            resp
              .status(403)
              .json(lang.LABEL_403_HTTP);
          } else {
            if (process.env.NODE_ENV_TEST) {
              console.log(lang.LANG_DEBUG_ERROR, err);
              console.log(lang.LANG_DEBUG_DATA, decoded);
            }

            const {
              _id,
              username,
              admin,
            } = decoded;
            const user = mongoose.model('user');
            user.find(
              {
                _id,
                username,
                admin,
                confirmed: false,
              }, (err, data) => {
                if (err !== null) {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                } else {
                  const update = mongoose.model('user');
                  update.findByIdAndUpdate(_id, {
                    confirmed: true,
                  }, (err, data) => {
                    if (err == null) {
                      resp
                        .status(200)
                        .json(lang.LABEL_200_HTTP);
                    } else {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    }
                  });
                }
              },
            );
          }
        });
    } catch (e) {
      console.log(lang.LANG_DEBUG_ERROR, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  checkAdminUser: (req, resp, next) => {
    try {
      const token = req.headers.authorization;
      if (typeof token !== 'undefined') {
        client
          .get(token, (err, reply) => {
            if (reply) {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            } else {
              jwt
                .verify(auth, secret, (err, decode) => {
                  if (err) {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  } else
                  if (decode.admin) { next(); } else {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            }
          });
      } else {
        resp
          .status(403)
          .json(lang.LABEL_403_HTTP);
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  chechUserAuth: (req, resp, next) => {
    try {
      const token = req.headers.authorization;
      const client = redisConfig.clientRedis();
      if (typeof token !== 'undefined') {
        client
          .get(token, (err, reply) => {
            if (reply) {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            } else {
              jwt
                .verify(token, secret, (err, decode) => {
                  if (err) {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  } else { next(); }
                });
            }
          });
      } else {
        resp
          .status(403)
          .json(lang.LABEL_403_HTTP);
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  modifyUser: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
      ])
        .then((result) => {
          jwt
            .verify(token, secret, (error, decode) => {
              if (error == null) {
                const findUser = mongoose.model('user', 'users');
                const {
                  _id,
                  username,
                } = decode;
                findUser.findById(_id, (error, data) => {
                  if (error == null) {
                    if (data.confirmed) {
                      const newUser = {
                        email: req.body.email,
                        username: req.body.username,
                        name: req.body.name,
                        surname: req.body.surname,
                      };

                      const modifyUser = mongoose.model('user', 'users');
                      modifyUser.findByIdAndUpdate(_id, newUser, (err, result) => {
                        if (process.env.NODE_ENV_DEV) {
                          console.log(lang.LANG_DEBUG_RESULT, result);
                          console.log(lang.LANG_DEBUG_ERROR, err);
                        }

                        if (err === null) {
                          resp
                            .status(200)
                            .json(lang.LABEL_200_HTTP);
                        } else {
                          resp
                            .status(500)
                            .json(lang.LABEL_500_HTTP);
                        }
                      });
                    } else {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    }
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
              } else {
                resp
                  .status(500)
                  .json(lang.LABEL_500_HTTP);
              }
            });
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getUserInfoAdmin: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
      ])
        .then((result) => {
          jwt
            .verify(token, secret, (error, decode) => {
              if (error == null) {
                const findUser = mongoose.model('user', 'users');
                const {
                  _id,
                  username,
                } = decode;
                findUser.findById(_id, (error, data) => {
                  if (error == null) {
                    if (data.confirmed) {
                      resp
                        .json(data);
                    } else {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    }
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
              } else {
                resp
                  .status(500)
                  .json(lang.LABEL_500_HTTP);
              }
            });
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  resetPassword: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
      ])
        .then((result) => {
          const user = {
            newPassword: req.body.newPassword,
          };

          jwt
            .verify(token, secret, (error, decode) => {
              const updateUser = mongoose.model('user', 'users');
              const {
                _id,
              } = decode;
              bcrypt
                .hash(user.newPassword, 10, (err, hash) => {
                  if (!err) {
                    updateUser.findByIdAndUpdate(_id,
                      {
                        password: hash,
                        confirmed: true,
                      }, (error, data) => {
                        if (error == null) {
                          resp
                            .status(200)
                            .json(lang.LABEL_200_HTTP);
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      });
                  } else {
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            });
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deleteUser: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (process.env.NODE_ENV_DEV) { console.log(lang.LANG_DEBUG_TOKEN, token); }
      jwt
        .verify(token, secret, (err, decoded) => {
          if (!err) {
            const {
              _id,
            } = decoded;
            const removeUser = mongoose.model('user', 'users');
            removeUser
              .findOneAndDelete({
                _id,
                confirmed: true,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (data !== null) {
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          } else {
            console.log(lang.LABEL_ERROR_RETURN, err);
            resp
              .status(403)
              .json(lang.LABEL_403_HTTP);
          }
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  /*
-------------------------------------------------------------------------

        CONTROLLER FOR MANAGEMENT PAGES
        OF CMS

-------------------------------------------------------------------------
*/
  // FATTO
  createCategorySite: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const category = {
        name: req.body.name,
        description: req.body.description,
        titleSeo: req.body.titleSeo,
        important: (req.body.important >= 0) ? req.body.important : null,
        visible: req.body.visible,
      };

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const findCollection = mongoose.model('category', 'category');
            const find = findCollection.find(
              {
                name: category.name,
              }, (err, result) => {
                if (result.length > 0) {
                  resp
                    .status(409)
                    .json(lang.LABEL_409_HTTP);
                } else {
                  const createCategory = mongoose.model('category', 'category');
                  const dateObj = new Date();
                  createCategory.create({
                    name: category.name,
                    description: category.description,
                    titleSEO: category.titleSeo,
                    important: category.important,
                    visible: category.visible,
                    create: dateObj.toISOString(),
                  }, (err, result) => {
                    if (process.env.NODE_ENV_DEV) {
                      console.log(lang.LANG_DEBUG_RESULT, result);
                      console.log(lang.LANG_DEBUG_ERROR, err);
                    }

                    if (err === null) {
                      resp
                        .status(201)
                        .json(lang.LABEL_201_HTTP);
                    } else {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    }
                  });
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  createSubCategorySite: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const subCategory = {
        codCategoryPrincipal: req.body.codCategory,
        name: req.body.name,
        description: req.body.description,
        titleSeo: req.body.titleSeo,
        important: (req.body.important >= 0) ? req.body.important : null,
        visible: req.body.visible,
      };

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const findCollection = mongoose.model('category', 'category');
            findCollection.find(
              {
                subCategory: subCategory.name,
              }, (err, result) => {
                if (result.length > 0) {
                  resp
                    .status(409)
                    .json(lang.LABEL_409_HTTP);
                } else {
                  const createSubCategory = mongoose.model('category', 'category');
                  const dateObj = new Date();
                  createSubCategory.findOneAndUpdate(
                    {
                      _id: subCategory.codCategoryPrincipal,
                    },
                    {
                      $set:
                  {
                    subCategory:
                    {
                      name: subCategory.name,
                      description: subCategory.description,
                      titleSeo: subCategory.titleSEO,
                      important: subCategory.important,
                      visible: subCategory.visible,
                    },
                  },
                    }, (err, result) => {
                      if (process.env.NODE_ENV_DEV) {
                        console.log(lang.LANG_DEBUG_RESULT, result);
                        console.log(lang.LANG_DEBUG_ERROR, err);
                      }
                      if (err === null) {
                        resp
                          .status(201)
                          .json(lang.LABEL_201_HTTP);
                      } else {
                        resp
                          .status(500)
                          .json(lang.LABEL_500_HTTP);
                      }
                    },
                  );
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  createPost: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const date = new Date();
      const posts = {
        lang: req.body.lang,
        type: req.body.type,
        title: req.body.title,
        seo: req.body.seo,
        content: req.body.content,
        important: (req.body.important >= 0) ? req.body.important : null,
        visible: req.body.visible,
        category: req.body.category,
        create: date.toISOString(),
      };

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const checkpost = mongoose.model('posts', 'posts');
            checkpost.findOne({
              title: posts.title,
            }, (err, data) => {
              if (process.env.NODE_ENV_DEV) {
                console.log(lang.LANG_DEBUG_RESULT, data);
                console.log(lang.LANG_DEBUG_ERROR, err);
              }

              if (data !== null) {
                resp
                  .status(409)
                  .json(lang.LABEL_409_HTTP);
              } else {
                const insertpost = mongoose.model('posts', 'posts');
                insertpost.create(
                  posts,
                  (err, data) => {
                    if (process.env.NODE_ENV_DEV) {
                      console.log(lang.LANG_DEBUG_RESULT, data);
                      console.log(lang.LANG_DEBUG_ERROR, err);
                    }

                    if (err !== null) {
                      resp
                        .status(500)
                        .json(lang.LABEL_500_HTTP);
                    } else {
                      resp
                        .status(201)
                        .json(lang.LABEL_201_HTTP);
                    }
                  },
                );
              }
            });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getUser: (req, resp) => {
    const token = req.headers.authorization;
    jwt
      .verify(token, secret, (error, decode) => {
        if (error) {
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        } else {
          const findUser = mongoose.model('user', 'users');
          findUser.findById(_id, (error, data) => {
            if (process.env.NODE_ENV_DEV) {
              console.log(lang.LANG_DEBUG_RESULT, data);
              console.log(lang.LANG_DEBUG_ERROR, error);
            }

            if (error == null) {
              const {
                admin,
                confirmed,
              } = data;

              if (admin && confirmed) {
                resp
                  .status(200)
                  .json(
                    {
                      email: data.email,
                      username: data.username,
                      name: data.name,
                      surname: data.surname,
                    },
                  );
              } else if (confirmed) {
                resp
                  .status(200)
                  .json(
                    {
                      email: data.email,
                      username: data.username,
                      name: data.name,
                      surname: data.surname,
                    },
                  );
              } else {
                resp
                  .status(500)
                  .json(lang.LABEL_500_HTTP);
              }
            } else {
              resp
                .status(500)
                .json(lang.LABEL_500_HTTP);
            }
          });
        }
      });
  },
  // FATTO
  getPostsNumbers: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const posts = mongoose.model('posts', 'posts');
                      posts
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const posts = mongoose.model('posts', 'posts');
                          posts
                            .count({}, (err, count) => {
                              if (process.env.NODE_ENV_DEV) {
                                console.log(lang.LANG_DEBUG_RESULT, count);
                                console.log(lang.LANG_DEBUG_ERROR, err);
                              }

                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getPostSingle: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ]);
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getMailSubNumbers: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const mailSub = mongoose.model('mailsubscribe', 'mailsubscribe');
                      mailSub
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const mailSub = mongoose.model('mailsubscribe', 'mailsubscribe');
                          mailSub
                            .count({}, (err, count) => {
                              if (process.env.NODE_ENV_DEV) {
                                console.log(lang.LANG_DEBUG_RESULT, count);
                                console.log(lang.LANG_DEBUG_ERROR, err);
                              }

                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getChatsUsersNumbers: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const mailSub = mongoose.model('chat', 'chat');
                      mailSub
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const mailSub = mongoose.model('chat', 'chat');
                          mailSub
                            .count({}, (err, count) => {
                              if (process.env.NODE_ENV_DEV) {
                                console.log(lang.LANG_DEBUG_RESULT, count);
                                console.log(lang.LANG_DEBUG_ERROR, err);
                              }

                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getEarningNumber: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const earning = mongoose.model('earning', 'earning');
                      earning
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const earning = mongoose.model('earning', 'earning');
                          earning
                            .count({}, (err, count) => {
                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getImagesTotal: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const image = mongoose.model('uploadImg', 'uploadImg');
                      image
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const image = mongoose.model('uploadImg', 'uploadImg');
                          image
                            .count({}, (err, count) => {
                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getImagesBaseTotal: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const image = mongoose.model('uploadImgBase', 'uploadImgBase');
                      image
                        .count({}, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const image = mongoose.model('uploadImgBase', 'uploadImgBase');
                          image
                            .count({}, (err, count) => {
                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getPostsWithFilter: (req, resp) => {
	  try {
      const token = req.headers.authorization;
      const max = (req.params.max) ? parseInt(req.params.max) : null;
      if (max <= 0) {
        resp
          .status(403)
          .json(lang.LABEL_403_HTTP);
      } else {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const posts = mongoose.model('posts', 'posts');
              posts
                .find({})
                .sort({ updated: 'desc' })
                .limit(max)
                .exec((err, result) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, result);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (!err) {
                    resp
                      .status(200)
                      .json(result);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllPosts: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const allPosts = mongoose.model('posts', 'posts');
            allPosts
              .find({})
              .sort({ updated: 'desc' })
              .exec((err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getVisiblePostNumber: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const posts = mongoose.model('posts', 'posts');
                      posts
                        .count({ visible: true }, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const posts = mongoose.model('posts', 'posts');
                          posts
                            .count({ visible: true }, (err, count) => {
                              if (process.env.NODE_ENV_DEV) {
                                console.log(lang.LANG_DEBUG_RESULT, count);
                                console.log(lang.LANG_DEBUG_ERROR, err);
                              }

                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getUnvisiblePostNumber: (req, resp) => {
    try {
      const token = req.headers.authorization;
      if (blkLocal !== null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const tokenBlacklist = blkLocal
              .findCache_LOCAL({
                name: 'tokens',
                data: {
                  token,
                },
              });
            if (!tokenBlacklist) {
              jwt
                .verify(token, secret, (err, decoded) => {
                  if (process.env.NODE_ENV_TEST) {
                    console.log(lang.LANG_DEBUG_ERROR, err);
                    console.log(lang.LANG_DEBUG_DATA, decoded);
                  }

                  if (err === null) {
                    const {
                      admin,
                    } = decoded;
                    if (admin) {
                      const posts = mongoose.model('posts', 'posts');
                      posts
                        .count({ visible: false }, (err, count) => {
                          if (process.env.NODE_ENV_DEV) {
                            console.log(lang.LANG_DEBUG_RESULT, count);
                            console.log(lang.LANG_DEBUG_ERROR, err);
                          }

                          if (!err) {
                            resp
                              .status(200)
                              .json({ count });
                          } else {
                            resp
                              .status(500)
                              .json(lang.LABEL_500_HTTP);
                          }
                        });
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  } else {
                    console.log(lang.LABEL_ERROR_RETURN, err);
                    resp
                      .status(403)
                      .json(lang.LABEL_403_HTTP);
                  }
                });
            } else {
              resp
                .status(403)
                .json(lang.LABEL_403_HTTP);
            }
          });
      } else if (blkLocal === null) {
        jwt
          .verify(token, secret, (err, decoded) => {
            const { _id, username } = decoded;
            const client = redisConfig.clientRedis();
            const tokenBlacklist = client
              .get(token, (err, reply) => {
                if (!reply) {
                  jwt
                    .verify(token, secret, (err, decoded) => {
                      if (process.env.NODE_ENV_TEST) {
                        console.log(lang.LANG_DEBUG_ERROR, err);
                        console.log(lang.LANG_DEBUG_DATA, decoded);
                      }

                      if (err === null) {
                        const {
                          admin,
                        } = decoded;
                        if (admin) {
                          const posts = mongoose.model('posts', 'posts');
                          posts
                            .count({ visible: false }, (err, count) => {
                              if (process.env.NODE_ENV_DEV) {
                                console.log(lang.LANG_DEBUG_RESULT, count);
                                console.log(lang.LANG_DEBUG_ERROR, err);
                              }

                              if (!err) {
                                resp
                                  .status(200)
                                  .json({ count });
                              }
                            });
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        console.log(lang.LABEL_ERROR_RETURN, err);
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(403)
                    .json(lang.LABEL_403_HTTP);
                }
              });
          });
      }
    } catch (err) {
      console.log(lang.LABEL_ERROR_RETURN, err);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllPostsTable: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const posts = mongoose.model('posts', 'posts');
            posts
              .find({})
              .select('_id lang type title seo important content visible category updated')
              .sort({ updated: 'desc' })
              .exec((err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const category = mongoose.model('category', 'category');
            category
              .find({})
              .select('_id name description titleSEO important visible subCategory updated')
              .sort({ updated: 'desc' })
              .exec((err, category) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, category);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(category);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getCategoryWithFilter: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const numberMax = (parseInt(req.params.max) > 0) ? parseInt(req.params.max) : null;
      if (numberMax) {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const categoryWithFilter = mongoose.model('category', 'category');
              categoryWithFilter
                .find({})
                .select('_id name description titleSEO important visible subCategory updated')
                .limit(numberMax)
                .sort({ updated: 'desc' })
                .exec((err, category) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, category);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (!err) {
                    resp
                      .status(200)
                      .json(category);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      } else {
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllNumberCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const category = mongoose.model('category', 'category');
            category
              .count({}, (err, count) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, count);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json({ count });
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllUnvisibleNumberCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const category = mongoose.model('category', 'category');
            category
              .count({ visible: false }, (err, count) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, count);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json({ count });
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllVisibleNumberCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const category = mongoose.model('category', 'category');
            category
              .count({ visible: true }, (err, count) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, count);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json({ count });
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getImagesUploaded: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const imageUploaded = mongoose.model('uploadImg', 'uploadImg');
            imageUploaded
              .find({})
              .select({})
              .sort({ created: 'desc' })
              .exec((err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getImagesUploadedBase: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const imageUploaded = mongoose.model('uploadImgBase', 'uploadImgBase');
            imageUploaded
              .find({})
              .select({})
              .sort({ created: 'desc' })
              .exec((err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getFilesUploaded: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const filesUploaded = mongoose.model('uploadFile', 'uploadFile');
            filesUploaded
              .find({})
              .select({})
              .sort({ created: 'desc' })
              .exec((err, uploadedFiles) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, uploadedFiles);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(uploadedFiles);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllVideoUploaded: (req, resp) => {
    try {
      const token = req.headers.authorization;
      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const videoUploaded = mongoose.model('uploadVideo', 'uploadVideo');
            videoUploaded
              .find({})
              .select({})
              .sort({ created: 'desc' })
              .exec((err, uploadedVideos) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, uploadedVideos);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(uploadedVideos);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllVideoWithFilter: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const max = (req.params.max > 0) ? req.params.max : null;
      if (max !== null) {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const videoUploaded = mongoose.model('uploadVideo', 'uploadVideo');
              videoUploaded
                .find({})
                .select({})
                .sort({ created: 'desc' })
                .limit(max)
                .exec((err, uploadedVideos) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, uploadedVideos);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (!err) {
                    resp
                      .status(200)
                      .json(uploadedVideos);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      } else {
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllImageWithFilter: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const max = (req.params.max > 0) ? req.params.max : null;
      if (max !== null) {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const imageUploaded = mongoose.model('uploadImg', 'uploadImg');
              imageUploaded
                .find({})
                .select({})
                .sort({ created: 'desc' })
                .limit(max)
                .exec((err, uploadedImages) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, uploadedImages);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (!err) {
                    resp
                      .status(200)
                      .json(uploadedImages);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      } else {
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  getAllFilesWithFilter: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const max = (req.params.max > 0) ? req.params.max : null;
      if (max !== null) {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const fileUploaded = mongoose.model('uploadFile', 'uploadFile');
              fileUploaded
                .find({})
                .select({})
                .sort({ created: 'desc' })
                .limit(max)
                .exec((err, uploadedFiles) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, uploadedFiles);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (!err) {
                    resp
                      .status(200)
                      .json(uploadedFiles);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                });
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      } else {
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  modifyCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const category = {
        codCategory: req.body.codCategory,
        name: req.body.name,
        description: req.body.description,
        titleSeo: req.body.titleSeo,
        important: (req.body.important >= 0) ? req.body.important : null,
        visible: req.body.visible,
      };

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const modifyCategory = mongoose.model('category', 'category');
            modifyCategory.findByIdAndUpdate(
              {
                _id: category.codCategory,
              },
              {
                $set:
              {
                name: category.name,
                description: category.description,
                titleSEO: category.titleSeo,
                important: category.important,
                visible: category.visible,
              },
              }, (err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  findSingleCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const { code } = req.body;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const findCategory = mongoose.model('category', 'category');
            findCategory.findById(code,
              (err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  findSinglePost: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const { code } = req.body;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const findPost = mongoose.model('posts', 'posts');
            findPost.findById(code,
              (err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(result);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  modifyPosts: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const posts = {
        codPosts: req.body.codPosts,
        lang: req.body.lang,
        type: req.body.type,
        title: req.body.title,
        seo: req.body.seo,
        important: (req.body.important >= 0) ? req.body.important : null,
        content: req.body.content,
        visible: req.body.visible,
        category: req.body.category,
      };

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const modifyPosts = mongoose.model('posts', 'posts');
            modifyPosts.findByIdAndUpdate(
              {
                _id: posts.codPosts,
              },
              {
                $set:
              {
                lang: posts.lang,
                type: posts.type,
                title: posts.title,
                seo: posts.seo,
                important: posts.important,
                content: posts.content,
                visible: posts.visible,
                category: posts.category,
              },
              }, (err, result) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, result);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (!err) {
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deleteCategory: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const _id = req.body.codCategory;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const deleteCategory = mongoose.model('category', 'category');
            deleteCategory.findByIdAndRemove(
              {
                _id,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }

                if (data !== null) {
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deletePosts: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const _id = req.query.id ? req.query.id : false;
      if (_id) {
        Promise.all([
          genFunctions.isValidToken({
            token,
            localBlacklist: blkLocal,
            redisBlacklist: redis,
          }),
          genFunctions.checkTypeUser({
            token,
          }),
        ])
          .then((result) => {
            const res = result[1];
            const { admin } = res;
            if (admin) {
              const deletePosts = mongoose.model('posts', 'posts');
              deletePosts.findByIdAndRemove(
                {
                  _id,
                }, (err, data) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, data);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (data !== null) {
                    resp
                      .status(200)
                      .json(lang.LABEL_200_HTTP);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                },
              );
            } else {
              resp
                .json(lang.LABEL_403_HTTP);
            }
          })
          .catch((err) => {
            console.log(lang.LANG_DEBUG_ERROR, err);
            resp
              .status(err.status)
              .json(err.lang);
          });
      } else {
        resp
          .json(lang.LABEL_403_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deleteImage: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const _id = req.body.codImage;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const deleteImages = mongoose.model('uploadImg', 'uploadImg');
            deleteImages.findByIdAndRemove(
              {
                _id,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }
                if (data !== null) {
                  fs.unlinkSync(path.join(files, data.imgName));
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deleteFile: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const _id = req.body.codFile;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const deleteFile = mongoose.model('uploadFile', 'uploadFile');
            deleteFile.findByIdAndRemove(
              {
                _id,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }
                if (data !== null) {
                  fs.unlinkSync(path.join(files, data.fileName));
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  deleteVideo: (req, resp) => {
    try {
      const token = req.headers.authorization;
      const _id = req.body.codVideo;

      Promise.all([
        genFunctions.isValidToken({
          token,
          localBlacklist: blkLocal,
          redisBlacklist: redis,
        }),
        genFunctions.checkTypeUser({
          token,
        }),
      ])
        .then((result) => {
          const res = result[1];
          const { admin } = res;
          if (admin) {
            const deleteVideo = mongoose.model('uploadVideo', 'uploadVideo');
            deleteVideo.findByIdAndRemove(
              {
                _id,
              }, (err, data) => {
                if (process.env.NODE_ENV_DEV) {
                  console.log(lang.LANG_DEBUG_RESULT, data);
                  console.log(lang.LANG_DEBUG_ERROR, err);
                }
                if (data !== null) {
                  fs.unlinkSync(path.join(files, data.videoName));
                  resp
                    .status(200)
                    .json(lang.LABEL_200_HTTP);
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              },
            );
          } else {
            resp
              .json(lang.LABEL_403_HTTP);
          }
        })
        .catch((err) => {
          console.log(lang.LANG_DEBUG_ERROR, err);
          resp
            .status(err.status)
            .json(err.lang);
        });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  uploadImg: (req, resp) => {
    try {
      const file = req.files.images;
      const upload = mongoose.model('uploadImg', 'uploadImg');
      const data = file.map((element) => ({
        imgName: element.filename,
        originalFileName: element.originalname,
        destination: element.destination,
        imgPath: element.path,
        imageType: element.mimetype,
        size: element.size,
      }));
      upload.create(
        data,
        (err, data) => {
          if (process.env.NODE_ENV_DEV) {
            console.log(lang.LANG_DEBUG_RESULT, data);
            console.log(lang.LANG_DEBUG_ERROR, err);
          }

          if (err == null) {
            if (process.env.NODE_ENV_DEV) { console.log(lang.LABEL_RESULT_UPLOAD_OK); }
            resp
              .status(200)
              .json(lang.LABEL_200_HTTP);
          } else {
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        },
      );
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  uploadImgBase: (req, resp) => {
    try {
      const files = req.body.images;
      const { names } = req.body;
      const info = files.split(',');
      console.log('info:', info[1]);
      const bitmap = buffer.from(info[1], 'base64');
      fs.writeFile(`uploads/${names}`, bitmap, (error) => {
        if (!error) {
          const upload = mongoose.model('uploadImgBase', 'uploadImgBase');
          const date = new Date().toISOString();
          bcrypt
            .hash(date, 10, (err, hash) => {
              const data = {
                imgName: `${names}`,
                originalFileName: `media/${names}`,
                imgPath: `media/${names}`,
                baseString: files,
              };
              upload.create(
                data,
                (err, data) => {
                  if (process.env.NODE_ENV_DEV) {
                    console.log(lang.LANG_DEBUG_RESULT, data);
                    console.log(lang.LANG_DEBUG_ERROR, err);
                  }

                  if (err == null) {
                    if (process.env.NODE_ENV_DEV) { console.log(lang.LABEL_RESULT_UPLOAD_OK); }
                    resp
                      .status(200)
                      .json(lang.LABEL_200_HTTP);
                  } else {
                    resp
                      .status(500)
                      .json(lang.LABEL_500_HTTP);
                  }
                },
              );
            });
        }
      });
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  uploadFiles: (req, resp) => {
    try {
      const file = req.files.files;
      const upload = mongoose.model('uploadFile', 'uploadFile');
      const data = file.map((element) => ({
        fileName: element.filename,
        originalFileName: element.originalname,
        destination: element.destination,
        filePath: element.path,
        fileType: element.mimetype,
        size: element.size,
      }));
      upload.create(
        data,
        (err, data) => {
          if (process.env.NODE_ENV_DEV) {
            console.log(lang.LANG_DEBUG_RESULT, data);
            console.log(lang.LANG_DEBUG_ERROR, err);
          }

          if (err == null) {
            if (process.env.NODE_ENV_DEV) { console.log(lang.LABEL_RESULT_UPLOAD_OK); }
            resp
              .status(200)
              .json(lang.LABEL_200_HTTP);
          } else {
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        },
      );
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  // FATTO
  uploadVideo: (req, resp) => {
    try {
      const file = req.files.videos;
      const upload = mongoose.model('uploadVideo', 'uploadVideo');
      const data = file.map((element) => ({
        videoName: element.filename,
        originalFileName: element.originalname,
        destination: element.destination,
        filePath: element.path,
        fileType: element.mimetype,
        size: element.size,
      }));
      upload.create(
        data,
        (err, data) => {
          if (process.env.NODE_ENV_DEV) {
            console.log(lang.LANG_DEBUG_RESULT, data);
            console.log(lang.LANG_DEBUG_ERROR, err);
          }

          if (err == null) {
            if (process.env.NODE_ENV_DEV) { console.log(lang.LABEL_RESULT_UPLOAD_OK); }
            resp
              .status(200)
              .json(lang.LABEL_200_HTTP);
          } else {
            resp
              .status(500)
              .json(lang.LABEL_500_HTTP);
          }
        },
      );
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(500)
        .json(lang.LABEL_500_HTTP);
    }
  },
  /*
-------------------------------------------------------------------------

        CONTROLLER FOR CHECK USER

-------------------------------------------------------------------------
*/
  // FATTO
  checkAdminUser: (req, resp, next) => {
    try {
      const token = req.headers.authorization;
      if (process.env.NODE_ENV_LOCAL_BLACKLIST) { // CHECK INTO LOCAL BLACKLIST
        const blkToken = blkLocal.findCache_LOCAL({ name: 'tokens', data: token });
        if (blkToken) {
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        } else if (!token) {
          resp
            .status(403)
            .json(lang.LABEL_403_HTTP);
        } else {
          jwt
            .verify(token, secret, (err, decoded) => {
              if (process.env.NODE_ENV_TEST) {
                console.log(lang.LANG_DEBUG_ERROR, err);
                console.log(lang.LANG_DEBUG_DATA, decoded);
              }

              if (err === null) {
                const {
                  _id,
                } = decoded;

                const findUser = mongoose.model('user', 'users');
                findUser
                  .findById(_id, (error, data) => {
                    if (process.env.NODE_ENV_DEV) {
                      console.log(lang.LANG_DEBUG_RESULT, data);
                      console.log(lang.LANG_DEBUG_ERROR, error);
                    }

                    if (data.confirmed) {
                      if (error == null) {
                        if (data.admin == true) { next(); } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    } else {
                      resp
                        .status(403)
                        .json(lang.LABEL_403_HTTP);
                    }
                  });
              } else {
                resp
                  .status(500)
                  .json(lang.LABEL_500_HTTP);
              }
            });
        }
      } else if (!process.env.NODE_ENV_LOCAL_BLACKLIST) { // CHECK INTO REDIS BLACKLIST
        const client = redisConfig.clientRedis();
        const tokenBlacklist = client
          .get(token, (error, reply) => {
            jwt
              .verify(token, secret, (err, decoded) => {
                if (process.env.NODE_ENV_TEST) {
                  console.log(lang.LANG_DEBUG_ERROR, err);
                  console.log(lang.LANG_DEBUG_DATA, decoded);
                }

                if (err === null) {
                  const {
                    _id,
                  } = decoded;

                  const findUser = mongoose.model('user', 'users');
                  findUser
                    .findById(_id, (error, data) => {
                      if (process.env.NODE_ENV_DEV) {
                        console.log(lang.LANG_DEBUG_RESULT, data);
                        console.log(lang.LANG_DEBUG_ERROR, err);
                      }

                      if (data.confirmed) {
                        if (error == null) {
                          if (data.admin == true) { next(); } else {
                            resp
                              .status(403)
                              .json(lang.LABEL_403_HTTP);
                          }
                        } else {
                          resp
                            .status(403)
                            .json(lang.LABEL_403_HTTP);
                        }
                      } else {
                        resp
                          .status(403)
                          .json(lang.LABEL_403_HTTP);
                      }
                    });
                } else {
                  resp
                    .status(500)
                    .json(lang.LABEL_500_HTTP);
                }
              });
          });
      } else {
        resp
          .status(500)
          .json(lang.LABEL_500_HTTP);
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      resp
        .status(403)
        .json(lang.LABEL_403_HTTP);
    }
  },
  /*
-------------------------------------------------------------------------

        CONTROLLER FOR GENERAL ERROR O ALLERT

-------------------------------------------------------------------------
*/
  // FATTO
  notFound: (req, resp) => {
    resp
      .status(404)
      .json({
        resp: lang.LABEL_JSON_STATUS_NUMBER_NOT_FOUND,
        server: lang.LABEL_JSON_NOT_FOUND,
      });
  },
};
