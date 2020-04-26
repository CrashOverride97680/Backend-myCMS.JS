// IMPORT MODULES NODEJS
const redis = require('redis');
const config = require('./config/config');
const testRedis = config.testClient();
// IMPORTING LANG AND DEBUG
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
if(!testRedis && !process.env.NODE_ENV_LOCAL_BLACKLIST && process.env.NODE_ENV_DEV){
    console.log(lang.LABEL_REDIS_CONNECTION_ERROR);
    process.exit();
}
else if(!testRedis && !process.env.NODE_ENV_LOCAL_BLACKLIST)
    process.exit();
// REDIS CONFIG
module.exports = {
// TOKEN BLACLIST FUNCTION
    saveData: data => {
        try {
            const { key, value } = data;
            const client = config.clientRedis();
            client.set(key, value, (err) => {
                if (err) {
                    if (process.env.NODE_ENV_CHECK_CACHE)
                        console.log(lang.LABEL_REDIS_ERROR_SAVE, err);
                    return false;
                }
                else 
                    return true;
            });
        }
        catch(err) {
            console.log(lang.LABEL_REDIS_CATCH_REDIS, err);
            return false;
        }
    },
};