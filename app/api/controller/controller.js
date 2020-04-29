// IMPORT MODULES NODEJS
const jwt = require('jsonwebtoken');
const expressJWT = require('express-jwt');
// IMPORTING LOCAL CACHING BLACKLIST
const blkLocal = process.env.NODE_ENV_LOCAL_BLACKLIST
				? require('../autentication/blacklist-local/blacklist-local')
				: null
// IMPORT MONGO DB ( MONGOSCHEMA )
const mongoose = require('mongoose');
// IMPORT SMTP ( IMPORTING SMTP)
const smtp = require('../smtp/smtp');
// IMPORTING LANG AND DEBUG
const langServer = '../../lang/' + (process.env.LANG_SERVER || 'eng');
const lang = require(langServer);
// IMPORT ENV DATA OR DEBUG
const secret = process.env.SECRET_KEY || 'secret_key';
const bcrypt = require('bcryptjs');
const testUser = process.env.NODE_ENV_DEV
	? 	{
			id: Math.floor(Math.random() * (999999999 - 99999999 + 1) + 99999999),
			admin: true,
			email: 'email@test.xd',
			password: 'testUser',
			username: 'TestUser',
			surname: 'TestUser',
			confirmed: true
		}
	: null;
const testUserMail = process.env.NODE_ENV_DEV
	? 	{
			from: 'test@test.test',
			to: 'test@test.test',
			email: 'email@test.xd',
			subject: 'test',
			username: 'testUsername'
		}
	: null;
//  REDIS CACHING MODULE
const redis = !process.env.NODE_ENV_LOCAL_BLACKLIST
			? require('redis')
			: null;
const redisConfig = !process.env.NODE_ENV_LOCAL_BLACKLIST 
				? require('../cache/config/config')
				: null;
