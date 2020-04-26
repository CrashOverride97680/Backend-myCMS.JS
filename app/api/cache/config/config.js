// IMPORT MODULES NODEJS
const redis = require('redis');
const port = process.env.NODE_ENV_REDIS_PORT || 6379;
const host = process.env.NODE_ENV_REDIS_HOST || '127.0.0.1';
const url = process.env.NODE_ENV_REDIS_URL || 'redis://redisCMS';
const password = process.env.NODE_ENV_REDIS_PASSWORD || null;
// REDIS CONFIG
module.exports = {
    testClient: () => {
        if(port && host && url && password) {
            const client = redis
                            .createClient({
                                port,
                                host,
                                url,
                                password
                            });
            return client;
        }
        else if(port && host && url){
            const client = redis
                            .createClient({
                                port,
                                host,
                                url
                            });
            return client;
        }
        else return false;
    },
    clientRedis: ({
        db
    }) => {
        if(port && host && url && password) {
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