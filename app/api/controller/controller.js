// IMPORT MODULES NODEJS
    const jwt = require('jsonwebtoken');
    const expressJWT = require('express-jwt');
    const mongoose = require('mongoose');
// IMPORTING LANG AND DEBUG
    const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
// IMPORT ENV DATA OR DEBUG
    const secret = process.env.SECRET_KEY || 'secret_key';
    const testUser = ( process.env.NODE_ENV_DEV ) ? {
        id: 1,
        admin: 1,
        email: 'email@test.xd',
        password: 'testUser',
        username: 'TestUser',
        surname: 'TestUser',
        confirmed: true,
    } : null;
//  EXPORTING MODULE
    module.exports = 
    {
        // FATTO
        test: (req, resp) => resp.json({resp: lang.LABEL_JSON_STATUS_NUMBER, server: lang.LABEL_JSON_STATUS}),
        // FATTO
        secretTest: (req, resp) => resp.json(lang.LABELL_ACCESS_PAGE),
        // FATTO
        notFound: (req, resp) => resp.status(404).json({resp: lang.LABEL_JSON_STATUS_NUMBER_NOT_FOUND, server: lang.LABEL_JSON_NOT_FOUND}),
        // FATTO MA DA MODIFICARE
        login: (req, resp) => 
        {
            try
            {
                const user = 
                {
                    email: req.body.email,
                    password: req.body.password
                };

                if ( user.email == testUser.email && user.password == testUser.password )
                {
                    if ( process.env.NODE_ENV_DEV )
                    {
                        const { id, username } = testUser;
                        jwt.sign({_id: id, username}, secret, { expiresIn: '1d' }, ( err, token ) => 
                        {
                            if ( err )
                            {
                                console.log(lang.LABEL_ERROR_RETURN, err);
                                resp.status(500).json(lang.LABEL_500_HTTP);
                            }
                            else 
                            {
                                resp.cookie('token', token, {expiresIn: '1d'});
                                resp.json({
                                    auth: true,
                                    token
                                });
                            }
                        });
                    }
                }
                else
                    resp.status(403).json(lang.LABEL_403_HTTP);
            }
            catch(err)
            {
                console.log(lang.LABEL_ERROR_RETURN, err);
                resp.status(500).json(lang.LABEL_500_HTTP);
            }
        },
        createPost: (req, resp) => 
        {
            try
            {
                const auth = req.headers['authorization'];
                if ( (typeof auth) !== 'undefined' )
                {
                    jwt.verify(auth, secret, (err, decode) => {
                        if ( err )
                            resp.status(403).json(lang.LABEL_403_HTTP);
                        else
                            resp.status(201).json(lang.LABEL_201_HTTP);
                    });
                }
                else
                    resp.status(403).json(lang.LABEL_403_HTTP);
            }
            catch(err)
            {
                console.log(lang.LABEL_ERROR_RETURN, err);
                resp.status(500).json(lang.LABEL_500_HTTP);
            }
        },
        refresh: (req, resp) => 
        {
            const auth = req.headers['authorization'];
            console.log(typeof auth);
            if ( (typeof auth) !== 'undefined' )
            {
                jwt.verify(auth, secret, (err, decode) => {
                    console.log("ERROR:", err);
                    console.log("DECODE:", decode);
                });
            }
        },
        // FATTO
        logout: (req, resp) =>
        {
            try
            {
                resp.clearCookie('token');
                resp.status(200).json(lang.LABEL_LOGOUT);
            }
            catch(err)
            {
                console.log(lang.LABEL_ERROR_RETURN, err);
                resp.status(500).json(lang.LABEL_500_HTTP);
            }
        },
        // FATTO
        requireSignin: () => expressJWT({secret}),
        register: async (req, resp) => {
            try
            {
                const user = 
                {
                    email: req.body.email,
                    password: req.body.password,
                    username: req.body.username,
                    name: req.body.name,
                    surname: req.body.surname,
                    token: req.headers['authorization']
                };
                
                if (process.env.NODE_ENV_DEV)
                    console.log("USER:", user);
                
                if (!user.token)
                {
                    const findUser = mongoose.model('user', 'users');
                    const session = await createUsersTable.startSession();
                    await session.startTransaction();
                    try
                    {
                        await findUser.findOne(
                            {
                                email: user.email
                            },
                            (error, data) =>
                            {
                                if(error !== null)
                                    resp.json({message: 'Resend Email for Confirm'});
                                else
                                {
                                    if([data].length === 1)
                                    {
                                        if(data.confirmed !== true)
                                            resp.json({message: "Resend email!!"});
                                        else
                                        {
                                            const createUsersTable = mongoose.model('user', 'users');
                                            createUsersTable.create({

                                            }, (err, result) => {

                                            });
                                        }
                                    }
                                }
                            });
                    }
                    catch
                    {
                        session.abortTransaction();
                        session.endSession();
                        resp.status(500).json(lang.LABEL_500_HTTP);
                    }  
                }
                
            }
            catch(err)
            {
                console.log(lang.LABEL_ERROR_RETURN, err);
                resp.status(500).json(lang.LABEL_500_HTTP);
            }  
        }
    };