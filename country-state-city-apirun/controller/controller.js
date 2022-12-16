const catchAsyncErrors = require('../middleware/catchAsyncError');
const { Country, State, City } = require('country-state-city');

exports.getAllCountry = catchAsyncErrors(async (req, res, next) => {
	try {
		let country = Country.getAllCountries();

		if (country) {
			return res.status(200).json({
				success: 1,
				error: 0,
				message: 'Success.',
				data: country,
			});
		} else {
			return res.status(200).json({
				success: 0,
				error: 1,
				message: 'Error in getting data.',
				data: [],
			});
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			message: 'Error in getting data.',
			error: 1,
			data: [],
		});
	}
});

exports.getStateFromCountry = catchAsyncErrors(async (req, res, next) => {
	try {
		let countryCode = req.body.countryCode;
		let state = State.getStatesOfCountry(countryCode);

		if (state) {
			return res.status(200).json({
				success: 1,
				message: 'Success.',
				error: 0,
				data: state,
			});
		} else {
			return res.status(200).json({
				success: 0,
				message: 'Error in getting data.',
				error: 1,
				data: [],
			});
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			message: 'Error in getting data.',
			error: 1,
			data: [],
		});
	}
});

exports.getCitiesFromStateCode = catchAsyncErrors(async (req, res, next) => {
	try {
		let stateCode = req.body.stateCode;
		let countryCode = req.body.countryCode;
		let cities = City.getCitiesOfState(countryCode, stateCode);

		if (cities) {
			return res.status(200).json({
				success: 1,
				message: 'Success.',
				error: 0,
				data: cities,
			});
		} else {
			return res.status(200).json({
				success: 0,
				message: 'Error in getting data.',
				error: 1,
				data: [],
			});
		}
	} catch (error) {
		return res.status(200).json({
			success: 0,
			message: 'Error in getting data.',
			error: 1,
			data: [],
		});
	}
});
