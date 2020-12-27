// INDEX FILE INSTALLETION CMS
const mongoose = require('mongoose');
// IMPORTING LANG AND DEBUG
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
const bcrypt = require('bcryptjs');
module.exports = () => {
    const findInstall = mongoose.model('settingGeneral');
    findInstall.findOne({
        setting: 'installed',
        value: 'true'
    }, (err, data) => {
        if(err !== null) {
            console.log(lang.LABEL_INSTALLED_CMS_ERROR);
            process.exit(0);
        }
        else {
            if(data.length == 0) {
                const user = mongoose.model('user');
                bcrypt
                    .hash('rootAdmin', 10, (err, hash) => 
                    {
                        user.find({
                            email: 'root@root.com'
                        }, (err, result) => 
                        {
                            if (err == null) {
                                let dateObj = new Date();
                                user.create({
                                    admin: true,
                                    email: 'root@root.com',
                                    password: hash,
                                    username: 'root',
                                    name: 'root',
                                    surname: 'root',
                                    confirmed: true,
                                    create: dateObj.toDateString()
                                }, (err, data) => {
                                    if(err !== null)
                                        console.log(lang.LABEL_DEBUG_INSTALLATION, err)
                                    else {
                                        if(data.length > 0) {
                                            console.log(lang.LABEL_USER_ADMIN_EXIST);
                                        }
                                        else {
                                            const generalSetting = mongoose.model('settingGeneral');
                                            generalSetting.create({
                                                setting: 'installed',
                                                value: 'true'
                                            }, (err, data) => {
                                                if(err == null)
                                                    console.log(lang.LABEL_INSTALLED_CMS);
                                                else {
                                                    console.log(lang.LABEL_DEBUG_INSTALLATION, err);
                                                    process.exit(0);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                            else 
                                console.log(lang.LABEL_INSTALLED_CMS_ERROR);	
                        });
                    });
            } 
        }
    });
};