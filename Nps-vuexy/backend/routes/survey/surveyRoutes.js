const express = require('express');

const {
	getAllSurvey,
	getSurveySnippet,
	loadSurveySnippet,
	createSurvey,
	deleteSurvey,
	getSurveyById,
	updateSurvey,
	setSurveyResponse,
	getAllWords,
} = require('../../controllers/survey/surveyController');
const { isLoggedInUser } = require('../../middleware/loginCheck');
const router = express.Router();

//--------------------- Routes with login --------------------------

router.route('/getAllSurvey').post(isLoggedInUser, getAllSurvey);
router.route('/createSurvey').post(isLoggedInUser, createSurvey);
router.route('/updateSurvey').post(isLoggedInUser, updateSurvey);
router.route('/deleteSurvey').post(isLoggedInUser, deleteSurvey);
router.route('/getSurveyById').post(isLoggedInUser, getSurveyById);
router.route('/getSnippet/:snippetId').get(isLoggedInUser, getSurveySnippet);

//------------------------------------------------------------------

//--------------------- Routes without login --------------------------

router.route('/getAllWords').post(getAllWords); // openai testing api
router.route('/survey/load-survey/:encr_id').get(loadSurveySnippet);
router.route('/survey/set-survey-response').post(setSurveyResponse);

//------------------------------------------------------------------

module.exports = router;
