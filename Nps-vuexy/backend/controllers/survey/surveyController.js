const models = require('../../models/index.js');
var sequelize = require('sequelize');
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const hbs = require('nodemailer-express-handlebars');
const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
var express = require('express');
const path = require('path');

const commonWords = require('./commonwords').packageCommonWords;

const { Configuration, OpenAIApi } = require('openai');

exports.getAllWords = catchAsyncErrors(async (req, res, next) => {
	let commentFromUser = req.body.comment;
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_API_KEY,
	});

	console.log('commentFromUser', commentFromUser);
	const openai = new OpenAIApi(configuration);

	const response = await openai.createCompletion('text-davinci-002', {
		prompt: commentFromUser,
		temperature: 0,
		max_tokens: 200,
		top_p: 0,
		frequency_penalty: 2,
		presence_penalty: 0,
	});

	let cWords = commonWords;
	let string =
		response.data &&
		response.data.choices &&
		response.data.choices[0].text;

	let mainstring = string;
	string = string.toLowerCase();
	string = string.replace(/[^a-zA-Z ]/g, '');
	string = string.replace(/^\s+|\s+$/gm, '');
	let commentKeywords = string.trim().split(' ');

	let final = commentKeywords.filter((val) => !cWords.includes(val));
	let qwe = [];
	final.map((ele) => {
		if (ele) {
			qwe.push(ele);
		}
	});

	return res.status(200).json({
		success: 1,
		string,
		commentFromUser,
		stringFromOpenAi: string,
		finalList: qwe,
	});
});

// exports.getAllWords = catchAsyncErrors(async (req, res, next) => {
// 	let cWords = commonWords;
// 	let string = `This The AND  ii 657 @ 4 ^^^& *&*&* ,kgyluhb iokythi bhgbhi ghb y, uhhih'n`;
// 	let mainstring = string;
// 	string = string.toLowerCase();
// 	string = string.replace(/[^a-zA-Z ]/g, '');
// 	string = string.replace(/^\s+|\s+$/gm, '');
// 	let commentKeywords = string.trim().split(' ');

// 	let final = commentKeywords.filter((val) => !cWords.includes(val));
// 	let qwe = [];
// 	final.map((ele) => {
// 		if (ele) {
// 			qwe.push(ele);
// 		}
// 	});

// 	return res.status(200).json({
// 		success: 1,
// 		mainstring,
// 		string,
// 		commentKeywords,
// 		qwe,

// 		// data: cWords,
// 	});
// });

