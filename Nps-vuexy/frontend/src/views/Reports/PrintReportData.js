import React, { PureComponent, useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import qs from 'querystring';
import _map from 'lodash/map';
import _get from 'lodash/get';
import Colors from '../../container/design/Colors';
// import CustomSelectBox from '../../container/components/CustomSelectBox';
import PieChart from './PieChart';
// import * as Actions from '../../container/redux/actions';
// import Loading from '../../container/components/Loading';
import Loading from '../../../src/@core/components/spinner/Fallback-spinner';

import Meta from '../../container/utils/meta';
import Breadcrumbs from '../../container/components/Breadcrumb';
import { monthsList } from './MockData';
import {
	NULL,
	EMPTY_STRING,
	SORTING_TYPE,
	UNDEFINED,
} from '../../container/constants/commonConstants';
import { Container, Filter } from './Styled';
import Select from 'react-select';

import Check from '../../container/assets/check.svg';
import DateCircle from '../../container/assets/date-circle.svg';
import DateCheck from '../../container/assets/date-check.svg';
import axiosInstance from '../../container/utils/axiosInstance';
import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
('');
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faUserFriends,
	faChartBar,
	faEllipsisV,
	faCircle,
} from '@fortawesome/free-solid-svg-icons';
AddIconToLibrary([faUserFriends, faChartBar, faEllipsisV, faCircle]);

import { Checkbox } from 'rsuite';
import axios from 'axios';
import { DateRangePicker, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import moment from 'moment';
import { Skeleton, List, Avatar } from 'antd';
import 'antd/dist/antd.css';

import logo from '../../container/assets/FieldTheoryLab.png';
import logo2 from '../../container/assets/v2.png';

class ComponentToPrint extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let state = this.props.data;
		let heading = this.props.heading;
		let surveyName = this.props.surveyName;
		let brandImage = this.props.brandImage;
		let dateBetween = this.props.dateBetween;

		return (
			<Container className="container">
				<div
					style={{
						width: '100%',
						height: '100%',
						displayPrint: 'block',
					}}
				>
					{/* <div
						className="header"
						style={{
							width: '90% !important',
							margin: '0 auto',
						}}
					>
						<div
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								padding: '30px 20px',
								// margin: '0 auto',
								position: 'absolute',
								top: 0,
								left: 0,
								marginBottom: '50px',
							}}
						>
							<Col md="12">
								<div
									style={{
										display: 'inline-block',
										padding: '10px 0',
									}}
								>
									<img
										src={
											logo2 ||
											'https://nps.ourtempurl.xyz/admin/assets/brand_logo/1646622476_FieldTheoryLab_Horizontal_transparent.png' ||
											logo
										}
										alt="first"
										style={{
											height: '60px',
											width: '200px',
											objectFit: 'contain',
										}}
									/>
								</div>
							</Col>
						</div>
					</div> */}
					{/* {dateBetween && (
						<h2
							style={{
								color: 'black',
								textAlign: 'center',
								fontSize: '24px',
								marginTop: '20px',
							}}
						>
							{dateBetween && dateBetween}
						</h2>
					)} */}

					<h2
						style={{
							color: 'black',
							textAlign: 'center',
							fontSize: '24px',
							marginTop: '100px',
						}}
					>
						{dateBetween && dateBetween}
						{heading && heading}
					</h2>
					<h6
						style={{
							color: 'black',
							textAlign: 'center',
							fontSize: '15px',
							marginTop: '-20px',
							padding: '15px',
						}}
					>
						SURVEY TITLE: {surveyName && surveyName}
					</h6>
					<div
						className="score-flex"
						style={{
							width: '92%',
							margin: '10px auto',
							// marginTop: '150px',
						}}
					>
						<div className="score-all">
							<div className="d-flex">
								<div className="card score">
									<div className="number">
										{_get(
											state.reports,
											'net_promoter_score',
											NULL
										)}
									</div>

									<div className="number-text">
										Net Promoter Score
									</div>
									<div className="overlay1">
										<FontAwesomeIcon
											icon={[
												'fas',
												'chart-bar',
											]}
										/>
									</div>
								</div>
								<div className="card respondents">
									<div className="number">
										{_get(
											state.reports,
											'number_of_respondents',
											NULL
										)}
									</div>

									<div className="number-text1">
										Number of Respondents
									</div>
									<div className="overlay2">
										<FontAwesomeIcon
											className="fa-user-friends"
											icon={[
												'fas',
												'user-friends',
											]}
										/>
									</div>
								</div>
							</div>
							<div className="d-flex">
								<div className="card promoters">
									<div className="promoters-title">
										<div>
											Promoters vs. Detractors
										</div>
										{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
									</div>

									<>
										<div className="pie-wrapper">
											<div className="pie">
												{state.reports && (
													<PieChart
														data={_get(
															state.reports,
															'pie_chart',
															NULL
														)}
													/>
												)}
											</div>
										</div>
										<Row className="label">
											<Col className="col-6 color1">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>Promoters</div>
											</Col>
											<Col className="col-6 color2">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>Passive</div>
											</Col>
											<Col className="col-6 color3">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>
													Detractors
												</div>
											</Col>
										</Row>
									</>
								</div>
								<div className="card uses-totals">
									<div className="promoters-title">
										<div>User Totals</div>
										{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
									</div>

									<>
										<div className="uses-totals-pop">
											<div className="user-sm">
												<div className="promoters-k">
													<div>
														{_get(
															state.reports,
															'user_totals.promoters',
															NULL
														)}
													</div>
													{/* <div>Promoters</div> */}
												</div>
												<div className="passive-k">
													<div>
														{_get(
															state.reports,
															'user_totals.passive',
															NULL
														)}
													</div>
													{/* <div>Passive</div> */}
												</div>
												<div className="detractors-k">
													<div>
														{_get(
															state.reports,
															'user_totals.detractors',
															NULL
														)}
													</div>
												</div>
											</div>
										</div>
										<Row className="label1">
											<Col className="col-6 color1">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>Promoters</div>
											</Col>
											<Col className="col-6 color2">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>Passive</div>
											</Col>
											<Col className="col-6 color3">
												<FontAwesomeIcon
													icon={[
														'fas',
														'circle',
													]}
												/>
												<div>
													Detractors
												</div>
											</Col>
										</Row>
									</>
								</div>
							</div>
						</div>
					</div>

					<div
						className="report-footer-cell"
						style={{
							width: '90% !important',
							margin: '0 auto',
						}}
					>
						<div
							className="footer-info"
							style={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'space-between',
								alignItems: 'center',
								width: '100%',
								padding: '30px 20px',
								// margin: '0 auto',
								position: 'absolute',
								bottom: 0,
								left: 0,
							}}
						>
							<Col md="6">
								<div
									style={{ display: 'inline-block' }}
								>
									<img
										src={
											process.env
												.REACT_APP_BACKEND_API_URL +
												`${
													brandImage &&
													brandImage
												}` ||
											'https://nps.ourtempurl.xyz/admin/assets/brand_logo/1646622476_FieldTheoryLab_Horizontal_transparent.png' ||
											logo
										}
										alt="first"
										style={{
											height: '100%',
											width: '200px',
											objectFit: 'contain',
										}}
									/>
								</div>
							</Col>
							<Col md="6">
								{/* <div>
									<img
										src={logo2}
										alt="second"
										style={{
											height: '100%',
											width: '170px',
											objectFit: 'contain',
										}}
									/>
								</div> */}
							</Col>
						</div>
					</div>
				</div>
			</Container>
		);
	}
}

