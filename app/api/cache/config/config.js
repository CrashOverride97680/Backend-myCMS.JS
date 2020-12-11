// IMPORT MODULES NODEJS
const redis = require('redis');
const langServer = '../../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
const port = process.env.NODE_ENV_REDIS_PORT || 6379;
const url = process.env.NODE_ENV_REDIS_URL || 'redis://redis';
const password = process.env.NODE_ENV_REDIS_PASSWORD || null;
// REDIS CONFIG
module.exports = {
    testClient: () => {
        if(port && url && password) {
            const client = redis
                            .createClient({
                                port,
                                url,
                                password
                            });
            client.on('connect', err => {
                console.log(lang.LABEL_REDIS_CONNECTED_TEST);
            });

            client.on('end', err => {
                console.log(lang.LABEL_END_REDIS_CONNECTION_TEST);
            });

            return client;
        }
        else if(port && url){
            const client = redis
                            .createClient({
                                port,
                                url
                            });
            client.on('connect', err => {
                console.log(lang.LABEL_REDIS_CONNECTED_TEST);
            });

            client.on('end', err => {
                console.log(lang.LABEL_END_REDIS_CONNECTION_TEST);
            });

            return client;
        }
        else return false;
    },
    clientRedisDB: ({
        db
    }) => {
        if(port && url && password) {
            const client = redis
                            .createClient({
                                port,
                                url,
                                password,
                                db
                            });
            client.on('connect', err => {
                console.log(lang.LABEL_REDIS_CONNECTED);
            });

            client.on('end', err => {
                console.log(lang.LABEL_END_REDIS_CONNECTION);
            });
            return client;
        }
        else if(port && url && db){
            const client = redis
                            .createClient({
                                port,
                                url,
                                db
                            });
            client.on('connect', err => {
                console.log(lang.LABEL_REDIS_CONNECTED);
            });

            client.on('end', err => {
                console.log(lang.LABEL_END_REDIS_CONNECTION);
            });
            return client;
        }
        else return false
    },
    clientRedis: () => {
        if(port && url) {
            const client = redis
                            .createClient({
                                port,
                                url
                            });
            client.on('connect', err => {
                console.log(lang.LABEL_REDIS_CONNECTED);
            });

            client.on('end', err => {
                console.log(lang.LABEL_END_REDIS_CONNECTION);
            });
            return client;
        }
        else return false
    },
};