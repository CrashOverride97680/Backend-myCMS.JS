// IMPORT MODULES NODEJS
const langServer = `../../lang/${process.env.LANG_SERVER || 'eng'}`;
const lang = require(langServer);
// DECLARE VARIABLES
const limit = 1024 * 3;
// IMPORT MULTER
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
	  cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
	  cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
  limits: {
    fileSize: limit,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(mp4|avi|ogv|webm|webvtt)$/)) {
      req.fileValidationError = lang.LABEL_MULTER_VALIDATION_ERROR;
      return cb(new Error(lang.LABEL_MULTER_ERROR), false);
    }
    cb(null, true);
  },
});
const upload = multer({
  storage,
});
const maxVideoUpload = (process.env.NODE_ENV_POST_MAX_UPLOAD_VIDEO <= 12) ? process.env.NODE_ENV_POST_MAX_UPLOAD_VIDEO : 12;
// EXPORT MODULE NODEJS
module.exports = {
  test: upload.single('testvideo'),
  videoUpload: upload.fields([
    {
      name: 'videos',
      maxCount: maxVideoUpload,
    },
  ]),
};
