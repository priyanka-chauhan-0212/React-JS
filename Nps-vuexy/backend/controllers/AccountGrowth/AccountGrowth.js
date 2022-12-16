const moment = require('moment');

const PublicGoogleSheetsParser = require('public-google-sheets-parser');

const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

const parseGSheetDate = (val) =>
	val && new Date(...val.slice(5, -1).split(',').map(Number));

exports.getSheetData = catchAsyncErrors(async (req, res, next) => {
	try {
		// const spreadsheetId = '1219PtEZu_-b-uMYdmDOHdpyqKJ72xbV6Sa9kGKX4iBI'; //nps copy
		// const spreadsheetId = '1N9DzSBVMyvrS66XA9TAx8J8PFIMRTIruB-gCou88NjM'; //nps sheet
		let { sheetId } = req.body;
		const spreadsheetId = sheetId
			? sheetId
			: process.env.GOOGLE_SPREAD_SHEET_ID;

		const isDemoSheet = sheetId ? false : true;
		let stateData = [];
		let accountData = [];

		let NmMapData = [];
		let enrollMentData = [];

		const parser = new PublicGoogleSheetsParser();

		await parser.parse(spreadsheetId, 'Accounts Data').then((items) => {
			accountData = items;
		});

		await parser.parse(spreadsheetId, 'State Data').then((items) => {
			stateData = items;
		});

		await parser.parse(spreadsheetId, 'New Maxico Data').then((items) => {
			NmMapData = items;
		});

		await parser.parse(spreadsheetId, 'Enrollment').then((items) => {
			enrollMentData = items;
		});

		if (
			stateData.length &&
			accountData.length &&
			NmMapData.length &&
			enrollMentData.length
		) {
			const currentYear = new Date().getFullYear();
			const lastOneYear = currentYear - 1;
			const lastTwoYear = currentYear - 2;
			const lastThreeYear = currentYear - 3;

			let currentYearFromSheetCheck =
				'FY' + currentYear.toString().substr(-2);

			let lastOneYearFromSheetCheck =
				'FY' + lastOneYear.toString().substr(-2);
			let lastTwoYearFromSheetCheck =
				'FY' + lastTwoYear.toString().substr(-2);
			let lastThreeYearFromSheetCheck =
				'FY' + lastThreeYear.toString().substr(-2);

			console.log('currentYearFromSheetCheck', {
				currentYearFromSheetCheck,
				lastOneYearFromSheetCheck,
				lastTwoYearFromSheetCheck,
				lastThreeYearFromSheetCheck,
			});
			let currentYearDataArray = [];
			const lastOneYearDataArray = [];
			const lastTwoYearDataArray = [];
			const lastThreeYearDataArray = [];

			let currentYearCount = 0;
			let lastOneYearCount = 0;
			let lastTwoYearCount = 0;
			let lastThreeYearCount = 0;

			// let current_year_jan = `01-${currentYear}`;
			// let current_year_feb = `02-${currentYear}`;
			// let current_year_mar = `03-${currentYear}`;
			// let current_year_apr = `04-${currentYear}`;
			// let current_year_may = `05-${currentYear}`;
			// let current_year_jun = `06-${currentYear}`;
			// let current_year_jul = `07-${currentYear}`;
			// let current_year_aug = `08-${currentYear}`;
			// let current_year_sep = `09-${currentYear}`;
			// let current_year_oct = `10-${currentYear}`;
			// let current_year_nov = `11-${currentYear}`;
			// let current_year_dec = `12-${currentYear}`;

			// let current_year_jan_count = 0;
			// let current_year_feb_count = 0;
			// let current_year_mar_count = 0;
			// let current_year_apr_count = 0;
			// let current_year_may_count = 0;
			// let current_year_jun_count = 0;
			// let current_year_jul_count = 0;
			// let current_year_aug_count = 0;
			// let current_year_sep_count = 0;
			// let current_year_oct_count = 0;
			// let current_year_nov_count = 0;
			// let current_year_dec_count = 0;

			// let last_one_year_jan = `01-${currentYear - 1}`;
			// let last_one_year_feb = `02-${currentYear - 1}`;
			// let last_one_year_mar = `03-${currentYear - 1}`;
			// let last_one_year_apr = `04-${currentYear - 1}`;
			// let last_one_year_may = `05-${currentYear - 1}`;
			// let last_one_year_jun = `06-${currentYear - 1}`;
			// let last_one_year_jul = `07-${currentYear - 1}`;
			// let last_one_year_aug = `08-${currentYear - 1}`;
			// let last_one_year_sep = `09-${currentYear - 1}`;
			// let last_one_year_oct = `10-${currentYear - 1}`;
			// let last_one_year_nov = `11-${currentYear - 1}`;
			// let last_one_year_dec = `12-${currentYear - 1}`;

			// let last_one_year_jan_count = 0;
			// let last_one_year_feb_count = 0;
			// let last_one_year_mar_count = 0;
			// let last_one_year_apr_count = 0;
			// let last_one_year_may_count = 0;
			// let last_one_year_jun_count = 0;
			// let last_one_year_jul_count = 0;
			// let last_one_year_aug_count = 0;
			// let last_one_year_sep_count = 0;
			// let last_one_year_oct_count = 0;
			// let last_one_year_nov_count = 0;
			// let last_one_year_dec_count = 0;

			// let last_two_year_jan = `01-${currentYear - 2}`;
			// let last_two_year_feb = `02-${currentYear - 2}`;
			// let last_two_year_mar = `03-${currentYear - 2}`;
			// let last_two_year_apr = `04-${currentYear - 2}`;
			// let last_two_year_may = `05-${currentYear - 2}`;
			// let last_two_year_jun = `06-${currentYear - 2}`;
			// let last_two_year_jul = `07-${currentYear - 2}`;
			// let last_two_year_aug = `08-${currentYear - 2}`;
			// let last_two_year_sep = `09-${currentYear - 2}`;
			// let last_two_year_oct = `10-${currentYear - 2}`;
			// let last_two_year_nov = `11-${currentYear - 2}`;
			// let last_two_year_dec = `12-${currentYear - 2}`;

			// let last_two_year_jan_count = 0;
			// let last_two_year_feb_count = 0;
			// let last_two_year_mar_count = 0;
			// let last_two_year_apr_count = 0;
			// let last_two_year_may_count = 0;
			// let last_two_year_jun_count = 0;
			// let last_two_year_jul_count = 0;
			// let last_two_year_aug_count = 0;
			// let last_two_year_sep_count = 0;
			// let last_two_year_oct_count = 0;
			// let last_two_year_nov_count = 0;
			// let last_two_year_dec_count = 0;

			// accountData &&
			// 	accountData.map((data) => {
			// 		//using custom parseGSheetDate function because we are getting LeadCreateDate in ----> Date("2022,0,12") <---- format
			// 		let date = parseGSheetDate(data.LeadCreateDate);

			// 		let sheetDataDateYear = moment(date).format('YYYY');

			// 		let sheetDataDate = moment(date)
			// 			.format('MM-YYYY')
			// 			.toString();

			// 		if (sheetDataDateYear == currentYear) {
			// 			currentYearCount += 1;
			// 		}
			// 		if (sheetDataDateYear == lastOneYear) {
			// 			lastOneYearCount += 1;
			// 		}
			// 		if (sheetDataDateYear == lastTwoYear) {
			// 			lastTwoYearCount += 1;
			// 		}

			// 		// ------------------ For current year------------------

			// 		if (sheetDataDate == current_year_jan) {
			// 			current_year_jan_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_feb) {
			// 			current_year_feb_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_mar) {
			// 			current_year_mar_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_apr) {
			// 			current_year_apr_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_may) {
			// 			current_year_may_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_jun) {
			// 			current_year_jun_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_jul) {
			// 			current_year_jul_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_aug) {
			// 			current_year_aug_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_sep) {
			// 			current_year_sep_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_oct) {
			// 			current_year_oct_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_nov) {
			// 			current_year_nov_count += 1;
			// 		}
			// 		if (sheetDataDate == current_year_dec) {
			// 			current_year_dec_count += 1;
			// 		}

			// 		// -------------------For last one year--------------------

			// 		if (sheetDataDate == last_one_year_jan) {
			// 			last_one_year_jan_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_feb) {
			// 			last_one_year_feb_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_mar) {
			// 			last_one_year_mar_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_apr) {
			// 			last_one_year_apr_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_may) {
			// 			last_one_year_may_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_jun) {
			// 			last_one_year_jun_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_jul) {
			// 			last_one_year_jul_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_aug) {
			// 			last_one_year_aug_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_sep) {
			// 			last_one_year_sep_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_oct) {
			// 			last_one_year_oct_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_nov) {
			// 			last_one_year_nov_count += 1;
			// 		}
			// 		if (sheetDataDate == last_one_year_dec) {
			// 			last_one_year_dec_count += 1;
			// 		}
			// 		// ---------------------For last two year------------------

			// 		if (sheetDataDate == last_two_year_jan) {
			// 			last_two_year_jan_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_feb) {
			// 			last_two_year_feb_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_mar) {
			// 			last_two_year_mar_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_apr) {
			// 			last_two_year_apr_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_may) {
			// 			last_two_year_may_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_jun) {
			// 			last_two_year_jun_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_jul) {
			// 			last_two_year_jul_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_aug) {
			// 			last_two_year_aug_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_sep) {
			// 			last_two_year_sep_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_oct) {
			// 			last_two_year_oct_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_nov) {
			// 			last_two_year_nov_count += 1;
			// 		}
			// 		if (sheetDataDate == last_two_year_dec) {
			// 			last_two_year_dec_count += 1;
			// 		}
			// 	});

			// const series = [
			// 	{
			// 		name: `Year - ${currentYear}`,
			// 		data: [
			// 			current_year_jan_count,
			// 			current_year_feb_count,
			// 			current_year_mar_count,
			// 			current_year_apr_count,
			// 			current_year_may_count,
			// 			current_year_jun_count,
			// 			current_year_jul_count,
			// 			current_year_aug_count,
			// 			current_year_sep_count,
			// 			current_year_oct_count,
			// 			current_year_nov_count,
			// 			current_year_dec_count,
			// 		],
			// 	},
			// 	{
			// 		name: `Year - ${currentYear - 1}`,
			// 		data: [
			// 			last_one_year_jan_count,
			// 			last_one_year_feb_count,
			// 			last_one_year_mar_count,
			// 			last_one_year_apr_count,
			// 			last_one_year_may_count,
			// 			last_one_year_jun_count,
			// 			last_one_year_jul_count,
			// 			last_one_year_aug_count,
			// 			last_one_year_sep_count,
			// 			last_one_year_oct_count,
			// 			last_one_year_nov_count,
			// 			last_one_year_dec_count,
			// 		],
			// 	},
			// 	{
			// 		name: `Year - ${currentYear - 2}`,
			// 		data: [
			// 			last_two_year_jan_count,
			// 			last_two_year_feb_count,
			// 			last_two_year_mar_count,
			// 			last_two_year_apr_count,
			// 			last_two_year_may_count,
			// 			last_two_year_jun_count,
			// 			last_two_year_jul_count,
			// 			last_two_year_aug_count,
			// 			last_two_year_sep_count,
			// 			last_two_year_oct_count,
			// 			last_two_year_nov_count,
			// 			last_two_year_dec_count,
			// 		],
			// 	},
			// ];

			enrollMentData &&
				enrollMentData.map((data) => {
					if (data.FY19) {
						lastThreeYearDataArray.push(data.FY19);
						lastThreeYearCount += data.FY19;
					} else {
						lastThreeYearDataArray.push(0);
					}

					if (data.FY20) {
						lastTwoYearDataArray.push(data.FY20);
						lastTwoYearCount += data.FY20;
					} else {
						lastTwoYearDataArray.push(0);
					}

					if (data.FY21) {
						lastOneYearDataArray.push(data.FY21);
						lastOneYearCount += data.FY21;
					} else {
						lastOneYearDataArray.push(0);
					}

					if (data.FY22) {
						currentYearDataArray.push(data.FY22);
						currentYearCount += data.FY22;
					} else {
						currentYearDataArray.push(0);
					}
				});

			const series = [
				{
					name: `Year - ${currentYear}`,
					data: currentYearDataArray,
				},
				{
					name: `Year - ${lastOneYear}`,
					data: lastOneYearDataArray,
				},
				{
					name: `Year - ${lastTwoYear}`,
					data: lastTwoYearDataArray,
				},
				{
					name: `Year - ${lastThreeYear}`,
					data: lastThreeYearDataArray,
				},
			];

			let finalUsaMapData =
				stateData &&
				stateData.map((data) => ({
					name: data.State,
					value: data.NumberOfAccounts,
					id: data.StateAbbreviation,
				}));

			// let min = 0;
			// let max = 500;
			// min =
			// 	stateData &&
			// 	Math.min(
			// 		...stateData.map(
			// 			(item) => item && item.NumberOfAccounts
			// 		)
			// 	);
			// max =
			// 	stateData &&
			// 	Math.max(
			// 		...stateData.map(
			// 			(item) => item && item.NumberOfAccounts
			// 		)
			// 	);

			// --------------- for nm map data

			let mapArray = [
				{
					id: 'BE',
					count: 0,
					name: 'Bernalillo',
				},
				{
					id: 'CA',
					count: 0,
					name: 'Catron',
				},
				{
					id: 'CH',
					count: 0,
					name: 'Chaves',
				},
				{
					id: 'CI',
					count: 0,
					name: 'Cibola',
				},
				{
					id: 'CO',
					count: 0,
					name: 'Colfax',
				},
				{
					id: 'CU',
					count: 0,
					name: 'Curry',
				},
				{
					id: 'DB',
					count: 0,
					name: 'De Baca',
				},
				{
					id: 'DA',
					count: 0,
					name: 'Dona Ana',
				},
				{
					id: 'ED',
					count: 0,
					name: 'Eddy',
				},
				{
					id: 'GR',
					count: 0,
					name: 'Grant',
				},
				{
					id: 'GU',
					count: 0,
					name: 'Guadalupe',
				},
				{
					id: 'HA',
					count: 0,
					name: 'Harding',
				},
				{
					id: 'HI',
					count: 0,
					name: 'Hidalgo',
				},
				{
					id: 'LE',
					count: 0,
					name: 'Lea',
				},
				{
					id: 'LI',
					count: 0,
					name: 'Lincoln',
				},
				{
					id: 'LA',
					count: 0,
					name: 'Los Alamos',
				},
				{
					id: 'LU',
					count: 0,
					name: 'Luna',
				},
				{
					id: 'MK',
					count: 0,
					name: 'McKinley',
				},
				{
					id: 'MO',
					count: 0,
					name: 'Mora',
				},
				{
					id: 'OT',
					count: 0,
					name: 'Otero',
				},
				{
					id: 'QU',
					count: 0,
					name: 'Quay',
				},
				{
					id: 'RA',
					count: 0,
					name: 'Rio Arriba',
				},
				{
					id: 'RS',
					count: 0,
					name: 'Roosevelt',
				},
				{
					id: 'SJ',
					count: 0,
					name: 'San Juan',
				},
				{
					id: 'SM',
					count: 0,
					name: 'San Miguel',
				},
				{
					id: 'SA',
					count: 0,
					name: 'Sandoval',
				},
				{
					id: 'SF',
					count: 0,
					name: 'Santa Fe',
				},
				{
					id: 'SI',
					count: 0,
					name: 'Sierra',
				},
				{
					id: 'SO',
					count: 0,
					name: 'Socorro',
				},
				{
					id: 'TA',
					count: 0,
					name: 'Taos',
				},
				{
					id: 'TR',
					count: 0,
					name: 'Torrance',
				},
				{
					id: 'UN',
					count: 0,
					name: 'Union',
				},
				{
					id: 'VA',
					count: 0,
					name: 'Valencia',
				},
			];

			mapArray.map((obj) => {
				NmMapData.map((data) => {
					if (data.CityAbbreviation == obj.id) {
						if (
							data.NumberOfAccounts &&
							data.CityAbbreviation
						) {
							obj.count += data.NumberOfAccounts;
						}
					}
				});
			});

			return res.status(200).json({
				error: 0,
				success: 1,
				isDemoSheet,

				nmMapData: mapArray,
				accountData: {
					series,
					countData: {
						currentYearCount,
						lastOneYearCount,
						lastTwoYearCount,
						lastThreeYearCount,
					},
					yearData: {
						currentYear,
						lastOneYear,
						lastTwoYear,
						lastThreeYear,
					},
				},
				stateData: {
					finalUsaMapData,
				},
			});
		} else {
			return res.status(200).json({
				error: 1,
				success: 0,
				message: 'Error in getting data!',
			});
		}
	} catch (error) {
		console.log('error', error);
		return res.status(200).json({
			error: 1,
			success: 0,
			message: 'Error in getting data!',
		});
	}
});

