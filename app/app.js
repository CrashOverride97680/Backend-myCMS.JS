// IMPORT MODULES NODEJS
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const dotenv = require('dotenv').config();
const log4js = require('log4js');
const router = require('./api/router/router');
const scheduler = require('./api/scheduling/scheduler');
const mongoose = require('mongoose');
const path = require('path'); 
const publicFiles = path.join(__dirname, 'uploads');
const publicFileEmail = path.join(__dirname, 'api', 'template', 'email', 'img');
const cors = require('cors');
const bcrypt = require('bcryptjs');
// IMPORTING LANG AND DEBUG
const langServer = './lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
const maxLimit = process.env.LIMITER_SERVER || 5000000;
const timelimiter = process.env.TIME_LIMITER_SERVER ? process.env.TIME_LIMITER_SERVER * 60 * 1000 : 15 * 60 * 1000;
const locBlacklist = process.env.NODE_ENV_LOCAL_BLACKLIST
					? require('./api/autentication/blacklist-local/blacklist-local')
					: null;
// LOG LIBRARY
log4js.configure({
	appenders: {
		error: {
			type: 'file',
			filename: './log/error.log'
		}
	},
	categories: {
		default: {
			appenders: [ 'error' ],
			level: 'error'
		}
	}
});
// EXPRESS LIMIT MIDDLEWARE
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: timelimiter,
	max: maxLimit,
	message: lang.LABEL_LIMIT_SERVER
});
// IMPORTING DB AND CONNECTS
const connect = require('./api/data/config/mongoConfig');
connect();
// INSTALL USER CMS ROOT
const cmsInstallFunction = require('./api/install');
cmsInstallFunction();
// CHECK EMAIL CONFIGURATION FOR SMTP
if(!process.env.NODE_ENV_HOST_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_HOST);
	process.exit(0);
}

if(!process.env.NODE_ENV_PORT_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_PORT);
	process.exit(0);
}

if(!process.env.NODE_ENV_SECURE_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_SECURE);
	process.exit(0);
}

if(!process.env.NODE_ENV_USER_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_USER);
	process.exit(0);
}

if(!process.env.NODE_ENV_PASS_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_PASSWORD);
	process.exit(0);
} 

if(!process.env.NODE_ENV_SERVICE_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_SERVICE);
	process.exit(0);
}

if(!process.env.NODE_ENV_DEBUG_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_DEBUG);
	process.exit(0);
}

if(!process.env.NODE_ENV_REJECT_UNAUTHORIZED_SMTP) {
	console.log(lang.LANG_DEBUG_EMAIL_REJECT_UNAUTHORIZED);
	process.exit(0);
}

// DEBUG VARIABLES ENVIROMENT
if (process.env.NODE_ENV_DEV || process.env.NODE_DEV_ENV_VAR) console.log(lang.LABEL_ENV_VAR, dotenv);
// RUN SCHEDULER FOR LOCAL BLACKLIST AND REDIS
if(locBlacklist){
	locBlacklist.resetDB_LOCAL();
	scheduler.loadSCheduler();
	console.log(lang.LABEL_LOCAL_CACHE_BLACKLIST_ON);
}
// INIZIALIZE FUNCTION, CLASS, ELEMENT AND MODULES
const app = express();
// CORS FOR EXTERNAL DOMAIN OR DEV *
if ( process.env.NODE_ENV_DEV )
  app.use(cors());
// GENERAL FUNCTIONS
const shouldCompress = (req, res) => {
	if (req.headers['x-no-compression']) return false;
	return compression.filter(req, res);
};
// CHECK PROBLEM API
process
	.on('unhandledRejection', (reason, p) => console.error(reason, 'Unhandled Rejection at Promise', p))
	.on('uncaughtException', err => {
		console.error(err, 'Uncaught Exception thrown');
		process.exit(1);
	});
// USE MIDDLEWARE
app.use(compression({ filter: shouldCompress }));
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
if(maxLimit != 0) {
	app.use('/api', limiter);
	if(process.env.NODE_ENV_DEV) {
		console.log(lang.LABEL_LIMIT_INFORMATION, maxLimit);
	}
}
else if (maxLimit == 0) {
	if(process.env.NODE_ENV_DEV) {
		console.log(lang.LABEL_LIMIT_ILLIMITATED);
	}
}
//  ROUTER ENTRYPOINT
app.use('/api', router);
app.use('/media', express.static(publicFiles));
app.use('/mediaEmail', express.static(publicFileEmail));
/*app.use(express.static(path.join(__dirname, 'public')));*/
// GENERAL VARIABLE AND SETTING CONF
const port = process.env.port || process.env.PORT || 9000;
app.set('PORT', port);
// INIZIALIZE SERVER
// app.listen(app.get('PORT'), 'localhost');
app.listen(app.get('PORT'), () => console.log(lang.LABEL_SERVER, app.get('PORT')));
// EXPORTING APP FOR TESTING
module.exports = app;
