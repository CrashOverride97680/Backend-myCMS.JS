// IMPORT MODULES NODEJS
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(__dirname + '/tokens/tokens.json');
const db = low(adapter);
//  EXPORTING NODE MODULE
module.exports =  {
    reset: () => db.defaults({tokens: []}).write(),
    removeAll: name => {
        db
        .get(name)
        .remove()
        .write();
    },
    insert: ({ name, data }) => {
        db.get(name)
        .push(data)
        .write();
    },
    size: name => {
        const data = db.get(name).size().value();
        return data;
    },
};