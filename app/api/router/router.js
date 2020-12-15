// IMPORT MODULES NODEJS
const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');
const auth = require('../autentication/auth');
const isValid = require('../autentication');
const uploadImg = require('../upload/uploadImg');
const uploadFile = require('../upload/uploadFile');
const uploadVideo = require('../upload/uploadVideo');
const installationCMS = (process.env.NODE_INSTALL_CMS) ? process.env.NODE_INSTALL_CMS : false;
const registerUsers = (process.env.NODE_USER_SUBSCRIBE) ? process.env.NODE_USER_SUBSCRIBE : false;
// ROUTES APP

// -> GET
router
	.get('/getPostsNumbers', auth.numberPosts, isValid.runValidation, controller.getPostsNumbers)
  	.get('/getMailSubNumbers', auth.numberMailSub, isValid.runValidation, controller.getMailSubNumbers)
  	.get('/getChatsNumbers', auth.getChatsUsersNumbers, isValid.runValidation, controller.getChatsUsersNumbers)
  	.get('/getEarningNumber', auth.getEarningNumber, isValid.runValidation, controller.getEarningNumber)
  	.get('/getAllPosts', auth.getPostsData, isValid.runValidation, controller.getAllPosts)
  	.get('/getPosts/:max', auth.getPostsData, isValid.runValidation, controller.getPostsWithFilter)
  	.get('/getVisiblePostNumber', auth.getPostsData, isValid.runValidation, controller.getVisiblePostNumber)
  	.get('/getUnvisiblePostNumber', auth.getPostsData, isValid.runValidation, controller.getUnvisiblePostNumber)
  	.get('/getAllPostsTable', auth.getPostsData, isValid.runValidation, controller.getAllPostsTable)
  	.get('/getAllCategory', auth.getAllCategory, isValid.runValidation, controller.getAllCategory)
	.get('/getCategory/:max', auth.getCategoryWithFilter, isValid.runValidation, controller.getCategoryWithFilter)
	.get('/getListImagesUploaded', auth.getImagesList, isValid.runValidation, controller.getImagesUploaded)
	.get('/getListImage/:max', auth.getImagesListWithFilter, isValid.runValidation, controller.getAllImageWithFilter)
	.get('/getListVideoUploaded', auth.getVideosList, isValid.runValidation, controller.getAllVideoUploaded)
	.get('/getVideos/:max', auth.getVideosListWithFilter, isValid.runValidation, controller.getAllVideoWithFilter)
	.get('/getListFilesUploaded', auth.getFilesList, isValid.runValidation, controller.getFilesUploaded)
	.get('/getFiles/:max', auth.getFilesListWithFilter, isValid.runValidation, controller.getAllFilesWithFilter)
	.get('/validateRegistration/:token', controller.validateRegistration);

// -> POST
router
	.post('/login', auth.userLoginValidator, isValid.runValidation, controller.login);
if (process.env.NODE_USER_SUBSCRIBE)
	router
		.post('/register', auth.userCreateValidator, isValid.runValidation, controller.register);
router
	.post('/registerAdmin', auth.adminCreateValidator, isValid.runValidation, controller.registerAdmin)
	.post('/logout', auth.logout, isValid.runValidation, controller.logout)
	.post('/createCategory', auth.createCategory, isValid.runValidation, controller.createCategorySite)
	.post('/createSubcategory', auth.createSubcategory, isValid.runValidation, controller.createSubCategorySite)
	.post('/createpost', auth.posts, isValid.runValidation, controller.createPost)
	.post('/imgUpload', auth.imageUpload, isValid.runValidation, controller.checkAdminUser, uploadImg.imgUpload, controller.uploadImg)
	.post('/fileUpload', auth.uploadFile, isValid.runValidation, controller.checkAdminUser, uploadFile.fileUpload, controller.uploadFiles)
	.post('/videoUpload', auth.updateVideo, isValid.runValidation, controller.checkAdminUser, uploadVideo.videoUpload, controller.uploadVideo);

// -> PUT
router
	.put('/modifyCategory', auth.modifyCategory, isValid.runValidation, controller.modifyCategory)
	.put('/modifyUsers', auth.modifyUser, isValid.runValidation, controller.modifyUser)
	.put('/resetPassword', auth.resetPassord, isValid.runValidation, controller.resetPassword)
	.put('/modifyPosts', auth.updatePosts, isValid.runValidation, controller.modifyPosts);

// -> DELETE
router
	.delete('/deleteFile', auth.deleteFile, isValid.runValidation, controller.deleteFile)
	.delete('/deleteImage', auth.deleteImage, isValid.runValidation, controller.deleteImage)
	.delete('/deleteCategory', auth.deleteCategory, isValid.runValidation, controller.deleteCategory)
	.delete('/deletePosts', auth.deletePosts, isValid.runValidation, controller.deletePosts)
	.delete('/deleteVideo', auth.deleteVideo, isValid.runValidation, controller.deleteVideo)
	.delete('/deleteUser', controller.chechUserAuth, controller.deleteUser);

// -> TEST
if(process.env.NODE_TEST_ADMIN) 
{
	router
		.get('/testToken', controller.sendTestToken)
		.post('/createAdminUser', controller.adminCreateForTesting);
}

if (process.env.NODE_ENV_TEST)
{
	router
		.get('/test', controller.test)
		.get('/secret', controller.requireSignin, controller.secretTest)
		.get('/testmail', controller.testMail)
		.get('/testSendingEmail', controller.testSendingEmail);
	router
		.post('/checktoken', controller.checkTokenTest)
		.post('/testimg', uploadImg.test, controller.uploadTest);		
}

if (process.env.NODE_ENV_ALLERT) 
{
	router
		.post('/AllertCreateAdminUser', controller.adminCreateForAllert);
}
// INSTALLETION CMS
// -> RUN INSTALLATION VIA API FOR INIT CMS
if(installationCMS) {
	router
		.get('/installcms', controller.installcms);
}

// -> 404
router.get('*', controller.notFound);

// EXPORTING ROUTES
module.exports = router;