export default ComponentToPrint;

// const PrintReportData = ({ data }) => {
// 	// const [state, setState] = useState(data);

// 	console.log('props========', data);

// 	let state = data;
// 	return (
// 		<div style={{}}>
// 			<h2
// 				style={{
// 					color: 'black',
// 					textAlign: 'center',
// 					fontSize: '24px',
// 				}}
// 			>
// 				28/04/2022 - 26/5/2022
// 			</h2>
// 			<div
// 				className="score-flex"
// 				style={{ width: '80%', margin: '10px auto' }}
// 			>
// 				<div className="score-all">
// 					<div className="d-flex">
// 						<div className="card score">
// 							<div className="number">
// 								{_get(
// 									state.reports,
// 									'net_promoter_score',
// 									NULL
// 								)}
// 							</div>

// 							<div className="number-text">
// 								Net Promoter Score
// 							</div>
// 							<div className="overlay1">
// 								<FontAwesomeIcon
// 									icon={['fas', 'chart-bar']}
// 								/>
// 							</div>
// 						</div>
// 						<div className="card respondents">
// 							<div className="number">
// 								{_get(
// 									state.reports,
// 									'number_of_respondents',
// 									NULL
// 								)}
// 							</div>

// 							<div className="number-text1">
// 								Number of Respondents
// 							</div>
// 							<div className="overlay2">
// 								<FontAwesomeIcon
// 									icon={['fas', 'user-friends']}
// 								/>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="d-flex">
// 						<div className="card promoters">
// 							<div className="promoters-title">
// 								<div>Promoters vs. Detractors</div>
// 								{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
// 							</div>

// 							<>
// 								<div className="pie-wrapper">
// 									<div className="pie">
// 										{state.reports && (
// 											<PieChart
// 												data={_get(
// 													state.reports,
// 													'pie_chart',
// 													NULL
// 												)}
// 											/>
// 										)}
// 									</div>
// 								</div>
// 								<Row className="label">
// 									<Col className="col-6 color1">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Promoters</div>
// 									</Col>
// 									<Col className="col-6 color2">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Passive</div>
// 									</Col>
// 									<Col className="col-6 color3">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Detractors</div>
// 									</Col>
// 								</Row>
// 							</>
// 						</div>
// 						<div className="card uses-totals">
// 							<div className="promoters-title">
// 								<div>User Totals</div>
// 								{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
// 							</div>

// 							<>
// 								<div className="uses-totals-pop">
// 									<div className="user-sm">
// 										<div className="promoters-k">
// 											<div>
// 												{_get(
// 													state.reports,
// 													'user_totals.promoters',
// 													NULL
// 												)}
// 											</div>
// 											{/* <div>Promoters</div> */}
// 										</div>
// 										<div className="passive-k">
// 											<div>
// 												{_get(
// 													state.reports,
// 													'user_totals.passive',
// 													NULL
// 												)}
// 											</div>
// 											{/* <div>Passive</div> */}
// 										</div>
// 										<div className="detractors-k">
// 											<div>
// 												{_get(
// 													state.reports,
// 													'user_totals.detractors',
// 													NULL
// 												)}
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 								<Row className="label1">
// 									<Col className="col-6 color1">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Promoters</div>
// 									</Col>
// 									<Col className="col-6 color2">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Passive</div>
// 									</Col>
// 									<Col className="col-6 color3">
// 										<FontAwesomeIcon
// 											icon={['fas', 'circle']}
// 										/>
// 										<div>Detractors</div>
// 									</Col>
// 								</Row>
// 							</>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 		</div>
// 	);
// };

// export default PrintReportData;
