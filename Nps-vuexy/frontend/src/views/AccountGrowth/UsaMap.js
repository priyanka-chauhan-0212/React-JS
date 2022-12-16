import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import {
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
	GeoComponent,
} from 'echarts/components';
import { MapChart } from 'echarts/charts';
// import { CanvasRenderer } from 'echarts/renderers';
import { AccountData } from './sheetData';
import { setRandomColor } from '../../container/utils/globalFunctions';

echarts.use([
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent,
	GeoComponent,
	MapChart,
	// CanvasRenderer,
]);

import stateData from './allStates.json';
import { Card, CardTitle, Col, Row } from 'reactstrap';

// import for zingchart chart
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
// EXPLICITLY IMPORT MODULE from node_modules
import 'zingchart/modules-es6/zingchart-maps.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa.min.js';

//min js
import 'zingchart/modules-es6/zingchart-maps-usa_al.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ak.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_az.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ar.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ca.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_co.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ct.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_de.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_dc.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_fl.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ga.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_hi.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_id.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_il.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_in.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ia.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ks.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ky.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_la.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_me.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_md.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ma.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_mi.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_mn.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ms.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_mo.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_mt.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ne.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nv.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nh.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nj.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nm.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ny.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nc.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_nd.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_oh.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ok.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_or.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_pa.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ri.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_sc.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_sd.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_tn.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_tx.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_ut.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_vt.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_va.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_wa.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_wv.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_wi.min.js';
import 'zingchart/modules-es6/zingchart-maps-usa_wy.min.js';

echarts.registerMap('USA', stateData, {
	Alaska: {
		left: -131,
		top: 25,
		width: 15,
	},
	Hawaii: {
		left: -110,
		top: 28,
		width: 5,
	},
});

let colorData = setRandomColor(9999);

const UsaMap = ({ usaMapData }) => {
	let finalData = usaMapData.finalUsaMapData;
	console.log('finalData', finalData);
	let { min, max } = usaMapData;

	const [stateName, setStateName] = useState('New Maxico');

	const option = {
		// title: {
		// 	text: 'Accounts by US Region',

		// 	left: 'center',
		// },

		plugins: {
			autocolors: {
				mode: 'data',
			},
		},
		tooltip: {
			trigger: 'item',
			showDelay: 0,
			transitionDuration: 0.2,
			formatter: function (params) {
				var value = (params.value + '').split('.');

				value = value[0].replace(
					/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
					'$1,'
				);
				return value ? params.name + ' : ' + value : '';
			},
		},
		visualMap: {
			show: false,
			colorBy: 'data',
			left: 'right',
			min: min || 0,
			max: max || 500,
			inRange: {
				color: colorData,
			},
			text: ['High', 'Low'],
			calculable: true,
		},

		toolbox: {
			show: true,
			orient: 'vertical',
			left: 'left',
			top: 'top',
			feature: {
				dataView: { readOnly: false },
				restore: {},
				saveAsImage: {},
			},
		},
		series: [
			{
				name: 'USA',
				type: 'map',

				roam: true,
				colorBy: 'series',
				map: 'USA',

				// minHeight: '100%',
				width: '1000',
				height: '100%',
				position: 'absolute',
				top: '0px',
				emphasis: {
					label: {
						show: true,
					},
				},
				label: {
					show: true,
					color: '#fff',
					position: ['50%', '50%'],
					formatter: function (params) {
						var value = (params.value + '').split('.');

						value = value[0].replace(
							/(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
							'$1,'
						);
						// return value ? params.name + ` : ` + value : '';

						return value;
					},
				},
				textFixed: {
					VT: [50, -8],
					NH: [34, 2],
					MA: [30, -1],
					RI: [28, 2],
					CT: [35, 10],
					NJ: [34, 1],
					DE: [33, 0],
					MD: [47, 10],
					DC: [49, 21],
				},
				data: finalData,
			},
		],
	};
	function onChartReady(echarts) {
		console.log('echarts is ready', echarts);
	}

	function onChartClick(param, echarts) {
		console.log('state selected....', param);
		// alert(param.data && param.data.id);
		let stateData = param.data && param.data.name;
		setStateName(stateData);
		let name = (param.data && param.data.id) || 'nm';
		name = name.toLowerCase();
		zingchart.exec('drillMap', 'setdata', {
			data: {
				shapes: [
					{
						//Drilldown maps.
						type: 'zingchart.maps',

						options: {
							name: 'usa_' + name,

							zooming: false,
							panning: false,
							scrolling: false,

							style: {
								controls: {
									visible: false,
								},
								backgroundColor: 'pink',
								hoverState: {
									alpha: 0.3,
									backgroundColor: 'white',
								},
								tooltip: {
									alpha: 0.8,
									backgroundColor: 'white',
									borderColor: 'white',
									borderRadius: 3,
									fontColor: 'black',
									fontFamily: 'Georgia',
									fontSize: 12,
									textAlpha: 1,
								},
							},
						},
					},
				],
			},
		});
	}

	function onChartLegendselectchanged(param, echarts) {
		console.log('state selected....', param);
	}

	const currentYear = new Date().getFullYear();

	const offsets = {
		VT: [50, -8],
		NH: [34, 2],
		MA: [30, -1],
		RI: [28, 2],
		CT: [35, 10],
		NJ: [34, 1],
		DE: [33, 0],
		MD: [47, 10],
		DC: [49, 21],
	};

	// for drill down map state
	let drillState = 'nm';

	//drilldown chart configuration
	var drilldownConfig = {
		shapes: [
			{
				//Drilldown maps.
				type: 'zingchart.maps',

				options: {
					name: 'usa_' + drillState,

					zooming: false,
					panning: false,
					scrolling: false,

					style: {
						controls: {
							visible: false,
						},
						backgroundColor: 'pink',

						hoverState: {
							alpha: 0.3,
							backgroundColor: 'white',
						},
						tooltip: {
							alpha: 0.8,
							backgroundColor: 'white',
							borderColor: 'white',
							borderRadius: 3,
							fontColor: 'black',
							fontFamily: 'Georgia',
							fontSize: 12,
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

	return (
		<>
			{' '}
			<Row>
				<Col md="8">
					<Card body>
						{' '}
						<CardTitle
							className="text-center"
							style={{
								fontSize: '2.2rem',
								fontWeight: 500,
							}}
						>
							Accounts by U.S Region
						</CardTitle>
						<div className="usMap">
							<ReactECharts
								style={{ minHeight: '600px' }}
								option={option}
								// onChartReady={onChartReady}
								// onEvents={{
								// 	click: onChartClick,
								// 	legendselectchanged:
								// 		onChartLegendselectchanged,
								// }}
							/>
						</div>
					</Card>
				</Col>
				<Col md={4}>
					<Card body>
						{' '}
						<CardTitle
							className="text-center"
							style={{
								fontSize: '2.2rem',
								fontWeight: 500,
							}}
						>
							Accounts by cities in <br /> {stateName}
						</CardTitle>
						<ZingChart id="drillMap" data={drilldownConfig} />
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default UsaMap;
