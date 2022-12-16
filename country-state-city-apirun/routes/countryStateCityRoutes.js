const express = require('express');
const {
	getAllCountry,
	getStateFromCountry,
	getCitiesFromStateCode,
} = require('../controller/controller');

const router = express.Router();

//------------------ SIMPLE ROUTES --------------------------------------//

router.route('/getAllCountry').get(getAllCountry);
router.route('/getStateFromCountry').post(getStateFromCountry);
router.route('/getCitiesFromStateCode').post(getCitiesFromStateCode);

module.exports = router;
