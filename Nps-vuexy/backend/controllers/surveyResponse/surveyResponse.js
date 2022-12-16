const models = require('../../models/index.js');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

// Get All Survey List

exports.getAllSurveyResponse = catchAsyncErrors(async (req, res, next) => {
	let { userId } = req.loggedInUserData && req.loggedInUserData;

	//  currentPage: page,
	// const upperLimit = page * pageSize;
	//       pageSize: pageSize,
	//       lowerLimit: upperLimit - pageSize,
	//       upperLimit: upperLimit,

	let {
		user_id,
		page,
		sort_by,
		direction,
		page_size,
		survey_method,
		start_date,
		end_date,
		word_click_id,
		latest_comment_id,
	} = req.body;

	console.log('body data from response api ----', req.body);
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
	let word_click = '';
	if (
		word_click_id === '' ||
		word_click_id === undefined ||
		word_click_id === null
	) {
	} else {
		let comment_keyword = await models.comment_keywords.findOne({
			where: {
				id: word_click_id,
			},
		});

		word_click = comment_keyword.word;
	}

	let conditionMain = {};
	if (start_date && end_date) {
		if (
			latest_comment_id === '' ||
			latest_comment_id === undefined ||
			latest_comment_id === null
		) {
			conditionMain = {
				include: [
					{
						model: models.survey,
						where: {
							survey_method: surveyMethod,
						},
					},
				],
				where: {
					user_id: userId,
					created_at: {
						[Op.between]: [start_date, end_date],
					},
				},

				offset: offset,
				limit: pageSize,
				order: [[sort_by, direction]],
				logging: false,
			};
		} else {
			conditionMain = {
				include: [
					{
						model: models.survey,
						where: {
							survey_method: surveyMethod,
						},
					},
				],
				where: {
					user_id: userId,
					created_at: {
						[Op.between]: [start_date, end_date],
					},
					id: latest_comment_id,
				},

				offset: offset,
				limit: pageSize,
				order: [[sort_by, direction]],
				logging: false,
			};
		}
		if (word_click === '' || word_click === undefined) {
			conditionMain = {
				include: [
					{
						model: models.survey,
						where: {
							survey_method: surveyMethod,
						},
					},
				],
				where: {
					user_id: userId,
					created_at: {
						[Op.between]: [start_date, end_date],
					},
				},

				offset: offset,
				limit: pageSize,
				order: [[sort_by, direction]],
				logging: false,
			};
		} else {
			conditionMain = {
				include: [
					{
						model: models.survey,
						where: {
							survey_method: surveyMethod,
						},
					},
				],
				where: {
					user_id: userId,
					created_at: {
						[Op.between]: [start_date, end_date],
					},
					review_message: {
						[Op.like]: `%${word_click}%`, // LIKE '%sample_fruit_string%'
						//  [Op.ilike]: `%${sample_fruit_string}%` // For case sensitive searching
						// [Op.substring]: sample_fruit_substring  // Has been depreciated in future version of sequelize.
					},
				},

				offset: offset,
				limit: pageSize,
				order: [[sort_by, direction]],
				logging: false,
			};
		}
	} else {
		if (latest_comment_id === '' || latest_comment_id === undefined) {
			if (word_click === '' || word_click === undefined) {
				console.log('else of first if');

				conditionMain = {
					include: [
						{
							model: models.survey,
							where: {
								survey_method: surveyMethod,
							},
						},
					],
					where: {
						user_id: userId,
					},

					offset: offset,
					limit: pageSize,
					order: [[sort_by, direction]],
					logging: false,
				};
			} else {
				console.log(
					'else of first if ihhih ihihi hi h',
					word_click
				);
				conditionMain = {
					include: [
						{
							model: models.survey,
							where: {
								survey_method: surveyMethod,
							},
						},
					],
					where: {
						user_id: userId,
						review_message: {
							[Op.like]: `%${word_click}%`, // LIKE '%sample_fruit_string%'
						},
					},

					offset: offset,
					limit: pageSize,
					order: [[sort_by, direction]],
					logging: false,
				};
			}
		} else {
			conditionMain = {
				include: [
					{
						model: models.survey,
						where: {
							survey_method: surveyMethod,
						},
					},
				],
				where: { user_id: userId, id: latest_comment_id },

				offset: offset,
				limit: pageSize,
				order: [[sort_by, direction]],
				logging: false,
			};
		}
	}

	await models.survey_response
		.findAndCountAll(conditionMain)
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
					// comment_keyword: comment_keyword.word,
					data: response,
					// data: {
					// 	// body: req.body,
					// 	// start_date,
					// 	// end_date,
					// 	// fullData: result,
					// },
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

// // Create new Order
// exports.newOrder = catchAsyncErrors(async (req, res, next) => {
// 	const {
// 		shippingInfo,
// 		orderItems,
// 		paymentInfo,
// 		itemsPrice,
// 		taxPrice,
// 		shippingPrice,
// 		totalPrice,
// 	} = req.body;

// 	const order = await Order.create({
// 		shippingInfo,
// 		orderItems,
// 		paymentInfo,
// 		itemsPrice,
// 		taxPrice,
// 		shippingPrice,
// 		totalPrice,
// 		paidAt: Date.now(),
// 		user: req.user._id,
// 	});

// 	res.status(201).json({
// 		success: true,
// 		order,
// 	});
// });

// // get Single Order
// exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
// 	const order = await Order.findById(req.params.id).populate(
// 		'user',
// 		'name email'
// 	);

// 	if (!order) {
// 		return next(new ErrorHander('Order not found with this Id', 404));
// 	}

// 	res.status(200).json({
// 		success: true,
// 		order,
// 	});
// });

// // get logged in user  Orders
// exports.myOrders = catchAsyncErrors(async (req, res, next) => {
// 	const orders = await Order.find({ user: req.user._id });

// 	res.status(200).json({
// 		success: true,
// 		orders,
// 	});
// });

// // get all Orders -- Admin
// exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
// 	const orders = await Order.find();

// 	let totalAmount = 0;

// 	orders.forEach((order) => {
// 		totalAmount += order.totalPrice;
// 	});

// 	res.status(200).json({
// 		success: true,
// 		totalAmount,
// 		orders,
// 	});
// });

// // update Order Status -- Admin
// exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
// 	const order = await Order.findById(req.params.id);

// 	if (!order) {
// 		return next(new ErrorHander('Order not found with this Id', 404));
// 	}

// 	if (order.orderStatus === 'Delivered') {
// 		return next(
// 			new ErrorHander('You have already delivered this order', 400)
// 		);
// 	}

// 	if (req.body.status === 'Shipped') {
// 		order.orderItems.forEach(async (o) => {
// 			await updateStock(o.product, o.quantity);
// 		});
// 	}
// 	order.orderStatus = req.body.status;

// 	if (req.body.status === 'Delivered') {
// 		order.deliveredAt = Date.now();
// 	}

// 	await order.save({ validateBeforeSave: false });
// 	res.status(200).json({
// 		success: true,
// 	});
// });

// async function updateStock(id, quantity) {
// 	const product = await Product.findById(id);

// 	product.Stock -= quantity;

// 	await product.save({ validateBeforeSave: false });
// }

// // delete Order -- Admin
// exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
// 	const order = await Order.findById(req.params.id);

// 	if (!order) {
// 		return next(new ErrorHander('Order not found with this Id', 404));
// 	}

// 	await order.remove();

// 	res.status(200).json({
// 		success: true,
// 	});
// });
