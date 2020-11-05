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
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');

module.exports = {

//  CHECK IF TOKEN IS VALID RETURN PROMISE
    isValidToken: ({
        token,
        localBlacklist,
        redisBlacklist
    }) => {
        return new Promise((resolve, reject) => {
            if(!token) reject(langServer.LABEL_500_HTTP);     // CHECK IF TOKEN IS PASSED
            else {
                if ( localBlacklist ) {
                    const blkToken = blkLocal.findCache_LOCAL({ name: 'tokens', data: token });
                    if( blkToken )
                        reject(langServer.LABEL_403_HTTP);
                    else
                        resolve();
                }                   // CHECK INTO LOCAL BLACKLIST
                else if( redisBlacklist ) {
                    const client = redisConfig.clientRedis();
                    const tokenBlacklist = client
                        .get(token, ( error, reply ) => {
                           if(!reply)
                               resolve();
                           else
                               reject(langServer.LABEL_403_HTTP);
                        });
                }               // CHECK INTO REDIS BLACKLIST
                else reject(langServer.LABEL_500_HTTP);       // ERROR IF NOT IN LOCAL OR REDIS BLACKLIST
            }
        });
    },

//  CHECK IF USER IS LOGGED IN RETURN PROMISE
    isLoggedUser: ({
        token
    }) => {
        return new Promise((resolve, reject) => {
            if(!token)
                reject(langServer.LABEL_500_HTTP);
            else {
                
            }
        });
    },
};