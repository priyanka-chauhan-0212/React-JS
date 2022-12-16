const express = require('express');

const {
	createUser,
	loginUser,
	getUserProfile,
	updateUser,
	changePassword,
	forgetPasswordSendEmail,
	resetPassword,
	updateUserOverviewLayout,
	logoutUser,
	updateUserSettings,
} = require('../../controllers/user/userController');
const router = express.Router();
const { check } = require('express-validator');
const { upload } = require('../../middleware/multer-middleware');
const { isLoggedInUser } = require('../../middleware/loginCheck');

//--------------------- Routes with login --------------------------

router.route('/updateUser').post(
	isLoggedInUser,
	upload.fields([
		{ name: 'profile_pic', maxCount: 1 },
		{ name: 'brand_logo', maxCount: 1 },
	]),
	updateUser
);
router.route('/saveLayout').post(isLoggedInUser, updateUserOverviewLayout);
router.route('/updateUserSettings').post(isLoggedInUser, updateUserSettings);
router.route('/changePassword').post(isLoggedInUser, changePassword);
router.route('/getUserProfile').post(isLoggedInUser, getUserProfile);

//--------------------------------------------------------------------

//--------------------- Routes without login --------------------------
router.route('/createUser').post(
	upload.fields([
		{ name: 'profile_pic', maxCount: 1 },
		{ name: 'brand_logo', maxCount: 1 },
	]),
	createUser
);

router.route('/loginUser').post(loginUser);
router.route('/logoutUser').post(logoutUser);
router.route('/forgetPasswordSendEmail').post(forgetPasswordSendEmail);
router.route('/resetPassword').post(resetPassword);

//------------------------------------------------------------------

module.exports = router;

// for express-validator ---------------------->
// [
// 	check('first_name', 'Firstname is required')
// 		.notEmpty()

// 		// .not()
// 		// .isEmpty()
// 		.isLength({ min: 3 }),
// 	check('last_name', 'Lastname is required')
// 		.notEmpty()

// 		// .not()
// 		// .isEmpty()
// 		.isLength({ min: 3 }),
// 	check('email', 'Please enter valid Email').notEmpty().isEmail(),
// 	check(
// 		'password',
// 		'Password is required and must be 8 character long.'
// 	)
// 		.notEmpty()

// 		// .not()
// 		// .isEmpty()
// 		.isLength({ min: 8 }),
// 	check('mobile_no', 'Please enter valid mobile number.')
// 		.notEmpty()

// 		// .not()
// 		// .isEmpty()
// 		.isLength({ min: 10, max: 10 })
// 		.matches(/^([0-9\s\-\+\(\)]*)$/),
// ],
