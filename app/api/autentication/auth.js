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
	adminCreateUser: [
		check('email').isEmail(),
		check('username').notEmpty(),
		check('name').notEmpty(),
		check('surname').notEmpty(),
		check('authorization').notEmpty()
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
    check('authorization').notEmpty(),
	  check('lang').notEmpty(),
		check('type').notEmpty(),
    check('title').notEmpty(),
    check('header').notEmpty(),
    check('content').notEmpty(),
    check('visible').isBoolean()
	],
  	numberPosts: [
    check('authorization').notEmpty()
  ],
  	numberMailSub: [
    check('authorization').notEmpty()
  ],
  	getChatsUsersNumbers: [
    	check('authorization').notEmpty()
  	],
  	getEarningNumber: [
    	check('authorization').notEmpty()
  	],
  	getPostsData: [
    	check('authorization').notEmpty()
  	],
};
