// IMPORT MODULES NODEJS
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
const mongoose = require('mongoose');
const smtp = require('../smtp/smtp');
// IMPORTING LANG AND DEBUG
const langServer = `../../lang/${process.env.LANG_SERVER || 'eng'}`;
const lang = require(langServer);
// IMPORT ENV DATA OR DEBUG
const secret = process.env.SECRET_KEY || 'secret_key';
const bcrypt = require('bcrypt');
const testUser = process.env.NODE_ENV_DEV
	? {
			id: Math.floor(Math.random() * (999999999 - 99999999 + 1) + 99999999),
			admin: 1,
			email: 'email@test.xd',
			password: 'testUser',
			username: 'TestUser',
			surname: 'TestUser',
			confirmed: true
		}
	: null;
const testUserMail = process.env.NODE_ENV_DEV
	? {
			from: 'test@test.test',
			to: 'test@test.test',
			email: 'email@test.xd',
			subject: 'test',
			username: 'testUsername'
		}
	: null;
//  EXPORTING MODULE
module.exports = {
	// FATTO
	test: (req, resp) => resp.json({ resp: lang.LABEL_JSON_STATUS_NUMBER, server: lang.LABEL_JSON_STATUS }),
	// FATTO
	testMail: (req, resp) => {
		smtp
			.testMail()
			.then((data) => {
				let SMTPConfig = smtp.createTransport({
					host: data.smtp.host,
					port: data.smtp.port,
					secure: data.smtp.secure,
					auth: {
						user: data.user,
						pass: data.pass
					}
				});
				smtp
					.send({
						SMTPConfig,
						from: testUserMail.from,
						to: testUserMail.to,
						subject: testUserMail.subject,
						html: smtp.template.register({ username: testUserMail })
					})
					.then((rejection) => {
						if (rejection.accepted) resp.status(200).json(lang.LABEL_ACCEPTED_SMTP);
						else resp.status(500).json(lang.LABEL_ERROR_SMTP);
					})
					.catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
			})
			.catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
	},
	// FATTO
	secretTest: (req, resp) => resp.json(lang.LABELL_ACCESS_PAGE),
	// FATTO
	checkTokenTest: (req, resp) => {
		const token = req.headers['authorization'];
		jwt.verify(token, secret, (err, decoded) => 
		{
			if(!err)
				resp.status(200).json({
					info: lang.LABEL_DECODE_TOKEN_TEST, 
					message: decoded
				});
			else
				console.log(lang.LABEL_ERROR_RETURN, err);
		});
	},
	// FATTO
	notFound: (req, resp) =>
		resp.status(404).json({ resp: lang.LABEL_JSON_STATUS_NUMBER_NOT_FOUND, server: lang.LABEL_JSON_NOT_FOUND }),
	// FATTO MA DA MODIFICARE
	login: (req, resp) => {
		try {
			const user = {
				email: req.body.email,
				password: req.body.password
			};

			if (user.email == testUser.email && user.password == testUser.password) {
				if (process.env.NODE_ENV_DEV) {
					const { id, username, admin } = testUser;
					jwt.sign({ _id: id, username, admin }, secret, { expiresIn: '1d' }, (err, token) => {
						if (err) {
							console.log(lang.LABEL_ERROR_RETURN, err);
							resp.status(500).json(lang.LABEL_500_HTTP);
						} else {
							resp.cookie('token', token, { expiresIn: '1d' });
							resp.json({
								auth: true,
								token
							});
						}
					});
				}
			} else resp.status(403).json(lang.LABEL_403_HTTP);
		} catch (err) {
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp.status(500).json(lang.LABEL_500_HTTP);
		}
	},
	createPost: (req, resp) => {
		try {
			const auth = req.headers['authorization'];
			if (typeof auth !== 'undefined') {
				jwt.verify(auth, secret, (err, decode) => {
					if (err) resp.status(403).json(lang.LABEL_403_HTTP);
					else resp.status(201).json(lang.LABEL_201_HTTP);
				});
			} else resp.status(403).json(lang.LABEL_403_HTTP);
		} catch (err) {
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp.status(500).json(lang.LABEL_500_HTTP);
		}
	},
	refresh: (req, resp) => {
		const auth = req.headers['authorization'];
		console.log(typeof auth);
		if (typeof auth !== 'undefined') {
			jwt.verify(auth, secret, (err, decode) => {
				console.log('ERROR:', err);
				console.log('DECODE:', decode);
			});
		}
	},
	// FATTO
	logout: (req, resp) => {
		try {
			resp.clearCookie('token');
			resp.status(200).json(lang.LABEL_LOGOUT);
		} catch (err) {
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp.status(500).json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	requireSignin: () => expressJWT({ secret }),
	register: (req, resp) => {
		try {
			const user = {
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				name: req.body.name,
				surname: req.body.surname,
				token: req.headers['authorization'],
				admin: req.admin
			};

			if (process.env.NODE_ENV_DEV) console.log('USER:', user);

			if (!user.token) {
				const findUser = mongoose.model('user', 'users');
				try {
					findUser.findOne(
						{
							email: user.email
						},
						(error, data) => {
							if (error == null) {
								if (data != null) {
									if (data.confirmed == false) resp.status(202).json(lang.LABEL_RESEND_EMAIL);
								} else {
									bcrypt.hash(user.password, 10, (err, hash) => {
										if (!err) {
											const createUser = mongoose.model('user', 'users');
											let dateObj = new Date();
											createUser.create(
												{
													email: user.email,
													password: hash,
													username: user.username,
													name: user.name,
													surname: user.surname,
													create: dateObj.toISOString()
												},
												(err, result) => {
													if (err == null) resp.status(201).json(lang.LABEL_201_HTTP);
												}
											);
										}
									});
								}
							}
						}
					);
				} catch (e) {
					console.log(lang.LABEL_ERROR_RETURN, e);
					resp.status(500).json(lang.LABEL_500_HTTP);
				}
			}
			else {
				
			}
		} catch (e) {
			console.log(lang.LABEL_ERROR_RETURN, e);
			resp.status(500).json(lang.LABEL_500_HTTP);
		}
	}
};
