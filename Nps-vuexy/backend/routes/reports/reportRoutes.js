const express = require('express');

const { getReports } = require('../../controllers/reports/reportsController');
const router = express.Router();
const { isLoggedInUser } = require('../../middleware/loginCheck');

//--------------------- Routes with login --------------------------

router.route('/getReport').post(isLoggedInUser, getReports);

//------------------------------------------------------------------

//--------------------- Routes without login --------------------------

//------------------------------------------------------------------

module.exports = router;
