// IMPORT MODULES NODEJS
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
// IMPORT MULTER
const multer  = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, '../../uploads/');
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + '-' + Date.now());
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
const maxBgImages = process.env.POST_BG_MAX || 1;
const maxImageBody = process.env.POST_MAX_GALLERY_BODY || 12;
const maxGallery = process.env.POST_MAX_GALLERY || 12;
// EXPORT MODULE NODEJS
module.exports = 
{
    createPost: upload.fields([
        {
            name: 'backgroundImage',
            maxCount: maxBgImages
        },
        {
            name: 'images',
            maxCount: maxImageBody
        },
        {
            name: 'gallery',
            maxCount: maxGallery
        },
    ]),
    test: upload.single('testimg'),
};