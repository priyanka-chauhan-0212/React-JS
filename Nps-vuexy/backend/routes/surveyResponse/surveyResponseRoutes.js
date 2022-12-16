const express = require('express');

const {
	getAllSurveyResponse,
} = require('../../controllers/surveyResponse/surveyResponse');
const router = express.Router();
const { isLoggedInUser } = require('../../middleware/loginCheck');

//--------------------- Routes with login --------------------------

router
	.route('/getAllSurveyResponse')
	.post(isLoggedInUser, getAllSurveyResponse);

//------------------------------------------------------------------

//--------------------- Routes without login --------------------------

//------------------------------------------------------------------

module.exports = router;