async function commentsToWord(userId, reviewMessage) {
	let data = {
		success: 0,
		error: 1,
		message: 'Error !',
	};

	try {
		// const configuration = new Configuration({
		// 	apiKey: process.env.OPENAI_API_KEY,
		// });

		// const openai = new OpenAIApi(configuration);

		// const response = await openai.createCompletion('text-davinci-002', {
		// 	prompt: reviewMessage,
		// 	temperature: 0,
		// 	max_tokens: 200,
		// 	top_p: 0,
		// 	frequency_penalty: 2,
		// 	presence_penalty: 0,
		// });

		let cWords = commonWords;
		let string = reviewMessage;
		// let string =
		// 	response.data &&
		// 	response.data.choices &&
		// 	response.data.choices[0].text;

		// converting review message into lowercase and removing whitespace,special character and number
		string = string.toLowerCase();
		string = string.replace(/[^a-zA-Z ]/g, '');
		string = string.replace(/^\s+|\s+$/gm, '');

		let commentKeywords = string.trim().split(' ');

		commentKeywords = commentKeywords.filter(
			(val) => !cWords.includes(val)
		);

		commentKeywords &&
			commentKeywords.length > 0 &&
			commentKeywords.map(async (data) => {
				if (data) {
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

exports.getSurveyById = catchAsyncErrors(async (req, res, next) => {
	try {
		const { user_id, survey_id } = req.body;
		let { userId } = req.loggedInUserData && req.loggedInUserData;

		let survey = await models.survey.findOne({
			where: {
				user_id: userId,
				id: survey_id,
			},
			// attributes: ['brand_title'],
		});

		return res.status(200).json({
			success: 1,
			error: 0,
			message: 'success',
			data: survey,
		});
	} catch (error) {
		return res.status(200).json({
			success: 0,
			// error: 1,
			message: 'error',
			error,
		});
	}
});

exports.getAllSurvey = catchAsyncErrors(async (req, res, next) => {
	//  currentPage: page,
	// const upperLimit = page * pageSize;
	//       pageSize: pageSize,
	//       lowerLimit: upperLimit - pageSize,
	//       upperLimit: upperLimit,

	let { userId } = req.loggedInUserData && req.loggedInUserData;

	let {
		page,
		sort_by,
		direction,
		page_size,
		survey_method,
		start_date,
		end_date,
	} = req.body;

	start_date = start_date
		? new Date(start_date).setUTCHours(0, 0, 0, 0)
		: '';
	end_date = end_date ? new Date(end_date).setUTCHours(23, 59, 59, 999) : '';

	let pageSize = page_size;
	let reqPage = page;
	let offset = (reqPage - 1) * pageSize;
	let surveyMethod =
		survey_method === 0
			? 0
			: survey_method === 1
			? 1
			: {
					[Op.in]: [0, 1],
			  };

	let condition = {
		logging: false,
		where: {
			user_id: userId,
			survey_method: surveyMethod,
			created_at: {
				[Op.between]: [start_date, end_date],
			},
		},

		offset: offset,
		limit: pageSize,
		order: [[sort_by, direction]],
	};

	let condition2 = {
		logging: false,
		where: {
			user_id: userId,
			survey_method: surveyMethod,
		},

		// attributes: [
		// 	'created_at',
		// 	[
		// 		sequelize.fn('COUNT', sequelize.col('created_at')),
		// 		'survey_type',
		// 	],
		// ],
		// group: 'created_at',

		offset: offset,
		limit: pageSize,
		order: [[sort_by, direction]],
	};

	await models.survey
		.findAndCountAll(start_date && end_date ? condition : condition2)
		.then((result) => {
			if (result) {
				let from = offset + 1;
				let total = result.count;
				let to =
					result.count < offset + pageSize
						? result.count
						: offset + pageSize;
				let last_page = Math.ceil(total / pageSize);

				let response = {
					list: result.rows,
					total,
					current_page: reqPage,
					per_page: pageSize,
					from,
					to,
					last_page,
				};

				res.status(200).json({
					success: 1,
					error: 0,
					message: 'success',

					data: response,
				});
			} else {
				res.status(200).json({
					success: 0,
					error: 1,
					message: 'error',
				});
			}
		});
});
exports.createSurvey = catchAsyncErrors(async (req, res, next) => {
	try {
		let { userId } = req.loggedInUserData && req.loggedInUserData;

		req.body.user_id = userId;

		let data = await models.survey.create(req.body);

		res.status(200).json({
			success: 1,
			error: 0,
			message: 'success',
			data,
		});
	} catch (error) {
		if (error.name == 'SequelizeValidationError') {
			res.status(200).json({
				success: 0,
				error: 1,
				message: 'Please enter all fields.',
			});
		} else {
			res.status(200).json({
				success: 0,
				error,
				message: 'error',
			});
		}
	}
});
exports.updateSurvey = catchAsyncErrors(async (req, res, next) => {
	try {
		const { user_id, survey_id } = req.body;
		let { userId } = req.loggedInUserData && req.loggedInUserData;

		let surveyUpdate = await models.survey.update(
			{
				...req.body,
			},
			{
				where: {
					user_id: userId,
					id: survey_id,
				},
			}
		);

		let surveyData = await models.survey.findOne({
			where: {
				user_id: userId,
				id: survey_id,
			},
		});

		if (surveyUpdate == 1) {
			return res.status(200).json({
				success: 1,
				error: 0,
				message: 'Survey updated successfully.',

				data: surveyData,
			});
		} else {
			return res.status(200).json({
				success: 0,
				error: 1,
				message: 'Error in survey update.',
			});
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			message: 'error',
			error,
		});
	}
});

exports.deleteSurvey = catchAsyncErrors(async (req, res, next) => {
	try {
		let deleteId = req.body.id && req.body.id;
		let { userId } = req.loggedInUserData && req.loggedInUserData;
		let data = await models.survey.destroy({
			where: {
				user_id: userId,
				id: deleteId,
			},
		});

		if (data === 1) {
			return res.status(200).json({
				success: 1,
				error: 0,
				message: 'success',
			});
		} else {
			return res.status(200).json({
				success: 0,
				error: 1,
				message: 'Delete Failed',
			});
		}
	} catch (error) {
		if (error.name == 'SequelizeValidationError') {
			return res.status(200).json({
				success: 0,
				error: 1,
				message: 'Please enter all fields.',
			});
		} else {
			return res.status(200).json({
				success: 0,
				error,
				message: 'error',
			});
		}
	}
});

exports.getSurveySnippet = catchAsyncErrors(async (req, res, next) => {
	try {
		let { snippetId } = req.params;
		let { userId } = req.loggedInUserData && req.loggedInUserData;

		let surveyData = await models.survey.findOne({
			where: {
				user_id: userId,
				id: snippetId,
			},
		});

		if (surveyData) {
			var token = jwt.sign(snippetId, process.env.JWT_SECRET, {
				algorithm: 'HS384',
			});

			let surveyDetails = {
				id: snippetId,
				encr_id: token,
			};

			let api_url =
				process.env.APP_URL_LOCAL || 'http://localhost:8000';
			let surveyId = snippetId;
			let encr_id = token;

			// 			let scriptSnippet = `<script src="${api_url}/assets/js/script.js"></script>
			// <script>
			// var hostUrl = window.location.protocol + "//" + window.location.hostname + "/v2";

			// 	var myHeaders = new Headers,
			// 		requestOptions = {
			// 			method: "GET",
			// 			redirect: "follow"
			// 		},
			// 		apiUrl = "http://localhost:8000",
			// 		surveyId = ${surveyDetails.id},
			// 		surveyEncrId = "${surveyDetails.encr_id}";
			// 	const isNps = getWithExpiry('nps_survey_' + ${surveyDetails.id});
			// 	if (isNps == null) {
			// 		fetch("${api_url}/api/v1/survey/load-survey/${surveyDetails.encr_id}", requestOptions).then(e => e.text()).then(function (e) {
			// 			e = JSON.parse(e);
			// 			var r = document.querySelector("body");
			// 			r.innerHTML = r.innerHTML + e.data.html;
			// 			var t = "";
			// 			[ ].forEach.call(document.querySelectorAll(".btn-score"), function (e) {
			// 				e.addEventListener("click", function () {
			// 					var r = document.querySelectorAll(".btn-score");
			// 					for (var o of r) {
			// 						o.classList.add("btn-score-inactive");
			// 						o.classList.remove("active");
			// 					}
			// 					e.classList.remove("btn-score-inactive"), e.classList.add("active"), t = e.getAttribute("data-value")
			// 				})
			// 			}), document.querySelector(".submit-review").addEventListener("click", function (e) {
			// 				var r = new Headers;
			// 				r.append("Content-Type", "application/x-www-form-urlencoded");
			// 				var o = new URLSearchParams;
			// 				o.append("survey_id", surveyId), o.append("score_value", t), o.append("review_message", (document.querySelector("#comment") ?  document.querySelector("#comment").value : '')), o.append("name", (document.querySelector("#name") ?  document.querySelector("#name").value : '')), o.append("website", window.location.host), o.append("url", window.location.href), fetch('${api_url}/api/v1/survey/set-survey-response', {
			// 					method: "POST",
			// 					headers: r,
			// 					body: o,
			// 					redirect: "follow"
			// 				}).then(e => e.text()).then(function (e) {
			// 					var r = document.querySelectorAll(".btn-score");
			// 					for (var t of r) t.classList.remove("btn-score-inactive"), (document.querySelector("#comment") ?  document.querySelector("#comment").value = "" : '');
			// 					document.querySelector(".suvery-modal.open").remove();
			// 					document.querySelector(".suvery-modal-thankyou").classList.add('open');
			// 					setTimeout(function() { document.querySelector(".suvery-modal-thankyou").remove(); }, 5000);
			// 					setWithExpiry('nps_survey_'  + surveyId, 'true', 30);
			// 				}).catch(e => console.log("error", e))
			// 			}), document.querySelector(".nps-close").addEventListener("click", function(e) {
			// 				e.preventDefault();
			// 				document.querySelector(".suvery-modal.open").remove();
			// 				setWithExpiry('nps_survey_'  + surveyId, 'true', 1);
			// 			}), document.querySelector(".close-thankyou").addEventListener("click", function (e) {
			// 				e.preventDefault();
			// 				this.closest('.suvery-modal-thankyou').remove();
			// 			});
			// 		});
			// 	}
			// </script>

			// 	`;

			res.render(
				'snippetReduce',
				{ api_url, surveyId, encr_id },
				(err, html) => {
					if (err) {
						res.status(200).json({
							success: 0,
							error: 1,
							message: 'error',
							data: err,
						});
					} else {
						res.status(200).json({
							success: 1,
							error: 0,
							message: 'success',
							data: {
								html,
							},
						});
					}
				}
			);
		} else {
			res.status(200).json({
				success: 0,
				error: 1,
				message: 'No Survey found',
			});
		}
	} catch (error) {
		res.status(200).json({
			success: 0,
			error: 1,
			message: 'error',
		});
	}
});

exports.loadSurveySnippet = catchAsyncErrors(async (req, res, next) => {
	try {
		let { encr_id } = req.params;
		let decryptedData = jwt.verify(encr_id, process.env.JWT_SECRET);

		let surveyId = Number(decryptedData);

		let surveyData = await models.survey.findOne({
			where: {
				id: surveyId,
			},
		});
		// console.log('surveyData', { surveyDetails: surveyData });

		if (surveyData) {
			let name = 'bhavik';
			// app.use('compile', hbs(handlebarsOptions));

			function get_brightness($hex) {
				$hex = $hex.replace('#', '');

				let $c_r = $hex.substring(0, 2);

				let $c_g = $hex.substring(2, 4);

				let $c_b = $hex.substring(4, 6);

				// let $c_g = hexdec(substr($hex, 2, 2));
				// let $c_b = hexdec(substr($hex, 4, 2));
				return ($c_r * 299 + $c_g * 587 + $c_b * 114) / 1000;
			}

			let $brandColor = surveyData.brand_color
				? surveyData.brand_color
				: '#ffffff';
			let $buttonStyle = surveyData.button_style
				? surveyData.button_style
				: 'fill';
			let $buttonShape = surveyData.button_shape
				? surveyData.button_shape
				: 'border-radius';
			let $icon_color = surveyData.icon_color
				? surveyData.icon_color
				: '';
			let $text_color = surveyData.text_color
				? surveyData.text_color
				: '';

			let $buttonCss = '';
			let $buttonBg = '';

			let $btnColor = '';
			let $btnBorder = '';

			$btnBorder = `border: 1px solid ${$brandColor};`;
			if ($buttonShape == 'sqaure') {
				//    $btnBorder .= "border-radius: none;";

				$btnBorder = $btnBorder + 'border-radius: none;';
			} else if ($buttonShape == 'round') {
				// $btnBorder .= "border-radius: 44px;";
				$btnBorder = $btnBorder + 'border-radius: 44px;';
			} else if ($buttonShape == 'border-radius') {
				// $btnBorder .= "border-radius: 5px;";
				$btnBorder = $btnBorder + 'border-radius: 5px;';
			}

			if ($buttonStyle == 'fill') {
				$buttonBg = `background: ${$brandColor} !important;`;
				$btnColor = 'color: #ffffff;';
				$btnBorder += `border-color: ${$brandColor};`;
			} else if ($buttonStyle == 'bordered') {
				$buttonBg = 'background: #ffffff !important;';
				$btnColor = `color: ${$brandColor};`;
			}

			if (get_brightness($brandColor) > 130) {
				$btnColor = 'color: #000000;';
				$btnBorder += 'border-color: #000000;';
			}

			let scriptData = {
				$brandColor,
				$buttonStyle,
				$buttonShape,
				$icon_color,
				$text_color,
				$buttonCss,
				$buttonBg,
				$btnColor,
				$btnBorder,
			};

			let surveyDetails = surveyData;
			var items = [
				{ value: 1 },
				{ value: 2 },
				{ value: 3 },
				{ value: 4 },
				{ value: 5 },
				{ value: 6 },
				{ value: 7 },
				{ value: 8 },
				{ value: 9 },
				{ value: 10 },
			];

			res.render(
				'loadSurvey',
				{
					brand_title:
						surveyDetails && surveyDetails.brand_title,
					description:
						surveyDetails && surveyDetails.description,
					survey_type:
						surveyDetails && surveyDetails.survey_type,
					skip_comment:
						surveyDetails && surveyDetails.skip_comment,
					question: surveyDetails && surveyDetails.question,
					brandColor: $brandColor,
					buttonStyle: $buttonStyle,
					buttonShape: $buttonShape,
					icon_color: $icon_color,
					text_color: $text_color,
					buttonCss: $buttonCss,
					buttonBg: $buttonBg,
					btnColor: $btnColor,
					btnBorder: $btnBorder,
					items: items,
				},
				(err, html) => {
					if (err) {
						res.status(200).json({
							success: 0,
							error: 1,
							message: 'error',
							data: err,
						});
					} else {
						res.status(200).json({
							success: 1,
							error: 0,
							message: 'success',
							data: {
								html,
							},
						});
					}
				}
			);

			// res.status(200).json({
			// 	success: 1,
			// 	error: 0,
			// 	message: 'success',
			// 	data: {
			// 		surveyData,
			// 	},
			// });
		} else {
			res.status(200).json({
				success: 0,
				error: 1,
				message: 'No Survey found',
			});
		}
	} catch (error) {
		res.status(200).json({
			success: 0,
			message: 'error',
			error,
		});
	}
});

exports.setSurveyResponse = catchAsyncErrors(async (req, res, next) => {
	try {
		// console.log('body data', req.body);
		let { survey_id, review_message, name, score_value, website, url } =
			req.body;

		if (
			survey_id == '' ||
			score_value == '' ||
			survey_id == undefined ||
			score_value == undefined ||
			survey_id == null ||
			score_value == null
		) {
			return res.status(200).json({
				success: 0,
				error: 1,
				message: 'Please select score !',
			});
		} else {
			let survey = await models.survey.findOne({
				where: {
					id: survey_id,
				},
				attributes: ['user_id'],
			});

			if (survey != null) {
				let scoreValue = score_value;
				if (score_value > 10) {
					scoreValue = 10;
				} else if (score_value < 0) {
					scoreValue = 0;
				} else {
					scoreValue = score_value;
				}

				let createData = {
					user_id: survey.user_id,
					survey_id: survey_id,
					score_value: scoreValue,
					name: name,
					review_message: review_message,
					ip_address: req.socket.remoteAddress,
					website: website,
					url: url,
				};

				let data = await models.survey_response.create(createData);

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
						message: 'Survey Feedback Create Error !',
					});
				}
			} else {
				return res.status(200).json({
					success: 0,
					error: 1,
					message: 'Survey stopped getting responses !',
				});
			}
		}
	} catch (error) {
		console.log('error im setting', error);
		res.status(200).json({
			success: 0,
			message: 'Error !',
			error,
		});
	}
});
