// MODULE EXPORT MAIL
const host = (process.env.NODE_ENV_HOST_SMTP) ? process.env.NODE_ENV_HOST_SMTP : null;
const port = (process.env.NODE_ENV_PORT_SMTP) ? process.env.NODE_ENV_PORT_SMTP : null; 
const secure = (process.env.NODE_ENV_SECURE_SMTP) ? process.env.NODE_ENV_SECURE_SMTP : null;
const user = (process.env.NODE_ENV_USER_SMTP) ? process.env.NODE_ENV_USER_SMTP : null;
const pass = (process.env.NODE_ENV_PASS_SMTP) ? process.env.NODE_ENV_PASS_SMTP : null;
const service = (process.env.NODE_ENV_SERVICE_SMTP) ? process.env.NODE_ENV_SERIVE_SMTP : null;
const debug = (process.env.NODE_ENV_DEBUG_SMTP) ? process.env.NODE_ENV_DEBUG_SMTP : null;
const logger = (process.env.NODE_ENV_LOGGER_SMTP) ? process.env.NODE_ENV_LOGGER_SMTP : null;
const rejectUnauthorized = (process.env.NODE_ENV_REJECT_UNAUTHORIZED_SMTP) ? process.env.NODE_ENV_REJECT_UNAUHORIZED_SMTP : null;
module.exports = {
	service,
	host,
	port,
	secure,
	auth: {
		user,
		pass,
	},
    debug,
	logger,
	tls: {
		rejectUnauthorized
	}
	
};