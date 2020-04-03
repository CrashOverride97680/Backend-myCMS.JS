// IMPORT MODULES NODEJS
    const { check } = require('express-validator');
    const minPassword = process.env.PASS_LONG || 6;
// IMPORTING LANG AND DEBUG
    const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
// EXPORTING MODULE
    module.exports = {
        userLoginValidator: [
            check('email')
                .isEmail(),
            check('password')
                .isLength({min: minPassword})
        ],
        userCreateValidator: [
            check('email')
                .isEmail(),
            check('password')
                .isLength({min: minPassword }),
            check('username')
                .notEmpty(),
            check('name')
                .notEmpty(),
            check('surname')
                .notEmpty(),           
        ],
    }