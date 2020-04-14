// IMPORT MODULES NODEJS
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('../tokens.json');
db.defaults({tokens: [] }).write();