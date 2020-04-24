// IMPORT MODULES NODEJS
const schedule = require('node-schedule');
const cronFormat = process.env.NODE_ENV_CRON_FORMAT || '* * 1 * * *';
const blklist = require('../autentication/blacklist-local/blacklist-local');
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
//  EXPORTING NODE MODULE
module.exports = {
    loadSCheduler: () => {
        blklist.resetDB_LOCAL();
        console.log(lang.LABEL_SCHEDULER_RUN)
    },
};