// IMPORT MODULES NODEJS
const { check } = require('express-validator');

const minPassword = process.env.PASS_LONG || 6;
// EXPORTING MODULE
module.exports = {
  userLoginValidator: [
    check('email').isEmail(),
    check('password').isLength({ min: minPassword }),
  ],
  getCategoryTotal: [
    check('authorization').notEmpty(),
  ],
  getbaeImageTotal: [
    check('authorization').notEmpty(),
  ],
  getCategoryUnvisible: [
    check('authorization').notEmpty(),
  ],
  getCategoryVisible: [
    check('authorization').notEmpty(),
  ],
  userCreateValidator: [
    check('email').isEmail(),
    check('password').isLength({ min: minPassword }),
    check('username').notEmpty(),
    check('name').notEmpty(),
    check('surname').notEmpty(),
  ],
  adminCreateValidator: [
    check('email').isEmail(),
    check('username').notEmpty(),
    check('name').notEmpty(),
    check('surname').notEmpty(),
    check('authorization').notEmpty(),
  ],
  getUser: [
    check('authorization').notEmpty(),
  ],
  resetPassword: [
    check('authorization').notEmpty(),
    check('password').isLength({ min: minPassword }),
  ],
  logout: [
    check('authorization').notEmpty(),
  ],
  posts: [
    	check('authorization').notEmpty(),
	  	check('lang').notEmpty(),
    check('type').notEmpty(),
    check('title').notEmpty(),
    	check('seo').notEmpty(),
    	check('important').isNumeric({ min: 0 }),
    	check('content').notEmpty(),
    check('visible').isBoolean(),
    check('category').notEmpty(),
  ],
  updatePosts: [
    check('authorization').notEmpty(),
    check('codPosts').notEmpty(),
    check('lang').notEmpty(),
    check('type').notEmpty(),
    check('title').notEmpty(),
    check('seo').notEmpty(),
    check('important').isNumeric({ min: 0 }),
    check('content').notEmpty(),
    check('visible').isBoolean(),
    check('category').notEmpty(),
  ],
  getListNumberImage: [
    check('authorization').notEmpty(),
  ],
  updateVideo: [
    check('authorization').notEmpty(),
  ],
  getSingleCategory: [
    check('authorization').notEmpty(),
    check('code').notEmpty(),
  ],
  getSinglePost: [
    check('authorization').notEmpty(),
    check('code').notEmpty(),
  ],
  deletePosts: [
    check('authorization').notEmpty(),
  ],
  deleteImage: [
    check('authorization').notEmpty(),
    check('codImage').notEmpty(),
  ],
  deleteFile: [
    check('authorization').notEmpty(),
    check('codFile').notEmpty(),
  ],
  	numberPosts: [
    	check('authorization').notEmpty(),
  	],
  	numberMailSub: [
    	check('authorization').notEmpty(),
  	],
  	getChatsUsersNumbers: [
    	check('authorization').notEmpty(),
  	],
  	getEarningNumber: [
    	check('authorization').notEmpty(),
  	],
  	getPostsData: [
    	check('authorization').notEmpty(),
  ],
  modifyUser: [
    check('authorization').notEmpty(),
    check('email').notEmpty(),
    check('username').notEmpty(),
    check('name').notEmpty(),
    check('surname').notEmpty(),
  ],
  resetPassord: [
    check('authorization').notEmpty(),
    check('newPassword').notEmpty(),
  ],
  createCategory: [
    check('authorization').notEmpty(),
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('titleSeo').notEmpty(),
    check('important').notEmpty(),
    check('visible').isBoolean(),
  ],
  getAllCategory: [
    check('authorization').notEmpty(),
  ],
  getCategoryWithFilter: [
    check('authorization').notEmpty(),
  ],
  createSubcategory: [
    check('authorization').notEmpty(),
    check('codCategoryPrincipal').notEmpty(),
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('titleSeo').notEmpty(),
    check('important').notEmpty(),
    check('visible').isBoolean(),
  ],
  modifyCategory: [
    check('codCategory').notEmpty(),
    check('authorization').notEmpty(),
    check('name').notEmpty(),
    check('description').notEmpty(),
    check('titleSeo').notEmpty(),
    check('important').notEmpty(),
    check('visible').isBoolean(),
  ],
  deleteCategory: [
    check('codCategory').notEmpty(),
    check('authorization').notEmpty(),
  ],
  deleteVideo: [
    check('codVideo').notEmpty(),
    check('authorization').notEmpty(),
  ],
  imageUpload: [
    check('authorization').notEmpty(),
  ],
  imageUploadBase: [
    check('authorization').notEmpty(),
    check('images').notEmpty(),
    check('names').notEmpty(),
  ],
  uploadFile: [
    check('authorization').notEmpty(),
  ],
  getImagesList: [
    check('authorization').notEmpty(),
  ],
  getImagesListBase: [
    check('authorization').notEmpty(),
  ],
  getUserInfo: [
    check('authorization').notEmpty(),
  ],
  getFilesList: [
    check('authorization').notEmpty(),
  ],
  getVideosList: [
    check('authorization').notEmpty(),
  ],
  getVideosListWithFilter: [
    check('authorization').notEmpty(),
  ],
  getImagesListWithFilter: [
    check('authorization').notEmpty(),
  ],
  getFilesListWithFilter: [
    check('authorization').notEmpty(),
  ],
  getAllNumberCategory: [
    check('authorization').notEmpty(),
  ],
};
