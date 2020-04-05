// IMPORT MODULES NODEJS
    const nodemailer = require("nodemailer");
    if( !process.env.NODE_ENV_DEV )
        const configMail = require('./config/config');
// MODULE EXPORT MAIL 
module.exports =
{
    template: 
    {
        register: (
        {
            username
        }) => {
            `
            <h1>Confirm you email</h1>
            ${username}.
            `
        },
    },
    conf: async send({
        host,
        port,
        secure,
        auth
    }) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        if(process.env.NODE_ENV_DEV)
        {
            let testAccount = await nodemailer.createTestAccount();
            return testAccount
        }
        else
        {
            let SMTPConfig = nodemailer.createTransport({
                host
                port,
                secure,
                auth
            });

            return SMTPConfig;
        }
    },
    send({
        SMTPConfig,
        from,
        subject,
        html
    } => await SMTPConfig.sendMail(
        {
            from,
            subject,
            html
        })),
} 
