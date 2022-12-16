import React, { useState } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

//min js for all states of usa
// import 'zingchart/modules-es6/zingchart-maps-usa_al.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ak.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_az.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ar.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ca.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_co.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ct.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_de.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_dc.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_fl.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ga.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_hi.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_id.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_il.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_in.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ia.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ks.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ky.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_la.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_me.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_md.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ma.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_mi.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_mn.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ms.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_mo.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_mt.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ne.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_nv.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_nh.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_nj.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nm.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ny.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_nc.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_nd.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_oh.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ok.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_or.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_pa.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ri.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_sc.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_sd.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_tn.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_tx.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_ut.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_vt.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_va.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_wa.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_wv.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_wi.min.js';
// import 'zingchart/modules-es6/zingchart-maps-usa_wy.min.js';

import { Card, CardTitle, Col, Row } from 'reactstrap';
import stateData from './allStates.json';
import nmCityData from './citiesData.json';

const UsaMapTest = ({ usaMapData, nmMapData }) => {
	let finalData = usaMapData && usaMapData.finalUsaMapData;
	let nmMapDataArray = nmMapData && nmMapData;

	const [stateName, setStateName] = useState('');

	var arrayOfColors = [
		'#EF9A9A #E57373',
		'#F48FB1 #F06292',
		'#B39DDB #9575CD',
		'#90CAF9 #64B5F6',
		'#80DEEA #4DD0E1',
		'#80CBC4 #4DB6AC',
		'#A5D6A7 #81C784',
		'#E6EE9C #DCE775',
		'#FFE082 #FFD54F',
		'#FFAB91 #FF8A65',
	];
	var colorIndex = 0;
	var colorIndex2 = 0;

	let listOfNmCities = [
		'BE',
		'CA',
		'CH',
		'CI',
		'CO',
		'CU',
		'DB',
		'DA',
		'ED',
		'GR',
		'GU',
		'HA',
		'HI',
		'LE',
		'LI',
		'LA',
		'LU',
		'MK',
		'MO',
		'OT',
		'QU',
		'RA',
		'RS',
		'SJ',
		'SM',
		'SA',
		'SF',
		'SI',
		'SO',
		'TA',
		'TR',
		'UN',
		'VA',
	];

	// update colorindex for assigning random colors
	function colorIndexCheck() {
		if (colorIndex >= arrayOfColors.length) {
			colorIndex = 0;
		}
	}
	var objectStates = (function (arrayOfStates) {
		var objectOfStates = {};

		for (var i = 0; i < arrayOfStates.length; i++) {
			var itemId = arrayOfStates[i].id.toUpperCase();
			colorIndexCheck();
			objectOfStates[itemId] = {
				'background-color': arrayOfColors[colorIndex++],
				tooltip: {
					text:
						arrayOfStates[i].name +
						' ' +
						':' +
						' ' +
						arrayOfStates[i].value,
				},
				label: {
					visible: true,
					fontColor: 'black',
					fontFamily: 'sans-serif',
					fontSize: 11,
					text:
						// arrayOfStates[i].name +
						// '<br />' +
						arrayOfStates[i].value,
				},
			};
		}

		return objectOfStates;
	})(finalData);

	//for nm cities
	function colorIndexCheck2() {
		if (colorIndex2 >= arrayOfColors.length) {
			colorIndex2 = 0;
		}
	}
	var objectCities = (function (arrayOfCities) {
		var objectOfCities = {};

		for (var i = 0; i < arrayOfCities.length; i++) {
			var itemId = arrayOfCities[i].id.toUpperCase();
			colorIndexCheck2();
			objectOfCities[itemId] = {
				'background-color': arrayOfColors[colorIndex2++],
				tooltip: {
					text:
						arrayOfCities[i].name +
						' ' +
						':' +
						' ' +
						arrayOfCities[i].count,
				},
				label: {
					// visible: true,
					text: arrayOfCities[i].id,
					fontColor: 'black',
					fontFamily: 'sans-serif',
					fontSize: 11,
				},
			};
		}

		return objectOfCities;
	})(nmMapDataArray);

	// initial config for first chart
	var myConfig = {
		shapes: [
			{
				type: 'zingchart.maps',
				options: {
					name: 'usa',
					label: {
						visible: true,
					},
					zooming: true,
					panning: true,
					scrolling: true,

					data: finalData,

					style: {
						controls: {
							visible: true,
						},
						fillType: 'radial',
						cursor: 'pointer',
						hoverState: {
							alpha: 0.3,
							backgroundColor: 'white',
						},
						items: objectStates, //include specific shape regions with unique styles

						tooltip: {
							alpha: 0.8,
							backgroundColor: 'white',
							borderColor: 'white',
							borderRadius: 3,
							fontColor: 'black',
							fontFamily: 'sans-serif',
							fontSize: 15,
							textAlpha: 1,
						},
					},
				},
			},
		],
	};

	let drillState = 'nm';

	//drilldown chart configuration
	var drilldownConfig = {
		shapes: [
			{
				//Drilldown maps.
				type: 'zingchart.maps',

				options: {
					name: 'usa_' + drillState,

					// zooming: false,
					// panning: false,
					// scrolling: false,

					zooming: true,
					panning: true,
					scrolling: true,

					style: {
						controls: {
							visible: true,
						},
						backgroundColor: 'pink',

						hoverState: {
							alpha: 0.3,
							backgroundColor: 'white',
						},
						items: objectCities,

						tooltip: {
							alpha: 0.8,
							backgroundColor: 'white',
							borderColor: 'white',
							borderRadius: 3,
							fontColor: 'black',
							fontFamily: 'sans-serif',
							fontSize: 15,
							textAlpha: 1,
						},
					},
				},
			},
		],
	};

	// zingchart.bind('myChart12', 'shape_click', function (e) {
	// 	// var newMapId = 'usa_' + String(e.shapeid).toLowerCase();
	// 	// var shapeId = e.shapeid;

	// 	let name = e.shape.id.toLowerCase();
	// 	setStateName(name);
	// 	zingchart.exec('drillMap', 'setdata', {
	// 		data: {
	// 			shapes: [
	// 				{
	// 					//Drilldown maps.
	// 					type: 'zingchart.maps',

	// 					options: {
	// 						name: 'usa_' + name,

	// 						zooming: false,
	// 						panning: false,
	// 						scrolling: false,

	// 						style: {
	// 							controls: {
	// 								visible: false,
	// 							},
	// 							backgroundColor: 'pink',
	// 							hoverState: {
	// 								alpha: 0.3,
	// 								backgroundColor: 'white',
	// 							},
	// 							tooltip: {
	// 								alpha: 0.8,
	// 								backgroundColor: 'white',
	// 								borderColor: 'white',
	// 								borderRadius: 3,
	// 								fontColor: 'black',
	// 								fontFamily: 'Georgia',
	// 								fontSize: 12,
	// 								textAlpha: 1,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			],
	// 		},
	// 	});
	// });

	zingchart.bind('myChart12', 'contextmenu', function (p) {
		return false;
	});

	zingchart.bind('drillMap', 'contextmenu', function (p) {
		return false;
	});

	return (
		<div>
			<div>
				<Row>
					<Col md={8}>
						<Card bodu>
							<CardTitle
								className="text-center"
								style={{
									fontSize: '2.2rem',
									fontWeight: 500,
								}}
							>
								Accounts by U.S Region
							</CardTitle>
							<ZingChart id="myChart12" data={myConfig} />
						</Card>
					</Col>

					<Col md={4}>
						<Card body>
							<CardTitle
								className="text-center"
								style={{
									fontSize: '2.2rem',
									fontWeight: 500,
								}}
							>
								Accounts by cities in <br />
								New Mexico
							</CardTitle>
							<ZingChart
								id="drillMap"
								data={drilldownConfig}
							/>
						</Card>
					</Col>
				</Row>
			</div>
		</div>
	);
};

export default UsaMapTest;
