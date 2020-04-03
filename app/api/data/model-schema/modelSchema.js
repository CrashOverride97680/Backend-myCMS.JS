// IMPORT MODULES NODEJS
    const mongoose = require('mongoose');
    const APIMongo = require('../schema/schema');
    const { users } = APIMongo;
// EXPORTING MODULE MONGO
    mongoose.model('user', users);