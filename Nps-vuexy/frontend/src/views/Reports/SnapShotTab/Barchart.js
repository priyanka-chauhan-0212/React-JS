// ** Third Party Components
import Chart, { Line } from 'react-apexcharts';
import Flatpickr from 'react-flatpickr';
import { Calendar } from 'react-feather';

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

const ApexColumnCharts = ({ direction }) => {
	const columnColors = {
		series1: '#bce897',
		series2: '#faca00',
		series3: '#e95432',

		// bg: '#f8d3ff',
	};
	const options = {
		chart: {
			type: 'bar',
		},

		plotOptions: {
			bar: {
				borderRadius: 10,
				columnWidth: '45%',
			},
		},
		dataLabels: {
			enabled: true,
		},
		xaxis: {
			categories: [
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
			],
		},
		fill: {
			opacity: 1,
		},
	};

	const series = [
		{
			data: [
				{
					x: '0',
					y: 10,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '1',
					y: 18,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '2',
					y: 13,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '3',
					y: 10,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '4',
					y: 50,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '5',
					y: 60,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '6',
					y: 10,
					fillColor: 'rgb(228, 51, 0)',
				},
				{
					x: '7',
					y: 18,
					fillColor: 'rgb(188, 232, 151)',
				},
				{
					x: '8',
					fillColor: 'rgb(188, 232, 151)',
					y: 13,
				},
				{
					x: '9',
					y: 90,
					fillColor: 'rgb(250, 202, 0)',
				},
				{
					x: '10',
					y: 85,
					fillColor: 'rgb(250, 202, 0)',
				},
			],
		},
	];

	// ** Chart Options
	const option1 = {
		chart: {
			height: 350,
			type: 'bar',
			stacked: true,
			stackType: '100%',
			parentHeightOffset: 0,
			toolbar: {
				show: true,
			},
		},

		plotOptions: {
			bar: {
				distributed: false,
				rangeBarOverlap: true,
				rangeBarGroupRows: false,
				borderRadius: 10,
				columnWidth: '45%',
				colors: {
					backgroundBarColors: [
						columnColors.bg,
						columnColors.bg,
						columnColors.bg,
						columnColors.bg,
						columnColors.bg,
					],
					backgroundBarRadius: 50,
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		legend: {
			position: 'bottom',
			horizontalAlign: 'center',
		},
		colors: [
			columnColors.series1,
			columnColors.series2,
			columnColors.series3,
		],
		stroke: {
			show: true,
			colors: ['transparent'],
		},
		grid: {
			xaxis: {
				lines: {
					show: false,
				},
			},
			yaxis: {
				lines: {
					show: false,
				},
			},
		},
		xaxis: {
			categories: [
				'0',
				'1',
				'2',
				'3',
				'4',
				'5',
				'6',
				'7',
				'8',
				'9',
				'10',
			],
		},
		fill: {
			opacity: 1,
		},
		yaxis: {
			// opposite: direction === 'rtl',
		},
	};

	// ** Chart Series
	const series1 = [
		{
			name: 'Promoters',
			data: [10, 20, 30, 4, 50, 12, 10, 20, 30, 4, 50],
		},
		{
			name: 'Passive',
			data: [50, 20, 10, 20, 30, 40, 10, 20, 30, 4, 50],
		},
		{
			name: 'Dectators',
			data: [40, 20, 30, 4, 30, 4, 10, 20, 30, 4, 50],
		},
	];

	return (
		<Chart options={options} series={series} type="bar" height={343} />

		// <Card>
		// 	<CardHeader className="d-flex flex-md-row flex-column justify-content-md-between justify-content-start align-items-md-center align-items-start">
		// 		<CardTitle tag="h4">Data Science</CardTitle>
		// 		<div className="d-flex align-items-center mt-md-0 mt-1">
		// 			<Calendar size={17} />
		// 			<Flatpickr
		// 				className="form-control flat-picker bg-transparent border-0 shadow-none"
		// 				options={{
		// 					mode: 'range',
		// 					// eslint-disable-next-line no-mixed-operators
		// 					defaultDate: [
		// 						new Date(),
		// 						new Date(
		// 							new Date().getTime() +
		// 								5 * 24 * 60 * 60 * 1000
		// 						),
		// 					],
		// 				}}
		// 			/>
		// 		</div>
		// 	</CardHeader>

		// 	<CardBody>
		// 		<Chart
		// 			options={options}
		// 			series={series}
		// 			type="bar"
		// 			height={393}
		// 		/>
		// 	</CardBody>
		// </Card>
	);
};

export default ApexColumnCharts;
