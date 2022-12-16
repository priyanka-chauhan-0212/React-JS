const models = require('../../models/index.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

// Get All Survey List

exports.getDashboardDetails = catchAsyncErrors(async (req, res, next) => {
	let { start_date, end_date } = req.body;

	let { userId } = req.loggedInUserData && req.loggedInUserData;
	// console.log(userId);

	// let userId = 49;

	// start_date = start_date ? new Date(start_date) : '';
	// end_date = end_date ? new Date(end_date) : '';

	start_date = start_date
		? new Date(start_date).setUTCHours(0, 0, 0, 0)
		: '';
	end_date = end_date ? new Date(end_date).setUTCHours(23, 59, 59, 999) : '';

	let all_keywords = [];
	let all_respondent_comments = [];
	let recent_respondent_comments = [];
	let number_of_respondents = 0;
	let graphData = { promoters: [], passive: [], detractors: [] };
	let userTotal = { promoters: 0, passive: 0, detractors: 0 };
	let pieChart = { promoters: 0, passive: 0, detractors: 0 };
	let net_promoter_score = 0;
	let survey_responses = [];
	let top_keywords = [];

	try {
		if (userId && start_date && end_date) {
			let survey_responses12 =
				await models.survey_response.findAndCountAll({
					where: {
						user_id: userId,
						created_at: {
							[Op.between]: [start_date, end_date],
						},
					},
					group: [
						Sequelize.fn('Date', Sequelize.col('created_at')),
					],

					order: [['created_at', 'DESC']],
				});
			if (survey_responses12 && survey_responses12.count) {
				// survey_responses12.count.map((data) => {
				// 	console.log('dtdytd', Object.values(data)[0]);
				// });

				survey_responses = survey_responses12.count;
			}

			let topKeywords = await models.comment_keywords.findAll({
				where: {
					created_at: {
						[Op.between]: [start_date, end_date],
					},
					user_id: userId,
				},
				order: [['count', 'DESC']],
			});
			if (topKeywords) {
				top_keywords = topKeywords.slice(0, 20);
			}

			let allRespondentComments =
				await models.survey_response.findAndCountAll({
					where: {
						created_at: {
							[Op.between]: [start_date, end_date],
						},
						user_id: userId,
					},
					include: [
						{
							model: models.survey,
						},
					],
					order: [['created_at', 'DESC']],
				});
			if (allRespondentComments) {
				all_respondent_comments = allRespondentComments.rows;
				number_of_respondents = allRespondentComments.count;
				all_respondent_comments &&
					all_respondent_comments.map((data) => {
						let imageName = '';
						if (
							data.name === '' ||
							data.name === null ||
							data.name === undefined
						) {
							imageName = 'Some Name';
						} else {
							imageName = data.name;
						}

						recent_respondent_comments.push({
							id: data.id,
							image: imageName.charAt(0),
							name: imageName,
							message:
								data.review_message &&
								data.review_message,
						});

						let scoreValue = data.score_value;
						let surveyType =
							data &&
							data.survey &&
							data.survey.survey_type
								? data.survey.survey_type
								: '';

						if (
							surveyType === '' ||
							surveyType === null ||
							surveyType === undefined
						) {
						} else {
							if (
								(surveyType != 'simple' &&
									scoreValue <= 6) ||
								(surveyType == 'simple' &&
									scoreValue <= 2)
							) {
								graphData.detractors.push(scoreValue);
							} else if (
								(surveyType != 'simple' &&
									(scoreValue == 7 ||
										scoreValue == 8)) ||
								(surveyType == 'simple' &&
									scoreValue == 3)
							) {
								graphData.passive.push(scoreValue);
							} else {
								graphData.promoters.push(scoreValue);
							}
						}
					});

				userTotal.promoters =
					graphData.promoters && graphData.promoters.length;

				userTotal.passive =
					graphData.passive && graphData.passive.length;

				userTotal.detractors =
					graphData.detractors && graphData.detractors.length;

				if (number_of_respondents != 0) {
					let total = 100;
					let promoters_perc =
						(userTotal.promoters * 100) /
						number_of_respondents;

					let detractors_perc =
						(userTotal.detractors * 100) /
						number_of_respondents;

					pieChart.promoters = Math.round(promoters_perc);

					pieChart.detractors = Math.round(detractors_perc);
					let sum = pieChart.promoters + pieChart.detractors;

					let passive_perc = total - sum;
					pieChart.passive = Math.round(passive_perc);

					// pieChart.promoters = Math.round(
					// 	(userTotal.promoters * 100) /
					// 		number_of_respondents
					// );

					// pieChart.passive = Math.round(
					// 	(userTotal.passive * 100) / number_of_respondents
					// );

					// pieChart.detractors = Math.round(
					// 	(userTotal.detractors * 100) /
					// 		number_of_respondents
					// );

					net_promoter_score =
						pieChart.promoters - pieChart.detractors + `%`;
				}
			}

			let keywordsData = await models.comment_keywords.findAll({
				where: { user_id: userId },
			});
			if (keywordsData) {
				all_keywords = keywordsData;
			}

			let response = {
				all_keywords,
				net_promoter_score,
				number_of_respondents,
				pie_chart: pieChart,
				recent_respondent_comments,
				survey_responses,
				top_keywords,
				user_totals: userTotal,
			};

			return res.status(200).json({
				error: 0,
				success: 1,
				message: 'success',
				data: response,
			});
		} else {
			let survey_responses12 =
				await models.survey_response.findAndCountAll({
					where: {
						user_id: userId,
					},
					group: [
						Sequelize.fn('Date', Sequelize.col('created_at')),
					],

					order: [['created_at', 'DESC']],
				});
			if (survey_responses12 && survey_responses12.count) {
				// survey_responses12.count.map((data) => {
				// 	console.log('dtdytd', Object.values(data)[0]);
				// });

				survey_responses = survey_responses12.count;
			}

			let topKeywords = await models.comment_keywords.findAll({
				where: { user_id: userId },
				order: [['count', 'DESC']],
			});
			if (topKeywords) {
				top_keywords = topKeywords.slice(0, 20);
			}

			let allRespondentComments =
				await models.survey_response.findAndCountAll({
					where: {
						user_id: userId,
					},
					include: [
						{
							model: models.survey,
						},
					],
					order: [['created_at', 'DESC']],
				});
			if (allRespondentComments) {
				all_respondent_comments = allRespondentComments.rows;
				number_of_respondents = allRespondentComments.count;
				all_respondent_comments &&
					all_respondent_comments.map((data) => {
						let imageName = '';
						if (
							data.name === '' ||
							data.name === null ||
							data.name === undefined
						) {
							imageName = 'Some Name';
						} else {
							imageName = data.name;
						}

						recent_respondent_comments.push({
							id: data.id,
							image: imageName.charAt(0),
							name: imageName,
							message:
								data.review_message &&
								data.review_message,
						});

						let scoreValue = data.score_value;
						let surveyType =
							data &&
							data.survey &&
							data.survey.survey_type
								? data.survey.survey_type
								: '';

						if (
							surveyType === '' ||
							surveyType === null ||
							surveyType === undefined
						) {
						} else {
							if (
								(surveyType != 'simple' &&
									scoreValue <= 6) ||
								(surveyType == 'simple' &&
									scoreValue <= 2)
							) {
								graphData.detractors.push(scoreValue);
							} else if (
								(surveyType != 'simple' &&
									(scoreValue == 7 ||
										scoreValue == 8)) ||
								(surveyType == 'simple' &&
									scoreValue == 3)
							) {
								graphData.passive.push(scoreValue);
							} else {
								graphData.promoters.push(scoreValue);
							}
						}
					});

				userTotal.promoters =
					graphData.promoters && graphData.promoters.length;

				userTotal.passive =
					graphData.passive && graphData.passive.length;

				userTotal.detractors =
					graphData.detractors && graphData.detractors.length;

				if (number_of_respondents != 0) {
					let total = 100;
					let promoters_perc =
						(userTotal.promoters * 100) /
						number_of_respondents;

					let detractors_perc =
						(userTotal.detractors * 100) /
						number_of_respondents;

					pieChart.promoters = Math.round(promoters_perc);
					pieChart.detractors = Math.round(detractors_perc);

					let sum = pieChart.promoters + pieChart.detractors;
					let passive_perc = total - sum;

					pieChart.passive = Math.round(passive_perc);
					// pieChart.promoters = Math.round(
					// 	(userTotal.promoters * 100) /
					// 		number_of_respondents
					// );

					// pieChart.passive = Math.round(
					// 	(userTotal.passive * 100) / number_of_respondents
					// );

					// pieChart.detractors = Math.round(
					// 	(userTotal.detractors * 100) /
					// 		number_of_respondents
					// );

					net_promoter_score =
						pieChart.promoters - pieChart.detractors + `%`;
				}
			}

			let keywordsData = await models.comment_keywords.findAll({
				where: {
					user_id: userId,
				},
			});
			if (keywordsData) {
				all_keywords = keywordsData;
			}

			let response = {
				all_keywords,
				net_promoter_score,
				number_of_respondents,
				pie_chart: pieChart,
				recent_respondent_comments,
				survey_responses,
				top_keywords,
				user_totals: userTotal,
			};

			return res.status(200).json({
				error: 0,
				success: 1,
				message: 'success',
				data: response,
			});
		}
	} catch (error) {
		console.log('error', error);
		return res.status(200).json({
			error: 1,
			success: 0,
			message: (error && error) || 'Error',
		});
	}
});
