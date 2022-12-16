import Chart from 'react-apexcharts';
import moment from 'moment';
import React from 'react';
import LineChartData from './LineChartData.json';
import StatsVertical from '@components/widgets/stats/StatsVertical';

// ** Icons Imports
import { BarChart2 } from 'react-feather';

import { Card, CardTitle, Col, Row } from 'reactstrap';

const LineChart = ({ lineChartData }) => {
	console.log('lineChartData from linechart', lineChartData);

	let series = lineChartData.series;
	let {
		currentYearCount,
		lastOneYearCount,
		lastTwoYearCount,
		lastThreeYearCount,
	} = lineChartData.countData;

	let { currentYear, lastOneYear, lastTwoYear, lastThreeYear } =
		lineChartData.yearData;

	function ExcelDateToJSDate(serial) {
		var utc_days = Math.floor(serial - 25569);
		var utc_value = utc_days * 86400;
		var date_info = new Date(utc_value * 1000);

		var fractional_day = serial - Math.floor(serial) + 0.0000001;

		var total_seconds = Math.floor(86400 * fractional_day);

		var seconds = total_seconds % 60;

		total_seconds -= seconds;

		var hours = Math.floor(total_seconds / (60 * 60));
		var minutes = Math.floor(total_seconds / 60) % 60;

		console.log('log from line chart', utc_days);

		return new Date(
			date_info.getFullYear(),
			date_info.getMonth(),
			date_info.getDate(),
			hours,
			minutes,
			seconds
		);
	}

	// const currentYear = new Date().getFullYear();
	// const lastOneYear = currentYear - 1;
	// const lastTwoYear = currentYear - 2;

	// let currentYearCount = 0;
	// let lastOneYearCount = 0;
	// let lastTwoYearCount = 0;

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

	// const parseGSheetDate = (val) =>
	// 	val && new Date(...val.slice(5, -1).split(',').map(Number));

	// lineChartData &&
	// 	lineChartData.map((data) => {
	// 		//using custom parseGSheetDate function because we are getting LeadCreateDate in ----> Date("2022,0,12") <---- format
	// 		let date = parseGSheetDate(data.LeadCreateDate);

	// 		let sheetDataDateYear = moment(date).format('YYYY');

	// 		let sheetDataDate = moment(date).format('MM-YYYY').toString();

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

	// * option
	// const series1 = [
	// 	{
	// 		name: `Year - ${currentYear}`,
	// 		data: [1800, 50, 50, 36, 32, 32, 33, 18, 50, 50, 36, 32],
	// 	},
	// 	{
	// 		name: `Year - ${currentYear - 1}`,
	// 		data: [12, 11, 14, 18, 17, 13, 13, 56, 11, 14, 18, 17],
	// 	},
	// 	{
	// 		name: `Year - ${currentYear - 2}`,
	// 		data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	// 	},
	// ];
	const options = {
		chart: {
			zoom: {
				enabled: false,
			},
			height: 350,
			type: 'line',
			dropShadow: {
				enabled: true,
				color: '#000',
				top: 18,
				left: 7,
				blur: 5,
				opacity: 0.1,
			},
			toolbar: {
				show: false,
			},
		},

		colors: ['#ff0000', '#00bfff', '#4248f5', '#f542bf'],
		dataLabels: {
			enabled: true,
		},
		stroke: {
			// curve: 'smooth',
			width: 3,
		},
		title: {
			// position: 'bottom',
			show: false,
			text: '',
			align: 'left',
		},
		grid: {
			show: false,
			borderColor: '#e7e7e7',
			// row: {
			// 	colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
			// 	opacity: 0.5,
			// },
		},
		markers: {
			size: 1,
		},
		xaxis: {
			categories: [
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
			],
			title: {
				text: 'Month',
			},
		},
		yaxis: {
			title: {
				text: 'Accounts',
			},
			// min: 5,
			// max: 40,
		},
		legend: {
			position: 'top',
			horizontalAlign: 'center',
			floating: false,
		},
	};

	return (
		<>
			{' '}
			<Col md="12">
				<CardTitle
					className="text-center"
					style={{ fontSize: '2.2rem', fontWeight: 500 }}
				>
					{currentYearCount} New Accounts in FY -{currentYear}
				</CardTitle>
			</Col>
			<Card body>
				<Chart
					options={options}
					series={series}
					type="line"
					// width={500}
					height={320}
				/>
			</Card>
			<Col md="12">
				<Row>
					{/* Stats With Icons */}
					<Col xl="3" md="6" sm="6" xs="6">
						<StatsVertical
							icon={<BarChart2 size={21} />}
							// color="info"
							stats={'FY' + '-' + currentYear}
							statTitle={currentYearCount}
						/>
					</Col>
					<Col xl="3" md="6" sm="6" xs="6">
						<StatsVertical
							icon={<BarChart2 size={21} />}
							// color="warning"
							stats={'FY' + '-' + lastOneYear}
							statTitle={lastOneYearCount}
						/>
					</Col>
					<Col xl="3" md="6" sm="6" xs="6">
						<StatsVertical
							icon={<BarChart2 size={21} />}
							// color="danger"
							stats={'FY' + '-' + lastTwoYear}
							statTitle={lastTwoYearCount}
						/>
					</Col>
					<Col xl="3" md="6" sm="6" xs="6">
						<StatsVertical
							icon={<BarChart2 size={21} />}
							// color="danger"
							stats={'FY' + '-' + lastThreeYear}
							statTitle={lastThreeYearCount}
						/>
					</Col>
				</Row>
			</Col>
		</>
	);
};

export default LineChart;
