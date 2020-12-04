// IMPORT MODULES NODEJS
const nodemailer = require('nodemailer');
const testTemplate = require('../template/email/test');
const registerTemplate = require('../template/email/register');
// MODULE EXPORT MAIL
module.exports = {
	template: {
		register: (code, name) => registerTemplate({
			code,
			name
		}),
		testSend: testTemplate,
	},
	testMail: async () => await nodemailer.createTestAccount(),
	createTransport: (data) => nodemailer.createTransport(data),
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