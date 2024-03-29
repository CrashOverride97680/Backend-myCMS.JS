//            FILE CONTENT GENERALS FUNCTION
// IMPORT MODULES NODEJS
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
// PASSWORD LIBRARY IMPORTING
const generator = require('secure-random-password');
// IMPORTING LOCAL CACHING BLACKLIST
const blkLocal = process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('../autentication/blacklist-local/blacklist-local')
  : null;
// IMPORT ENV DATA OR DEBUG
const secret = process.env.SECRET_KEY || 'secret_key';
const bcrypt = require('bcryptjs');
//  REDIS CACHING MODULE
const redis = !process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('redis')
  : null;
const redisConfig = !process.env.NODE_ENV_LOCAL_BLACKLIST
  ? require('../cache/config/config')
  : null;
// IMPORTING LANG AND DEBUG
const langServer = `../../lang/${process.env.LANG_SERVER || 'eng'}`;
const lang = require(langServer);
// IMPORT MONGO DB ( MONGOSCHEMA )
const mongoose = require('mongoose');
const decode = require('jsonwebtoken/decode');

module.exports = {

  //  CHECK IF TOKEN IS VALID RETURN PROMISE
  isValidToken: ({
    token,
    localBlacklist,
    redisBlacklist,
  }) => new Promise((resolve, reject) => {
    if (!token) reject({ status: 500, lang: lang.LABEL_500_HTTP }); // CHECK IF TOKEN IS PASSED
    else {
      if (localBlacklist) { // CHECK INTO LOCAL BLACKLIST
        const blkToken = blkLocal.findCache_LOCAL({ name: 'tokens', data: token });
        if (blkToken) { reject({ status: 403, lang: lang.LABEL_403_HTTP }); } else { resolve(true); }
      } else if (redisBlacklist) { // CHECK INTO REDIS BLACKLIST
        const client = redisConfig.clientRedis();
        const tokenBlacklist = client
          .get(token, (error, reply) => {
            if (reply == null) { resolve(true); } else { reject({ status: 403, lang: lang.LABEL_403_HTTP }); }
          });
      } else reject({ status: 500, lang: lang.LABEL_500_HTTP }); // ERROR IF NOT IN LOCAL OR REDIS BLACKLIST
    }
  }),

  //  CHECK IF USERS IS ADMIN OR NOT
  checkTypeUser: ({
    token,
  }) => new Promise((resolve, reject) => {
    try {
      if (!token) { reject({ status: 403, lang: lang.LABEL_403_HTTP }); } else {
        jwt
          .verify(token, secret, (err, decoded) => {
            if (process.env.NODE_ENV_TEST) {
              console.log(lang.LANG_DEBUG_ERROR, err);
              console.log(lang.LANG_DEBUG_DATA, decoded);
            }

            if (err === null) {
              const {
                _id,
                admin,
              } = decoded;

              const findUser = mongoose.model('user', 'users');
              findUser
                .findById(_id, (error, data) => {
                  if (data.confirmed) {
                    if (error == null) {
                      if (data.admin == true || data.admin == false) resolve({ admin: data.admin });
                      else reject({ status: 403, lang: lang.LABEL_403_HTTP });
                    }
                  } else reject({ status: 403, lang: lang.LABEL_403_HTTP });
                });
            } else reject({ status: 500, lang: lang.LABEL_500_HTTP });
          });
      }
    } catch (e) {
      console.log(lang.LABEL_ERROR_RETURN, e);
      reject({ status: 500, label: lang.LABEL_500_HTTP });
    }
  }),
};