// exports.getSheetData = catchAsyncErrors(async (req, res, next) => {
// 	try {
// 		// const spreadsheetId = '1219PtEZu_-b-uMYdmDOHdpyqKJ72xbV6Sa9kGKX4iBI'; //nps copy
// 		// const spreadsheetId = '1N9DzSBVMyvrS66XA9TAx8J8PFIMRTIruB-gCou88NjM'; //nps sheet
// 		let { sheetId } = req.body;
// 		const spreadsheetId = sheetId
// 			? sheetId
// 			: process.env.GOOGLE_SPREAD_SHEET_ID;

// 		const isDemoSheet = sheetId ? false : true;

// 		let enrollMentData = [];

// 		const parser = new PublicGoogleSheetsParser();

// 		await parser.parse(spreadsheetId, 'Enrollment').then((items) => {
// 			enrollMentData = items;
// 		});

// 		if (enrollMentData.length) {
// 			const currentYear = new Date().getFullYear();
// 			const lastOneYear = currentYear - 1;
// 			const lastTwoYear = currentYear - 2;
// 			const lastThreeYear = currentYear - 3;

// 			let fy19 = [];
// 			let fy20 = [];
// 			let fy21 = [];
// 			let fy22 = [];

// 			enrollMentData &&
// 				enrollMentData.map((data) => {
// 					if (data.FY19) {
// 						fy19.push(data.FY19);
// 					} else {
// 						fy19.push(0);
// 					}

