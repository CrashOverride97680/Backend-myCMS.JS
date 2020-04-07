// IMPORT MODULES NODEJS
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const auth = require('../autentication/auth');
const isValid = require('../autentication');
// ROUTES APP
// -> GET
// -> POST
router
	.post('/login', auth.userLoginValidator, isValid.runValidation, controller.login)
	.post('/register', auth.userCreateValidator, isValid.runValidation, controller.register)
	.post('/logout', controller.logout)
	.post('/posts', controller.createPost);
// -> PUT
// -> DELETE
// -> TEST
if (process.env.NOD_ENV_TEST)
{
	router
		.get('/test', controller.test)
		.get('/secret', controller.requireSignin, controller.secretTest)
		.get('/testmail', controller.testMail);
	router
		.post('/checktoken', controller.checkTokenTest);
}
// -> 404
router.get('*', controller.notFound);
// EXPORTING ROUTES
module.exports = router;