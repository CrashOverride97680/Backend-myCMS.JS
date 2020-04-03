// IMPORT MODULES NODEJS
    const { check } = require('express-validator');
// IMPORTING LANG AND DEBUG
    const langServer = `../../lang/${( process.env.LANG_SERVER || 'eng' )}`;
    const lang = require(langServer);
// EXPORTING MODULE
    module.exports = {
        userLoginValidator: [
            check('email')
                .isEmail(),
            check('password')
                .isLength({min: 6})
        ]
    }