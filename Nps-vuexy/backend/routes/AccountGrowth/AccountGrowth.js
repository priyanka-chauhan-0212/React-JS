const express = require('express');

const {
	getSheetData,
} = require('../../controllers/AccountGrowth/AccountGrowth');

const { isLoggedInUser } = require('../../middleware/loginCheck');
const router = express.Router();

//--------------------- Routes with login --------------------------

router.route('/getSheetData').post(getSheetData);

//------------------------------------------------------------------

//--------------------- Routes without login ---------------------------

//----------------------------------------------------------------------

module.exports = router;
