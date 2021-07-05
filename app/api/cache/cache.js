// IMPORT MODULES NODEJS
const redis = require('redis');
const config = require('./config/config');

const testRedis = config.testClient();
// IMPORTING LANG AND DEBUG
const langServer = `../../lang/${process.env.LANG_SERVER || 'eng'}`;
const lang = require(langServer);
if (!testRedis && !process.env.NODE_ENV_LOCAL_BLACKLIST && process.env.NODE_ENV_DEV) {
  console.log(lang.LABEL_REDIS_CONNECTION_ERROR);
  process.exit();
} else if (!testRedis && !process.env.NODE_ENV_LOCAL_BLACKLIST) { process.exit(); }
