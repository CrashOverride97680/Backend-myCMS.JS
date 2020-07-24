// IMPORT MODULES NODEJS
const { check } = require('express-validator');
const minPassword = process.env.PASS_LONG || 6;
// EXPORTING MODULE
module.exports = {
	userLoginValidator: [ 
		check('email').isEmail(), 
		check('password').isLength({ min: minPassword }) 
	],
	userCreateValidator: [
		check('email').isEmail(),
		check('password').isLength({ min: minPassword }),
		check('username').notEmpty(),
		check('name').notEmpty(),
		check('surname').notEmpty()
	],
	adminCreateValidator: [
		check('email').isEmail(),
		check('username').notEmpty(),
		check('name').notEmpty(),
		check('surname').notEmpty(),
		check('admin').notEmpty(),
		check('authorization').notEmpty()
	],
	getUser:[
		check('authorization').notEmpty()
	],
	resetPassword:[
		check('authorization').notEmpty(),
		check('password').isLength({ min: minPassword })
	],
	logout:[
		check('authorization').notEmpty()
	],
	posts:[
		check('page').notEmpty(),
		check('lang').isLength({min: 1}),
		check('typePage').isLength({min: 1}),
		check('backgroundImage').notEmpty(),
		check('h1').notEmpty(),
		check('mainContent').notEmpty(),
		check('breadcrumbs').notEmpty(),
		check('bodyPosts').notEmpty(),
		check('gallery').notEmpty(),
		check('visible').isBoolean()
	],
};