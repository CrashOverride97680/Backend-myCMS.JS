// IMPORT MODULES NODEJS
const nodemailer = require('nodemailer');
const data = require('./config/config');
// MODULE EXPORT MAIL
module.exports = {
	template: {
		register: ({ username }) => {
			`
                <h1>Confirm you email</h1>
                ${username}.
            `;
		}
	},
	testMail: async () => await nodemailer.createTestAccount(),
	createTransport: ({ host, port, secure, auth }) => nodemailer.createTransport({ host, port, secure, auth }),
	send: async ({ SMTPConfig, from, to, subject, html }) =>
		await SMTPConfig.sendMail({
			from,
			to,
			subject,
			html
		})
};

if (!process.env.NODE_ENV_DEV) {
	const importMailConf = require('./config/config');
	const { host, port, secure, auth } = importMailConf;
	return (module.exports.createConfMail = async ({ host, port, secure, auth }) => {
		const SMTPConfig = nodemailer.createTransport({
			host,
			port,
			secure,
			auth
		});
		return SMTPConfig;
	});
}