// IMPORT MODULES NODEJS
    const express = require('express');
    const router = express.Router();
    const dotenv = require('dotenv').config();
    const controller = require('../controller/controller');
// ROUTES APP
// -> GET
// -> POST
    router
    .post('/login', controller.login)
    .post('/refresh', controller.refresh)
    .post('/posts', controller.createPost);
// -> PUT
// -> DELETE
// -> TEST
if ( process.env.NOD_ENV_TEST )
    router
    .get('/test', controller.test);
// -> 404
    router
    .get('*', controller.notFound);
// EXPORTING ROUTES
    module.exports = router;