// IMPORT MODULES NODEJS
const { validationResult } = require('express-validator');
// IMPORTING LANG AND DEBUG
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
// EXPORTING MODULES
module.exports.runValidation = (req, resp, next) => {
    const errorValidation = validationResult(req);
    if (process.env.NODE_ENV_DEV)
        console.log(lang.LABEL_ERROR_RETURN, errorValidation);
    if (!errorValidation.isEmpty())
        return resp.status(422).json(lang.LABEL_422_HTTP);
    next();
};