//  EXPORTING MODULE
module.exports = 
{
	// FATTO
	test: (req, resp) => 
	{
		resp
			.json({ 
				resp: lang.LABEL_JSON_STATUS_NUMBER, 
				server: lang.LABEL_JSON_STATUS 
			});
	},
	// FATTO
	testMail: (req, resp) => 
	{
		smtp
			.testMail()
			.then(data => {
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
						if (rejection.accepted) 
							resp
								.status(200)
								.json(lang.LABEL_ACCEPTED_SMTP);
						else
						resp
							.status(500)
							.json(lang.LABEL_ERROR_SMTP);
					})
					.catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
			})
			.catch(() => resp.status(500).json(lang.LABEL_500_HTTP));
	},
	// FATTO
	secretTest: (req, resp) => resp.json(lang.LABELL_ACCESS_PAGE),
	// FATTO
	checkTokenTest: (req, resp) => 
	{
		const token = req.headers['authorization'];
		jwt
			.verify(token, secret, (err, decoded) => 
			{
				if(!err)
					resp
						.status(200)
						.json({
							info: lang.LABEL_DECODE_TOKEN_TEST, 
							message: decoded
						});
				else
				{
					console.log(lang.LABEL_ERROR_RETURN, err);
					resp
						.status(403)
						.json(lang.LABEL_403_HTTP);
				}
			});
	},
	// FATTO
	notFound: (req, resp) => 
	{
		resp
			.status(404)
			.json({ 
				resp: lang.LABEL_JSON_STATUS_NUMBER_NOT_FOUND, 
				server: lang.LABEL_JSON_NOT_FOUND 
			});
	},
	// FATTO
	login: (req, resp) => 
	{
		try 
		{
			const user = {
				email: req.body.email,
				password: req.body.password,
			};

			if (user.email === testUser.email && user.password === testUser.password) 
			{
				if (process.env.NODE_ENV_DEV) 
				{
					const { 
						id, 
						username, 
						admin 
					} = testUser;
					jwt
						.sign({ _id: id, username, admin }, secret, { expiresIn: '1d' }, (err, token) => 
						{
							if (err) 
							{
								console.log(lang.LABEL_ERROR_RETURN, err);
								resp
									.status(500)
									.json(lang.LABEL_500_HTTP);
							}
							else 
							{
								resp
									.json({
										auth: true,
										token
									});
							}
						});
				}
				else
				{
					try 
					{
						const mongoUser = mongoose.model('user', 'users');
						const { email, password } = user;
						mongoUser
							.findOne({
								email,
								confirmed: true
							}, (err, result) => {
								if(err === null)
								{
									if(result !== null)
									{
										const data = result;
										bcrypt
											.compare(password, data.password, (err, result) =>
											{
												if(result)
												{
													const { _id, username, admin } = data;
													jwt
														.sign({ _id, username, admin }, secret, { expiresIn: '1d' }, (err, token) => 
														{
															if (err) 
															{
																console.log(lang.LABEL_ERROR_RETURN, err);
																resp
																	.status(500)
																	.json(lang.LABEL_500_HTTP);
															}
															else 
															{
																resp
																	.json({
																		auth: true,
																		admin,
																		token
																	});
															}
														});
												}
											});
									}
								}
							});
					}
					catch(err)
					{
						console.log(lang.LABEL_ERROR_RETURN, err);
						resp
							.status(403)
							.json(lang.LABEL_403_HTTP);
					}
				}
			} 
			else 
				resp
					.status(403)
					.json(lang.LABEL_403_HTTP);
		} 
		catch (err) 
		{
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// DA FARE
	createPost: (req, resp) =>
	{
		try 
		{
			/*
			const data = 
			{
				template: req.body.template,
				page: req.body.page,
				lang: req.body.lang,
				type: req.body.type,
				h1: req.body.h1,
				mainContent: req.body.mainContent,
				breadcrumbs: req.body.breadcrumbs,
				bodyPost: req.body.bodyPost,
				bodyPostImages:  req.files.bodyPostImages,
				backgroundImage: req.files.backgroundImages,
				gallery: req.files.gallery,
				galleryAlt: req.body.galleryAlt,
				visible: req.body.visible,
			};
			*/
			if(process.env.NODE_ENV_DEV)
				console.log(lang.LABEL_UPLOADFILE_CHECK, req.files);
			resp.status(200).json(lang.LABEL_UPLOAD_STATUS_COMPLETE);
		} 
		catch (err) 
		{
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	logout: (req, resp) => 
	{
		try 
		{
			const token = req.headers['authorization'];
			if(blkLocal !== null)
			{
				jwt
					.verify(token, secret, (err, decoded) => 
					{
						const { _id, username } = decoded;
						const tokenBlacklist = blkLocal
													.findCache_LOCAL({
														name:'tokens', 
														data:{
															token
														}
													});
						if(!tokenBlacklist)
						{
							blkLocal
								.insert_LOCAL({
									name:'tokens',
									data:{
										_id,
										username,
										token				
									}
								});
							resp
								.status(200)
								.json(lang.LABEL_200_HTTP);
						}
						else
							resp
								.status(403)
								.json(lang.LABEL_403_HTTP);
					});
			}
			else if (blkLocal === null) 
			{
				jwt
					.verify(token, secret, (err, decoded) => 
					{
						const { _id, username } = decoded;
						const client = redisConfig.clientRedis();
						const tokenBlacklist = client
													.get(token, (err, reply) =>
													{
														if(!reply){
															const data = new Date();
															const value = JSON
																			.stringify(
																			{
																				_id,
																				username,
																				time: data.toISOString()
																			});
															client.set(token, value, redis.print);
															resp
																.status(200)
																.json(lang.LABEL_200_HTTP);
														}
														else
															resp
																.status(403)
																.json(lang.LABEL_403_HTTP);
													});
											
					});
			}
		} 
		catch (err) 
		{
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	requireSignin: () => expressJWT({ secret }),
	// FATTO
	register: (req, resp) => 
	{
		try 
		{
			const user = 
			{
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				name: req.body.name,
				surname: req.body.surname,
				token: req.headers['authorization'],
				admin: req.admin
			};

			if (process.env.NODE_ENV_DEV) 
				console.log('USER:', user);

			if (!user.token) 
			{
				const findUser = mongoose.model('user', 'users');
				try 
				{
					findUser
						.findOne({email: user.email}, (error, data) => 
						{
							if (error === null) 
							{
								if (data !== null)
								{
									if (data.confirmed === false) 
										resp
											.status(202)
											.json(lang.LABEL_RESEND_EMAIL);
								} 
								else 
								{
									bcrypt
										.hash(user.password, 10, (err, hash) => 
										{
											if (!err) 
											{
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
												(err, result) => 
												{
													if (err == null) 
														resp
															.status(201)
															.json(lang.LABEL_201_HTTP);
												});
											}
										});
								}
							}
						});
				} 
				catch (e) 
				{
					console.log(lang.LABEL_ERROR_RETURN, e);
					resp
						.status(500)
						.json(lang.LABEL_500_HTTP);
				}
			}
			else 
			{
				const token = req.headers['authorization'];
				const client = redisConfig.clientRedis();
				client
					.get(token, (err, reply) =>
					{
						if(reply)
							resp
								.status(403)
								.json(lang.LABEL_403_HTTP);
						else
						{
							jwt
								.verify(token, secret, (err, decoded) => 
								{
									if(!err)
									{
										const { 
											id, 
											admin 
										} = decoded;
										if(admin)
										{
											const findUser = mongoose.model('user', 'users');
											findUser
												.findOne(id, (error, data) => 
												{
													if (error === null) 
													{
														if (data !== null) 
														{
															if (data.confirmed === false) 
																resp
																	.status(202)
																	.json(lang.LABEL_RESEND_EMAIL);
														} 
														else 
														{
															bcrypt
																.hash(user.password, 10, 
																(err, hash) => 
																{
																	if (!err) 
																	{
																		const createUser = mongoose.model('user', 'users');
																		let dateObj = new Date();
																		createUser.create(
																		{
																			admin: user.admin,
																			email: user.email,
																			password: hash,
																			username: user.username,
																			name: user.name,
																			surname: user.surname,
																			create: dateObj.toISOString()
																		},
																		(err, result) => 
																		{
																			if (err === null)
																			{
																				mongoose.connection.close();
																				resp
																					.status(201)
																					.json(lang.LABEL_201_HTTP);
																			} 
																		});
																	}
																});
														}
													}
												});
										} 
										else 
											resp
												.status(403)
												.json(lang.LABEL_403_HTTP);
									}	
									else
									{
										console.log(lang.LABEL_ERROR_RETURN, err);
										resp
											.status(403)
											.json(lang.LABEL_403_HTTP);
									}
								});
						}
					});
			}
		} 
		catch (e) 
		{
			console.log(lang.LABEL_ERROR_RETURN, e);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	requireAdminUser: (req, resp, next) => 
	{
		try
		{
			const token = req.headers['authorization'];
			if (typeof token !== 'undefined') 
			{
				client
					.get(token, (err, reply) =>
					{
						if(reply)
							resp
								.status(403)
								.json(lang.LABEL_403_HTTP);
						else 
						{
							jwt
								.verify(auth, secret, (err, decode) => 
								{
									if (err) 
										resp
											.status(403)
											.json(lang.LABEL_403_HTTP);
									else 
									{
										if(decode.admin)
											next();
										else
											resp
												.status(403)
												.json(lang.LABEL_403_HTTP);

									}
								});
						}
					});
			}
			else	
				resp
					.status(403)
					.json(lang.LABEL_403_HTTP);
		}
		catch(err)
		{	
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	chechUserAuth: (req, resp) => 
	{
		try
		{
			const token = req.headers['authorization'];
			if (typeof token !== 'undefined') 
			{
				client
					.get(token, (err, reply) =>
					{
						if(reply)
							resp
								.status(403)
								.json(lang.LABEL_403_HTTP);
						else 
						{
							jwt
								.verify(auth, secret, (err, decode) => 
								{
									if (err) 
										resp
											.status(403)
											.json(lang.LABEL_403_HTTP);
									else 
										next();
								});
						}
					});
			}
			else	
				resp
					.status(403)
					.json(lang.LABEL_403_HTTP);
		}
		catch(err)
		{	
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	uploadTest: (req, resp) =>
	{
		try
		{
			console.log(lang.LABEL_TEST_UPLOAD, req.file);
			console.log(lang.LABEL_RESULT_UPLOAD_OK);
    		resp.status(200).json(lang.LABEL_200_HTTP);
		}
		catch(err)
		{
			console.log(lang.LABEL_ERROR_RETURN, err);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}	
	},
	// DA FARE
	modifyUser: (req, resp) => 
	{
		try
		{
			const user = 
			{
				email: req.body.email,
				password: req.body.password,
				username: req.body.username,
				name: req.body.name,
				surname: req.body.surname,
				token: req.headers['authorization'],
			};

			if (process.env.NODE_ENV_DEV) 
				console.log('USER:', user);
			jwt
				.verify(token, secret, (err, decoded) => 
				{
					if(!err)
					{
						const { 
							_id
						} = decoded;
						const findUser = mongoose.model('user', 'users');
						findUser
							.findOne({_id, confirmed:true}, (error, data) => 
							{
								if (error === null) 
								{
									if (data !== null) 
									{
										if (data.confirmed === false) 
											resp
												.status(202)
												.json(lang.LABEL_RESEND_EMAIL);
									} 
									else 
									{
										bcrypt
											.hash(user.password, 10, 
											(err, hash) => 
											{
												if (!err) 
												{
													const updateUser = mongoose.model('user', 'users');
													let dateObj = new Date();
													updateUser.findOneAndUpdate(id, 
													{
														admin: user.admin,
														email: user.email,
														password: hash,
														username: user.username,
														name: user.name,
														surname: user.surname
													}, (error, data) => 
													{
														if (err === null)
														{
															mongoose.connection.close();
															resp
																.status(201)
																.json(lang.LABEL_201_HTTP);
														} 
													});
												}
											});
									}
								}
							});
					}	
					else
					{
						console.log(lang.LABEL_ERROR_RETURN, err);
						resp
							.status(403)
							.json(lang.LABEL_403_HTTP);
					}
				});
		} 
		catch (e) 
		{
			console.log(lang.LABEL_ERROR_RETURN, e);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	},
	// FATTO
	deleteUser: (req, resp) => 
	{
		try
		{
			const user = 
			{
				token: req.headers['authorization'],
			};

			if (process.env.NODE_ENV_DEV) 
				console.log('USER:', user);
			jwt
				.verify(user.token, secret, (err, decoded) => 
				{
					if(!err)
					{
						const { 
							_id
						} = decoded;
						const removeUser = mongoose.model('user', 'users');
						removeUser.findByIdAndRemove({_id, confirmed:true}, (err, decode) => 
						{
							if (error === null) 
							{
								if (data !== null) 
								{
									if (data.confirmed === false) 
										resp
											.status(200)
											.json(lang.LABEL_200_HTTP);
								} 
							}
						});	
					}	
					else
					{
						console.log(lang.LABEL_ERROR_RETURN, err);
						resp
							.status(403)
							.json(lang.LABEL_403_HTTP);
					}
				});
		} 
		catch (e) 
		{
			console.log(lang.LABEL_ERROR_RETURN, e);
			resp
				.status(500)
				.json(lang.LABEL_500_HTTP);
		}
	}, 
};