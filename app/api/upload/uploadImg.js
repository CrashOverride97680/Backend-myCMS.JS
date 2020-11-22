// IMPORT MODULES NODEJS
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
// DECLARE VARIABLES
const limit = 1024 * 3;
// IMPORT MULTER
const multer  = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    },
    limits: {
        fileSize: limit
    },
    fileFilter:  (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) 
        {
            req.fileValidationError = lang.LABEL_MULTER_VALIDATION_ERROR;
            return cb(new Error(lang.LABEL_MULTER_ERROR), false);
        }
        cb(null, true);
    }
});
const upload = multer({ 
    storage: storage
});
const maxBgImages = process.env.NODE_ENV_POST_BG_MAX || 1;
const maxImageBody = ( process.env.NODE_ENV_POST_MAX_GALLERY_BODY <= 12 ) ? process.env.NODE_ENV_POST_MAX_GALLERY_BODY : 12;
const maxGallery = ( process.env.NODE_ENV_POST_MAX_GALLERY <= 12 ) ? process.env.NODE_ENV_POST_MAX_GALLERY : 12;
const maxUploadPhoto = ( process.env.NODE_ENV_POST_MAX_UPLOAD_PHOTOS <= 12 ) ? process.env.NODE_ENV_POST_MAX_UPLOAD_PHOTOS : 12;
const maxFileUpload = ( process.env.NODE_ENV_POST_MAX_UPLOAD_FILE <= 12 ) ? process.env.NODE_ENV_POST_MAX_UPLOAD_FILE : 12;
// EXPORT MODULE NODEJS
module.exports = 
{
    createPost: upload.fields([
        {
            name: 'images',
            maxCount: maxImageBody
        },
        {
            name: 'gallery',
            maxCount: maxGallery
        },
        {
            name: 'backgroundImage',
            maxCount: maxBgImages
        },
    ]),
    test: upload.single('testimg'),
    imgUpload: upload.fields([
        {
            name: 'images',
            maxCount: maxUploadPhoto
        }
    ]),
    fileUpload: upload.fields([
        {
            name: 'files',
            maxCount: maxFileUpload
        }
    ]),
};