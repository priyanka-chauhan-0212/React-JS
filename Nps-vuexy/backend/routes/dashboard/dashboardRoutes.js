const express = require('express');

const {
	getDashboardDetails,
} = require('../../controllers/dashboard/dashboardDetails');

const { isLoggedInUser } = require('../../middleware/loginCheck');
const router = express.Router();

//--------------------- Routes with login --------------------------

router.route('/getDashboardDetails').post(isLoggedInUser, getDashboardDetails);
// router.route('/getDashboardDetails').post(getDashboardDetails);
// router.route('/getDashboardDetails/test').post(getDashboardDetails);

//------------------------------------------------------------------

//--------------------- Routes without login ---------------------------

//----------------------------------------------------------------------

module.exports = router;
