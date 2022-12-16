const models = require('../../models/index.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');

const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

// Get All Survey List

exports.getReports = catchAsyncErrors(async (req, res, next) => {
	let { user_id, survey_id, selected_month, start_date, end_date } =
		req.body;

	let { userId } = req.loggedInUserData && req.loggedInUserData;

	let userTotal = { promoters: 0, passive: 0, detractors: 0 };
	let pieChart = { promoters: 0, passive: 0, detractors: 0 };
	let graphData = { promoters: [], passive: [], detractors: [] };

	let net_promoter_score = 0;
	let number_of_respondents = 0;

	try {
		start_date = start_date
			? new Date(start_date).setUTCHours(0, 0, 0, 0)
			: '';
		end_date = end_date
			? new Date(end_date).setUTCHours(23, 59, 59, 999)
			: '';

		if (
			selected_month === '' ||
			selected_month === undefined ||
			selected_month === null
		) {
			selected_month = null;
		} else {
			selected_month = selected_month ? new Date(selected_month) : '';
			// created_at = created_at && moment(created_at).format('YYYY-MM');

			var fromMonth =
				selected_month.getMonth() + 1 < 10
					? '0' + (selected_month.getMonth() + 1)
					: selected_month.getMonth() + 1;

			var fromYear = selected_month.getFullYear();
		}

		let condition = {};

		if (userId && start_date && end_date && survey_id) {
			console.log('first condition');
			condition = {
				logging: false,
				where: {
					created_at: {
						[Op.between]: [start_date, end_date],
					},
					user_id: userId,
					survey_id: survey_id,
				},
				include: [
					{
						model: models.survey,
					},
				],
				order: [['created_at', 'DESC']],
			};
		} else if (userId && start_date && end_date) {
			console.log('second condition');
			condition = {
				logging: false,
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
			};
		} else if (userId && survey_id && selected_month !== null) {
			console.log('third condition');
			condition = {
				logging: false,
				where: {
					user_id: userId,
					survey_id: survey_id,

					[Op.and]: [
						{
							$and: Sequelize.where(
								Sequelize.fn(
									'MONTH',
									Sequelize.col(
										'survey_response.created_at'
									)
								),
								fromMonth
							),
						},
						{
							$and: Sequelize.where(
								Sequelize.fn(
									'YEAR',
									Sequelize.col(
										'survey_response.created_at'
									)
								),
								fromYear
							),
						},
					],
				},
				include: [
					{
						model: models.survey,
					},
				],
			};
		} else if (userId && selected_month !== null) {
			console.log('fourth condition');
			condition = {
				logging: false,
				where: {
					user_id: userId,

					[Op.and]: [
						{
							$and: Sequelize.where(
								Sequelize.fn(
									'MONTH',
									Sequelize.col(
										'survey_response.created_at'
									)
								),
								fromMonth
							),
						},
						{
							$and: Sequelize.where(
								Sequelize.fn(
									'YEAR',
									Sequelize.col(
										'survey_response.created_at'
									)
								),
								fromYear
							),
						},
					],
				},
				include: [
					{
						model: models.survey,
					},
				],
			};
		} else if (userId && survey_id) {
			console.log('fifth condition');
			condition = {
				logging: false,
				where: {
					user_id: userId,
					survey_id,
				},
				include: [
					{
						model: models.survey,
					},
				],
			};
		} else if (userId) {
			console.log('six condition');
			condition = {
				logging: false,
				where: {
					user_id: userId,
				},
				include: [
					{
						model: models.survey,
					},
				],
			};
		}

		let reportData = await models.survey_response.findAndCountAll(
			condition
		);

		if (reportData) {
			let all_respondent_comments = reportData.rows;
			number_of_respondents = reportData.count;

			all_respondent_comments &&
				all_respondent_comments.map((data) => {
					let scoreValue = data.score_value;

					let surveyType =
						data && data.survey && data.survey.survey_type
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
							(surveyType == 'simple' && scoreValue <= 2)
						) {
							graphData.detractors.push(scoreValue);
						} else if (
							(surveyType != 'simple' &&
								(scoreValue == 7 || scoreValue == 8)) ||
							(surveyType == 'simple' && scoreValue == 3)
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
				pieChart.promoters = Math.round(
					(userTotal.promoters * 100) / number_of_respondents
				);

				pieChart.passive = Math.round(
					(userTotal.passive * 100) / number_of_respondents
				);

				pieChart.detractors = Math.round(
					(userTotal.detractors * 100) / number_of_respondents
				);

				net_promoter_score =
					pieChart.promoters - pieChart.detractors + `%`;
			}
		}

		return res.status(200).json({
			success: 1,
			error: 0,
			message: 'success',
			// reportData,
			data: {
				net_promoter_score,
				number_of_respondents,
				pie_chart: pieChart,
				user_totals: userTotal,
			},
			// body: req.body,
			// fromYear,
			// fromMonth,
		});
	} catch (error) {
		return res.status(200).json({
			success: 0,
			error,
			message: 'error',
		});
	}
});

// let data = await models.survey_response.findAll({
// 	where: {
// 		user_id: user_id,
// 		survey_id: survey_id,

// 		[Op.and]: [
// 			{
// 				$and: Sequelize.where(
// 					Sequelize.fn(
// 						'MONTH',
// 						Sequelize.col('created_at')
// 					),
// 					fromMonth
// 				),
// 			},
// 			{
// 				$and: Sequelize.where(
// 					Sequelize.fn('YEAR', Sequelize.col('created_at')),
// 					fromYear
// 				),
// 			},
// 		],
// 		// $and: Sequelize.where(
// 		// 	Sequelize.fn('MONTH', Sequelize.col('created_at')),
// 		// 	fromMonth
// 		// ),
// 		// $and: Sequelize.where(
// 		// 	Sequelize.fn('YEAR', Sequelize.col('created_at')),
// 		// 	fromYear
// 		// ),
// 	},

// 	// date: Sequelize.where(
// 	// 	Sequelize.fn('YEAR', Sequelize.col('created_at')),
// 	// 	fromYear
// 	// ),
// 	// [Op.or]: months.map((month) =>
// 	// 	Sequelize.where(
// 	// 		Sequelize.fn('MONTH', Sequelize.col('created_at')),
// 	// 		fromMonth
// 	// 	)
// 	// ),
// });
