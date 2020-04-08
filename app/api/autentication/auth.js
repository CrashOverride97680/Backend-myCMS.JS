// IMPORT MODULES NODEJS
const { check } = require('express-validator');
const minPassword = process.env.PASS_LONG || 6;
// EXPORTING MODULE
module.exports = {
	userLoginValidator: [ check('email').isEmail(), check('password').isLength({ min: minPassword }) ],
	userCreateValidator: [
		check('email').isEmail(),
		check('password').isLength({ min: minPassword }),
		check('username').notEmpty(),
		check('name').notEmpty(),
		check('surname').notEmpty()
	]
};