// IMPORT MODULES NODEJS
    const mongoose = require('mongoose');
    const APIMongo = require('../schema/schema');
    const {
      users,
      posts,
      mailsubscribe,
      chat,
      earning,
      category
    } = APIMongo;
// EXPORTING MODULE MONGO
    mongoose.model('user', users);
    mongoose.model('posts', posts);
    mongoose.model('mailsubscribe', mailsubscribe);
    mongoose.model('chat', chat);
    mongoose.model('earning', earning);
    mongoose.model('category', category);