// 					if (data.FY20) {
// 						fy20.push(data.FY20);
// 					} else {
// 						fy20.push(0);
// 					}

// 					if (data.FY21) {
// 						fy21.push(data.FY21);
// 					} else {
// 						fy21.push(0);
// 					}

// 					if (data.FY22) {
// 						fy22.push(data.FY22);
// 					} else {
// 						fy22.push(0);
// 					}
// 				});

// 			const series = [
// 				{
// 					name: `Year - ${currentYear}`,
// 					data: fy22,
// 				},
// 				{
// 					name: `Year - ${lastOneYear}`,
// 					data: fy21,
// 				},
// 				{
// 					name: `Year - ${lastTwoYear}`,
// 					data: fy20,
// 				},
// 				{
// 					name: `Year - ${lastThreeYear}`,
// 					data: fy19,
// 				},
// 			];

// 			return res.status(200).json({
// 				error: 0,
// 				success: 1,
// 				isDemoSheet,
// 				series,
// 			});
// 		} else {
// 			return res.status(200).json({
// 				error: 1,
// 				success: 0,
// 				message: 'Error in getting data!',
// 			});
// 		}
// 	} catch (error) {
// 		console.log('error', error);
// 		return res.status(200).json({
// 			error: 1,
// 			success: 0,
// 			message: 'Error in getting data!',
// 		});
// 	}
// });
