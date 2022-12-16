import React, { PureComponent, useEffect, useRef, useState } from 'react';
import {
	Row,
	Col,
	DropdownItem,
	DropdownMenu,
	UncontrolledButtonDropdown,
	DropdownToggle,
} from 'reactstrap';
import { connect } from 'react-redux';
import qs from 'querystring';
import _map from 'lodash/map';
import _get from 'lodash/get';
import Colors from '../../container/design/Colors';
// import CustomSelectBox from '../../container/components/CustomSelectBox';
import PieChart from './PieChart';
// import * as Actions from '../../container/redux/actions';
// import Loading from '../../container/components/Loading';
import Loading from '../../@core/components/spinner/Fallback-spinner';

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

import { DateRangePicker, DatePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import moment from 'moment';
// import { Skeleton, List, Avatar } from 'antd';
import Skeleton from '@mui/material/Skeleton';

import 'antd/dist/antd.css';
import PrintReportData from './PrintReportData';
// import PrintReportData from './testPrint';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { toast } from 'react-toastify';

import { ErrorToast } from '../../container/components/ToastComponent/index';
import { useSelector } from 'react-redux';
import { FileText, Printer, Share } from 'react-feather';

import Check from '../../container/assets/check.svg';
import Uncheck from '../../container/assets/uncheck.svg';
import {
	GET_ALL_SURVEY_API_PATH,
	GET_REPORT_API_PATH,
} from '../../ApiRoutes/ApiRoutes';

const Home = (props) => {
	const [surveyListOptions, setSurveyListOptions] = useState([]);
	const AddOption = { id: 'All', brand_title: 'All' };
	const user = useSelector((state) => state.user.currentUser);
	console.log('surveyListOptions====', surveyListOptions);

	const [selectedSurveyOption, setSelectedSurveyOption] = useState({
		value: 'All',
		label: 'All',
	});

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const buttonClick = async () => {
		var element = await document.getElementById('printThis');

		element.style.display = 'block';

		await handlePrint();
		element.style.display = 'none';
	};

	const contentArea = useRef();

	function printDiv(divName) {
		var printContents = document.getElementById(divName).innerHTML;
		var originalContents = document.body.innerHTML;

		document.body.innerHTML = printContents;

		window.print();

		document.body.innerHTML = originalContents;
	}

	const [state, setState] = useState({
		active: 0,

		startDate: '',
		endDate: '',

		reports: {},

		currentNpsCheckbox: true,

		loading: false,
		contentLoader: false,
		selectedMonth: moment().format('YYYY-MM'),
		selectedSurvey: {
			value: 'Select',
			label: 'Select',
		},
		// surveyListOptions: [],
		selectedSurveyList: {},
	});

	useEffect(async () => {
		setState({
			...state,
			loading: true,
		});

		let getAllSurveyFindData = {
			page: 1,
			sort_by: 'created_at',
			direction: 'DESC',
			page_size: 900000000000,
			survey_method: 2,
		};

		axiosInstance
			.post(GET_ALL_SURVEY_API_PATH, getAllSurveyFindData)
			.then((res) => {
				console.log('local get all suveey', res.data);
				let list = res.data.data.list;
				const finalList = [AddOption].concat(list && list);
				console.log('finalList', finalList);
				setSurveyListOptions(finalList && finalList);
				// setSelectedSurveyOption({
				// 	value: res.data.data.list && res.data.data.list[0].id,
				// 	label:
				// 		res.data.data.list &&
				// 		res.data.data.list[0].brand_title,
				// });
				setState({
					...state,
					loading: false,
					selectedSurvey: {
						value:
							res.data.data.list &&
							res.data.data.list[0] &&
							res.data.data.list[0].id,
						label:
							res.data.data.list &&
							res.data.data.list[0] &&
							res.data.data.list[0].brand_title,
					},
				});
			})
			.catch((e) => setState({ ...state, loading: false }));
	}, []);

	useEffect(() => {
		setState({
			...state,

			contentLoader: true,
		});
		let data = {
			// user_id: 49,
			survey_id:
				selectedSurveyOption.value == 'All'
					? ''
					: selectedSurveyOption.value,
			selected_month: state.selectedMonth,
			start_date: state.startDate,
			end_date: state.endDate,
		};

		axiosInstance
			.post(GET_REPORT_API_PATH, data)
			.then((res) => {
				let numberRespodents =
					res.data && res.data.data.number_of_respondents;

				setState({
					...state,
					reports: res.data.data,
					contentLoader: false,
				});

				if (numberRespodents == 0) {
					let errorMessage = '';

					if (state.startDate && state.endDate) {
						errorMessage = `No data found between ${moment(
							state.startDate
						).format('DD-MM-YYYY')} and ${moment(
							state.endDate
						).format('DD-MM-YYYY')}`;
					} else {
						errorMessage = `No data found in ${moment(
							state.selectedMonth
						).format('MMMM, YYYY')}`;
					}

					toast.error(
						<ErrorToast
							message={errorMessage || 'No data found !'}
						/>
					);
				}
			})
			.catch((error) => {
				setState({
					...state,
					loading: false,
					contentLoader: false,
				});
			});
	}, [
		selectedSurveyOption,
		state.selectedMonth,
		state.startDate,
		state.endDate,
	]);

	const setMonth = (selectedMonth) => {
		setState({ ...state, selectedMonth });
	};

	const setNewActive = (active) => {
		setState({
			...state,
			active,
			startDate: '',
			endDate: '',
			selectedMonth: moment()
				.subtract(active, 'month')
				.format('YYYY-MM'),
		});
	};

	const { loading, selectedMonth, selectedSurvey, reports } = state;

	const monthList = _map(monthsList, (list, index) => (
		<div
			className="month"
			key={index}
			onClick={() => setMonth(list.value)}
		>
			<img
				src={selectedMonth === list.value ? DateCheck : DateCircle}
			/>
			<div>{list.title}</div>
		</div>
	));

	const handleDownloadImage = async () => {
		const element = document.getElementById('print123');
		const canvas = await html2canvas(element);
		const data = canvas.toDataURL('image/jpg');
		const link = document.createElement('a');

		link.href = data;
		link.download = 'downloaded-image.jpg';

		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	const handleClean = (e) => {
		console.log(
			"moment().format('YYYY-MM')moment().format('YYYY-MM')",
			moment().format('YYYY-MM')
		);
		setState({
			...state,
			active: 0,
			selectedMonth: moment().format('YYYY-MM'),
			startDate: '',
			endDate: '',
		});
	};

	const handleDateChange = (e) => {
		if (e != null) {
			setState({
				...state,
				active: '',
				selectedMonth: '',
				startDate: e[0] && moment(e[0]).format('YYYY-MM-DD'), // moment(e[0]).format('YYYY-MM-DD'),
				endDate: e[1] && moment(e[1]).format('YYYY-MM-DD'), // moment(e[1]).format('YYYY-MM-DD'),
			});

			let sDate = e[0] && moment(e[0]).format('YYYY-MM-DD');
			let eDate = e[1] && moment(e[1]).format('YYYY-MM-DD');
		}
	};

	const onCurrentNpsCheckboxChange = () => {
		setState({
			...state,
			selectedMonth: moment().format('YYYY-MM'),
			startDate: '',
			endDate: '',
		});
	};

	let dateRangeValue = [];

	state.startDate && state.endDate
		? (dateRangeValue = [
				new Date(state.startDate),
				new Date(state.endDate),
		  ])
		: (dateRangeValue = '');

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<Container className="container">
					{/* <button onClick={() => handlePrint()}>print</button> */}

					<div
						// ref={componentRef}
						style={{
							// display: 'none',
							overflow: 'hidden ',
							visibility: 'hidden',
							height: 0,
							// width: '100% !important',
						}}
					>
						<div id="print123">
							<PrintReportData
								ref={componentRef}
								data={state}
								surveyName={
									selectedSurveyOption &&
									selectedSurveyOption.label
								}
								heading={
									state.startDate && state.endDate
										? moment(
												state.startDate
										  ).format('MM/DD/YYYY') +
										  ' ' +
										  '-' +
										  ' ' +
										  moment(
												state.endDate
										  ).format('MM/DD/YYYY')
										: state.selectedMonth
										? moment(
												state.selectedMonth
										  ).format('MMM-YYYY')
										: 'All Data'
								}
								dateBetween={
									state.startDate && state.endDate
										? 'Date between : '
										: ''
								}
								brandImage={user && user.brand_logo}
							/>
						</div>
					</div>

					<Meta title="Report" description="" />
					{/* <Breadcrumbs data={['Analytics', 'Reports']} /> */}
					<div className="title">Net Promoter Score Reports</div>

					<div className="wrapper">
						<div className="score-flex">
							<div className=" score-all">
								<Row>
									<Col
										lg="12"
										md="12"
										sm="12"
										xs="12"
										style={{
											display: 'flex',
											marginBottom: '20px',
											justifyContent:
												'flex-end',
										}}
									>
										<UncontrolledButtonDropdown>
											<DropdownToggle
												color="primary"
												caret
												outline
											>
												<Share size={15} />
												<span className="align-middle ms-50">
													Export
												</span>
											</DropdownToggle>
											<DropdownMenu>
												<DropdownItem
													className="w-100"
													color="secondary"
													style={{
														color: 'black',
														textDecoration:
															'none',
													}}
													onClick={() =>
														handlePrint()
													}
													// onClick={handlePrint}
												>
													<Printer
														size={15}
													/>
													<span className="align-middle ms-50">
														Print
													</span>
												</DropdownItem>
												{/* 
												<DropdownItem
													className="w-100"
													color="secondary"
													style={{
														color: 'black',
														textDecoration:
															'none',
													}}
													onClick={
														handleDownloadImage
													}
												>
													<FileText
														size={15}
													/>
													<span className="align-middle ms-50">
														JPG
													</span>
												</DropdownItem> */}
											</DropdownMenu>
										</UncontrolledButtonDropdown>
									</Col>
								</Row>
								<div className="d-flex">
									<div className="card score">
										{state.contentLoader ? (
											<>
												<Skeleton
													animation="wave"
													style={{
														width: '70%',
													}}
												/>
												<Skeleton
													animation="wave"
													style={{
														width: '80%',
													}}
												/>
											</>
										) : (
											<div className="number">
												{_get(
													state.reports,
													'net_promoter_score',
													NULL
												)}
											</div>
										)}
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
										{state.contentLoader ? (
											<>
												<Skeleton
													animation="wave"
													style={{
														width: '70%',
													}}
												/>
												<Skeleton
													animation="wave"
													style={{
														width: '80%',
													}}
												/>
											</>
										) : (
											<div className="number">
												{_get(
													state.reports,
													'number_of_respondents',
													NULL
												)}
											</div>
										)}
										<div className="number-text1">
											Number of Respondents
										</div>
										<div className="overlay1">
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
												Promoters vs.
												Detractors
											</div>
											{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
										</div>
										{state.contentLoader ? (
											<>
												<Skeleton
													style={{
														margin: 'auto auto',
													}}
													variant="circular"
													width={150}
													height={150}
												/>
											</>
										) : (
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
														<div>
															Promoters
														</div>
													</Col>
													<Col className="col-6 color2">
														<FontAwesomeIcon
															icon={[
																'fas',
																'circle',
															]}
														/>
														<div>
															Passive
														</div>
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
										)}
									</div>
									<div className="card uses-totals">
										<div className="promoters-title">
											<div>User Totals</div>
											{/* <FontAwesomeIcon icon={['fas', 'ellipsis-v']} /> */}
										</div>
										{state.contentLoader ? (
											<>
												<Skeleton
													style={{
														margin: 'auto auto',
													}}
													variant="circular"
													width={150}
													height={150}
												/>
											</>
										) : (
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
														<div>
															Promoters
														</div>
													</Col>
													<Col className="col-6 color2">
														<FontAwesomeIcon
															icon={[
																'fas',
																'circle',
															]}
														/>
														<div>
															Passive
														</div>
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
										)}
									</div>
								</div>
							</div>
						</div>
						<Filter>
							<div
								className=""
								style={{
									marginTop: '20px',
									marginBottom: '9px',
									marginLeft: '20px',
									fontSize: '14px',
									fontWeight: '600',
									color: '#183b56',
								}}
							>
								Survey
							</div>
							<div
								style={{
									margin: ' 0px 20px 10px',
								}}
							>
								{' '}
								<Select
									value={selectedSurveyOption}
									onChange={(e) =>
										setSelectedSurveyOption(e)
									}
									options={
										surveyListOptions &&
										surveyListOptions.map(
											(data) => ({
												value: data.id,
												label: data.brand_title,
											})
										)
									}
								/>
							</div>

							<div
								className={
									state.active === 0
										? 'survey active'
										: 'survey'
								}
								onClick={() => setNewActive(0)}
							>
								<img
									style={{
										height: '20px',
										width: '20px',
									}}
									src={
										state.active === 0
											? Check
											: Uncheck
									}
									className="check-box"
								/>
								<div className="s-box">
									Current month NPS
								</div>
							</div>

							<div className="report">
								<div className="archive">
									Reports Archive
								</div>
								{/* {monthList} */}

								<div className="select">
									<div
										className={
											state.active === 1
												? 'survey active'
												: 'survey'
										}
										onClick={() =>
											setNewActive(1)
										}
									>
										<img
											src={
												state.active === 1
													? Check
													: Uncheck
											}
											className="check-box"
										/>
										<div className="s-box">
											{moment()
												.subtract(
													1,
													'month'
												)
												.format(
													'MMMM, YYYY'
												)}
										</div>
									</div>

									<div
										className={
											state.active === 2
												? 'survey active'
												: 'survey'
										}
										onClick={() =>
											setNewActive(2)
										}
									>
										<img
											src={
												state.active === 2
													? Check
													: Uncheck
											}
											className="check-box"
										/>
										<div className="s-box">
											{moment()
												.subtract(
													2,
													'month'
												)
												.format(
													'MMMM, YYYY'
												)}
										</div>
									</div>

									<div
										className={
											state.active === 3
												? 'survey active'
												: 'survey'
										}
										onClick={() =>
											setNewActive(3)
										}
									>
										<img
											src={
												state.active === 3
													? Check
													: Uncheck
											}
											className="check-box"
										/>
										<div className="s-box">
											{moment()
												.subtract(
													3,
													'month'
												)
												.format(
													'MMMM, YYYY'
												)}
										</div>
									</div>

									<div
										className={
											state.active === 4
												? 'survey active'
												: 'survey'
										}
										onClick={() =>
											setNewActive(4)
										}
									>
										<img
											src={
												state.active === 4
													? Check
													: Uncheck
											}
											className="check-box"
										/>
										<div className="s-box">
											{moment()
												.subtract(
													4,
													'month'
												)
												.format(
													'MMMM, YYYY'
												)}
										</div>
									</div>

									<div
										className={
											state.active === 5
												? 'survey active'
												: 'survey'
										}
										onClick={() =>
											setNewActive(5)
										}
									>
										<img
											src={
												state.active === 5
													? Check
													: Uncheck
											}
											className="check-box"
										/>
										<div className="s-box">
											{moment()
												.subtract(
													5,
													'month'
												)
												.format(
													'MMMM, YYYY'
												)}
										</div>
									</div>
								</div>

								<DateRangePicker
									showOneCalendar
									value={dateRangeValue}
									onClean={handleClean}
									disabledDate={DateRangePicker.after(
										new Date()
									)}
									onChange={handleDateChange}
									placement="top"
									appearance="default"
									placeholder="Select Date Range"
									size="lg"
									style={{
										marginTop: '15px',
										justifyContent: 'center',
										marginLeft: '17px',
										width: 260,
										align: 'center',
										border: '1px solid black',
										borderRadius: '5px',
									}}

									// format="yyyy-MM"
									// views={['year', 'month']}
									// placement="top"
									// appearance="subtle"
									// // value={this.state.selectedMonth.toDate()}
									// // value={
									// //   this.state.selectedMonth &&
									// //   new Date(`${this.state.selectedMonth} + "-01"`)
									// // }
									// disabledDate={DateRangePicker.after(new Date())}
									// onChange={e => this.setMonth(moment(e).format('YYYY-MM'))}
									// placeholder="Select Month"
									// style={{
									//   marginTop: '15px',
									//   justifyContent: 'center',
									//   marginLeft: '17px',
									//   width: 260,
									//   align: 'center',
									//   border: '1px solid black',
									//   borderRadius: '5px',
									// }}
								/>

								{/* 
								<DatePicker
									format="yyyy-MM"
									views={['year', 'month']}
									placement="top"
									appearance="subtle"
									// value={
									// 	state.selectedMonth === ''
									// 		? ''
									// 		: new Date(
									// 				state.selectedMonth
									// 		  )
									// }
									// value={
									// 	state.selectedMonth &&
									// 	new Date(state.selectedMonth)
									// }
									disabledDate={DateRangePicker.after(
										new Date()
									)}
									onChange={(e) => {
										setState({
											...state,
											selectedMonth:
												moment(e).format(
													'YYYY-MM'
												),
										});
									}}
									placeholder="Select Month"
									style={{
										zIndex: 0,
										marginTop: '15px',
										justifyContent: 'center',
										marginLeft: '17px',
										width: 260,
										align: 'center',
										border: '1px solid black',
										borderRadius: '5px',
									}}
								/> */}
							</div>
						</Filter>
					</div>
				</Container>
			)}
		</>
	);
};

export default Home;
