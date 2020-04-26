// IMPORT MODULES NODEJS
const redis = require('redis');
const config = require('./config/config');
const testRedis = config.testClient();
// IMPORTING LANG AND DEBUG
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
if(!testRedis && !process.env.NODE_ENV_LOCAL_BLACKLIST){
    console.log(lang.LABEL_REDIS_CONNECTION_ERROR);
    process.exit();
}
const blacklistToken = config.clientRedis({db : 'blacklistToken'});
// REDIS CONFIG
module.exports = {
    clientRedis: ({
        db
    }) => {
        if(port && host && url && password && db) {
            const client = redis
                            .createClient({
                                port,
                                host,
                                url,
                                password,
                                db
                            });
            return client;
        }
        else if(port && host && url && db){
            const client = redis
                            .createClient({
                                port,
                                host,
                                url,
                                db
                            });
            return client;
        }
        else return false
    },
};