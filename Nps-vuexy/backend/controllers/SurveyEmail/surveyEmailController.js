const models = require('../../models/index.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
const nodemailer = require('nodemailer');
const EmailTemplate = require('email-templates');

const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const hbs = require('nodemailer-express-handlebars');

const path = require('path');

const jwt = require('jsonwebtoken');

const commonWords = require('./commonwords').commonWords;

// send email survey

async function commentsToWord(userId, reviewMessage) {
	let data = {
		success: 0,
		error: 1,
		message: 'Error !',
	};
	let cWords = commonWords;
	try {
		const string = reviewMessage;
		let commentKeywords = string.trim().split(' ');

		commentKeywords = commentKeywords.filter(
			(val) => !cWords.includes(val)
		);

		commentKeywords &&
			commentKeywords.length > 0 &&
			commentKeywords.map(async (data) => {
				let loopFind = await models.comment_keywords.findOne({
					where: {
						word: data,
					},
				});

				if (loopFind) {
					let updateCount = loopFind.count + 1;
					let updateId = loopFind.id;
					await models.comment_keywords.update(
						{
							count: updateCount,
						},
						{
							where: {
								id: updateId,
							},
						}
					);

					// console.log('data', {
					// 	word: loopFind.word,
					// 	count: loopFind.count + 1,
					// 	oldCount: loopFind.count,
					// });
				} else {
					let createData = {
						user_id: userId,
						word: data,
						count: 1,
					};

					await models.comment_keywords.create(createData);

					// console.log('not in loopFind', {
					// 	word: data,
					// 	count: 1,
					// 	oldCount: 0,
					// });
				}
			});

		data = {
			success: 1,
			error: 0,
			message: 'Success !',
		};

		return data;
	} catch (error) {
		console.log(error);
		return data;
	}
}

exports.sendSurveyEmail = catchAsyncErrors(async (req, res, next) => {
	let { surveyId, emailList } = req.body;

	try {
		let survayData = await models.survey.findOne({
			where: {
				id: surveyId,
			},
		});

		if (survayData == null) {
			return res.status(200).json({
				success: 0,
				error,
				message: 'error',
			});
		} else {
			let string = emailList;

			emailListArr = string.split(',');

			const token = jwt.sign({ surveyId }, process.env.JWT_SECRET);

			console.log('token', token);
			var transporter = nodemailer.createTransport({
				secureConnection: true, // TLS requires secureConnection to be false
				host: process.env.MAIL_HOST,
				port: process.env.MAIL_PORT,
				auth: {
					user: process.env.MAIL_USERNAME, // generated ethereal user
					pass: process.env.MAIL_PASSWORD, // generated ethereal password
				},
			});

			const handlebarsOptions = {
				viewEngine: {
					extName: '.handlebars',
					partialsDir: path.resolve('./templates'),
					defaultLayout: false,
					helpers: {
						if_eq: function (a, b, opts) {
							if (a == b)
								// Or === depending on your needs
								return opts.fn(this);
							else return opts.inverse(this);
						},
					},
				},
				viewPath: path.resolve('./templates'),
				estName: '.handlebars',
			};

			transporter.use('compile', hbs(handlebarsOptions));

			var mailOptions = {
				from: process.env.MAIL_FROM_ADDRESS, // sender address
				to: emailListArr, // list of receivers
				subject: 'Survey Email', // Subject line
				text: 'Nps email?', // plain text body
				template: 'standardEmailTemplate',
				context: {
					userName: 'bhavik',
					brand: survayData && survayData.brand_title,
					question: survayData && survayData.question,
					surveyResponseUrl: `http://localhost:3001/email-comment/${survayData.id}/${token}/`,

					// color: '#ff0000',
					// button_shape: 'border-radius',
					// button_style: 'bordered',
					color: survayData && survayData.brand_color,
					button_shape:
						survayData && survayData.button_shape == 'round'
							? 100
							: survayData.button_shape == 'border-radius'
							? 10
							: 0,
					button_style: survayData && survayData.button_style,
				},
			};

			console.log('context', mailOptions.context);

			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log('error sending email: ' + error);
					return res.status(200).json({
						success: 0,
						error,
						message: 'error',
					});
				} else {
					console.log('email sent' + info);
					return res.status(200).json({
						success: 1,
						error: 0,
						message: 'Email sent successfully.',
						// survayData,
						info,
					});
				}
			});

			// return res.status(200).json({
			// 	success: 1,
			// 	error: 0,
			// 	token,
			// 	message: 'success token',
			// });
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			error,
			message: 'error',
		});
	}
});

exports.setEmailSurveyResponse = catchAsyncErrors(async (req, res, next) => {
	try {
		let { survey_id, review_message, name, score, token } = req.body;

		data = { survey_id, review_message, name, score };

		if (token == null || token == '' || token == undefined) {
			return res.status(200).json({
				success: 0,
				error: 1,

				message: 'Error !',
			});
		} else {
			let tokenCheck = await models.survey_response.findOne({
				where: {
					token: token,
				},
			});

			if (tokenCheck == null) {
				if (
					survey_id == '' ||
					score == '' ||
					survey_id == undefined ||
					score == undefined ||
					survey_id == null ||
					score == null
				) {
					return res.status(200).json({
						success: 0,
						error: 1,
						message: 'Required params are missing',
					});
				} else {
					let survey = await models.survey.findOne({
						where: {
							id: survey_id,
						},
						attributes: ['user_id'],
					});

					if (survey != null) {
						let scoreValue = score;
						if (score > 10) {
							scoreValue = 10;
						} else if (score < 0) {
							scoreValue = 0;
						} else {
							scoreValue = score;
						}

						let createData = {
							user_id: survey.user_id,
							survey_id: survey_id,
							score_value: scoreValue,
							name: name,
							review_message: review_message,
							ip_address: req.socket.remoteAddress,
							token: token,
						};

						let data = await models.survey_response.create(
							createData
						);

						if (data) {
							let commentData;
							await commentsToWord(
								survey.user_id,
								review_message
							).then((res) => {
								commentData = res;
							});

							return res.status(200).json(commentData);
						} else {
							return res.status(200).json({
								success: 0,
								error: 1,
								message: 'Survey Create Error !',
							});
						}
					} else {
						return res.status(200).json({
							success: 0,
							error: 1,
							message: 'Survey not found !',
						});
					}
				}
			} else {
				return res.status(200).json({
					success: 0,
					error: 1,
					// tokenCheck,
					message: 'You already filled this survey !',
				});
			}
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			error,
			message: 'Error !',
		});
	}
});
