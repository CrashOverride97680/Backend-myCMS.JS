// IMPORT MODULES NODEJS
const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');    
const adapter = new FileSync(__dirname + '/cacheTokens.json');
const db = low(adapter);
//  EXPORTING NODE MODULE
module.exports = {
    resetDB_LOCAL: () => {
        db.defaults({ tokens: [] }).write();
    },
    removeAll_LOCAL: name => {
        db
        .get(name)
        .remove()
        .write();
    },
    insert_LOCAL: ({ name, data }) => {
        db.get(name)
        .push(data)
        .write();
    },
    size_LOCAL: name => {
        const data = db.get(name).size().value();
        return data;
    },
    findCache_LOCAL: (name, data) => {
        db.get(name).find(data).value()
    },  
    dbRead_LOCAL: data => {
        db.get(data).value()
    },
};