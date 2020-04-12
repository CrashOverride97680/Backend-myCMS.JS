// IMPORT MODULES NODEJS
const multer  = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, '../../public/uploads/');
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + '-' + Date.now());
    },
    fileFilter: function (req, file, cb) {
        if (path.extension(file.originalname) !== '.jpg' || path.extension(file.originalname) !== '.png') {
          return cb(new Error('Only pdfs are allowed'))
        }
        cb(null, true)
    }
});
const upload = multer({ storage });
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
};