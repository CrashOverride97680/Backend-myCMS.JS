// IMPORT MODULES NODEJS
    const mongoose = require('mongoose');
    const APIMongo = require('../schema/schema');
    const { user } = APIMongo;
// EXPORTING MODULE MONGO
    mongoose.model('user', user);
