const express = require('express');

const {
	sendSurveyEmail,
	setEmailSurveyResponse,
} = require('../../controllers/SurveyEmail/surveyEmailController');
const { isLoggedInUser } = require('../../middleware/loginCheck');
const router = express.Router();

//--------------------- Routes with login --------------------------

router.route('/sendSurveyEmail').post(isLoggedInUser, sendSurveyEmail);

//------------------------------------------------------------------

//--------------------- Routes without login --------------------------

router.route('/setEmailSurveyResponse').post(setEmailSurveyResponse);

//------------------------------------------------------------------

module.exports = router;
