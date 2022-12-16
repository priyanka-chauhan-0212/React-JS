import React, {
	PureComponent,
	Fragment,
	useState,
	useEffect,
	useRef,
} from 'react';
import {
	Row,
	Col,
	Card,
	Input,
	Label,
	Button,
	CardBody,
	CardTitle,
	CardHeader,
	DropdownMenu,
	DropdownItem,
	DropdownToggle,
	UncontrolledButtonDropdown,
} from 'reactstrap';

import {
	ChevronDown,
	Share,
	Printer,
	FileText,
	File,
	Grid,
	Copy,
	Plus,
} from 'react-feather';

// import Tooltip from 'react-simple-tooltip';

// import CustomSelectBox from '../../container/components/CustomSelectBox';
import { connect } from 'react-redux';
import cx from 'classnames';
import moment from 'moment';
import _map from 'lodash/map';
import _size from 'lodash/size';

// import * as Actions from '../../container/redux/actions';
import Meta from '../../container/utils/meta';
import Breadcrumbs from '../../container/components/Breadcrumb';
// import Loading from '../../container/components/Loading';
import Loading from '../../../src/@core/components/spinner/Fallback-spinner';

// import SpinnerLoader from '../../container/components/Spinner';
import { Container, NoData, Wrapper } from './Styled';
import { useReactToPrint } from 'react-to-print';
import NotFound from '../../container/assets/not-found.png';
import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCalendarAlt,
	faChevronCircleLeft,
	faChevronCircleRight,
} from '@fortawesome/free-solid-svg-icons';
AddIconToLibrary([faCalendarAlt, faChevronCircleLeft, faChevronCircleRight]);
import { CSVLink, CSVDownload } from 'react-csv';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import DataTable from 'react-data-table-component';
import ReactPaginate from 'react-paginate';

import { DateRangePicker } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import Select from 'react-select';
import Back from '../../container/assets/Back.svg';
import { useParams, useHistory } from 'react-router-dom';
import axiosInstance from '../../container/utils/axiosInstance';

import ExportReactCSV from '../../container/components/ExportToCsv/ExportCsv';
import PrintTable from './PrintTable';
import { GET_ALL_SURVEY_RESPONSE_API_PATH } from '../../ApiRoutes/ApiRoutes';
const Home = () => {
	// const { keywordId } = useParams();
	const history = useHistory();
	const [currentPage, setCurrentPage] = useState(0);
	const [totalRecord, setTotalRecord] = useState(0);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const [state, setState] = useState({
		bData: [],
		from: '',
		to: '',
		loading: false,
		tableLoading: false,
		pageSize: { value: 10, label: 10 },
		startDate: '',
		endDate: '',
		selectedDateRangeValue: { value: 'All', label: 'All' },
		selectedSurveyType: { value: 0, label: 'Web' },
	});

	console.log('bData===========', state.bData);

	const queryParams = new URLSearchParams(window.location.search);
	const keywordId = queryParams.get('keywordId');
	const commentId = queryParams.get('comment_id');

	useEffect(() => {
		setState({
			...state,
			tableLoading: true,
		});

		let id = 49;
		let page_size = state.pageSize.value;
		let survey_type = state.selectedSurveyType.value;
		let word_click = keywordId;
		// let survey_type = 2;

		console.log('huh-----------', word_click);

		let localBodyData = {};

		if (keywordId === null && commentId === null) {
			localBodyData = {
				// userId: 49,
				page: currentPage + 1,
				sort_by: 'created_at',
				direction: 'DESC',
				page_size: state.pageSize.value,
				survey_method: state.selectedSurveyType.value,
				// word_click_id: keywordId,
				// latest_comment_id: commentId,
				start_date: state.startDate,
				end_date: state.endDate,
			};
		}

		if (keywordId && commentId === null) {
			localBodyData = {
				// userId: 49,
				page: currentPage + 1,
				sort_by: 'created_at',
				direction: 'DESC',
				page_size: state.pageSize.value,
				survey_method: state.selectedSurveyType.value,
				word_click_id: keywordId,
				// latest_comment_id: commentId,
				start_date: state.startDate,
				end_date: state.endDate,
			};
		}
		if (commentId && keywordId === null) {
			localBodyData = {
				// userId: 49,
				page: currentPage + 1,
				sort_by: 'created_at',
				direction: 'DESC',
				page_size: state.pageSize.value,
				survey_method: state.selectedSurveyType.value,
				// word_click_id: keywordId,
				latest_comment_id: commentId,
				start_date: state.startDate,
				end_date: state.endDate,
			};
		}
		axiosInstance
			.post(GET_ALL_SURVEY_RESPONSE_API_PATH, localBodyData)
			.then((res) => {
				window.scroll(0, 0);
				setState({
					...state,
					bData: res.data && res.data.data,
					tableLoading: false,
					from: res.data && res.data.data.from,
					to: res.data && res.data.data.to,
				});
				setTotalRecord(res.data && res.data.data.total);
			});

		// axiosInstance
		// 	.get(
		// 		`survey/response?user_id=${id}&page=${
		// 			currentPage + 1
		// 		}&sort_by=created_at&direction=DESC&page_size=${page_size}&survey_method=${survey_type}&word_click=${
		// 			word_click || ''
		// 		}&start_date=&end_date=`
		// 	)
		// 	.then((res) => {
		// 		console.log('response----feedback', res.data);
		// 		window.scroll(0, 0);
		// 		setState({
		// 			...state,
		// 			bData: res.data && res.data.data,
		// 			tableLoading: false,
		// 			from: res.data && res.data.data.from,
		// 			to: res.data && res.data.data.to,
		// 		});
		// 		setTotalRecord(res.data && res.data.data.total);
		// 	});
	}, [
		currentPage,
		state.pageSize,
		state.selectedSurveyType,
		state.startDate,
		state.endDate,
		keywordId,
		commentId,
	]);

	const handleDateRange = (e) => {
		console.log(e);
		// setState({
		// 	...state,
		// 	selectedDateRangeValue: e,
		// });
		// setState({
		// 	...state,
		// 	selectedDateRangeValue: {
		// 		value: '2121',
		// 		label: '45454',
		// 	},
		// });

		if (e.value == 'Last7Days') {
			let endDate = moment(new Date()).format('YYYY-MM-DD');
			let startDate = moment(new Date())
				.subtract(1, 'week')
				.format('YYYY-MM-DD');

			console.log({ startDate, endDate });
			setState({
				...state,
				startDate: startDate,
				endDate: endDate,
				selectedDateRangeValue: e,
			});
		}
		if (e.value == 'LastMonth') {
			let endDate = moment(new Date()).format('YYYY-MM-DD');
			let startDate = moment(new Date())
				.subtract(1, 'month')
				.format('YYYY-MM-DD');

			console.log({ startDate, endDate });
			setState({
				...state,
				startDate: startDate,
				endDate: endDate,
				selectedDateRangeValue: e,
			});
		}
		if (e.value == 'All') {
			setState({
				...state,
				startDate: '',
				endDate: '',
				selectedDateRangeValue: e,
			});
		}
		if (e.value == 'custom') {
			setState({
				...state,
				startDate: '',
				endDate: '',
				selectedDateRangeValue: e,
			});
		}
	};

	const handleDateChange = (e) => {
		if (e != null) {
			setState({
				...state,
				startDate: e[0] && moment(e[0]).format('YYYY-MM-DD'), // moment(e[0]).format('YYYY-MM-DD'),
				endDate: e[1] && moment(e[1]).format('YYYY-MM-DD'), // moment(e[1]).format('YYYY-MM-DD'),
			});
		}
	};

	const handleClean = (e) => {
		setState({
			...state,
			startDate: '',
			endDate: '',
			currentPage: 1,
		});
	};

	const CustomHeader = ({
		from,
		to,
		total,
		handlePageSize,
		pageSize,
		handleSurveyType,
		selectedSurveyType,
	}) => {
		const headers = [
			{ label: 'Date', key: 'createdAt' },
			{ label: 'Score', key: 'score_value' },
			{ label: 'Page Url', key: 'url' },
			{ label: 'Comment', key: 'review_message' },
		];

		let csvData = state.bData && state.bData.list && state.bData.list;
		console.log('csv feedback data', csvData);

		return (
			<Row className="text-nowrap w-100 my-75 g-0 permission-header">
				<>
					<Row className="">
						<Col
							md="3"
							style={{
								width: '380px',
								position: 'relative',
							}}
						>
							<div style={{ marginTop: '5px' }}>
								<h6>
									<b>
										Viewing survey Respondents{' '}
										{from}-{to} of {total}
									</b>
								</h6>
							</div>
						</Col>

						{commentId ? (
							<></>
						) : (
							<>
								<Col md="1" style={{ width: '130px' }}>
									{' '}
									<Select
										tag={Col}
										width={2}
										value={pageSize}
										options={[
											{ value: 10, label: 10 },
											{ value: 50, label: 50 },
											{
												value: 100,
												label: 100,
											},
											{
												value: 250,
												label: 250,
											},
										]}
										onChange={(e) =>
											handlePageSize(e)
										}
									/>
								</Col>
								<Col md="1" style={{ width: '140px' }}>
									{' '}
									<Select
										tag={Col}
										value={selectedSurveyType}
										isDisabled
										options={[
											{
												value: 0,
												label: 'Web',
											},
											{
												value: 1,
												label: 'E-mail',
											},
											{
												value: 2,
												label: 'Both',
											},
										]}
										onChange={(e) =>
											handleSurveyType(e)
										}
									/>
								</Col>
								<Col md="2" style={{ width: '170px' }}>
									<div
										style={{
											marginLeft: '0px',
											width: '150px',
										}}
									>
										{' '}
										<Select
											value={
												state.selectedDateRangeValue
											}
											options={[
												{
													value: 'Last7Days',
													label: 'Last 7 Days',
												},
												{
													value: 'LastMonth',
													label: 'Last 1 Month',
												},
												{
													value: 'All',
													label: 'All',
												},
												{
													value: 'custom',
													label: 'Custom',
												},
											]}
											onChange={
												handleDateRange
											}
										/>
									</div>
								</Col>
								{state.selectedDateRangeValue.value ==
								'custom' ? (
									<Col md="2">
										{' '}
										<DateRangePicker
											showOneCalendar
											value={[
												state.startDate &&
													moment(
														state.startDate
													).toDate(),
												state.endDate &&
													moment(
														state.endDate
													).toDate(),
											]}
											onClean={handleClean}
											disabledDate={DateRangePicker.after(
												new Date()
											)}
											onChange={
												handleDateChange
											}
											placement="bottom"
											appearance="default"
											placeholder="Select Date Range"
											size="md"
											style={{
												justifyContent:
													'center',
												marginLeft: '17px',
												width: 220,
												align: 'center',
												// border: '0.1px solid black',
												borderRadius: '5px',
												float: 'right',
											}}
										/>
									</Col>
								) : null}

								<Col md="1">
									<UncontrolledButtonDropdown>
										<DropdownToggle
											color="primary"
											caret
											outline
											disabled={
												state.bData &&
												state.bData.list &&
												state.bData.list
													.length < 1
													? true
													: false
											}
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
												onClick={
													handlePrint
												}
											>
												<Printer
													size={15}
												/>
												<span className="align-middle ms-50">
													Print
												</span>
											</DropdownItem>

											<DropdownItem
												className="w-100"
												color="secondary"
												style={{
													color: 'black',
													textDecoration:
														'none',
												}}
											>
												<ExportReactCSV
													style={{
														color: 'black',
														textDecoration:
															'none',
													}}
													csvHeaders={
														headers
													}
													csvData={
														csvData
													}
													fileName="surveyFeedback.csv"
												/>
											</DropdownItem>
										</DropdownMenu>
									</UncontrolledButtonDropdown>
								</Col>
							</>
						)}
					</Row>
				</>
			</Row>
		);
	};

	const handlePageSize = (e) => {
		console.log('page size changed', e.value);
		setState({
			...state,
			pageSize: e,
		});
		setCurrentPage(0);
	};

	const handleSurveyType = (e) => {
		setState({
			...state,
			selectedSurveyType: e,
		});
		setCurrentPage(0);
	};

	const handlePagination = (page) => {
		console.log('selected page', page.selected);
		setCurrentPage(page.selected);
	};
	const CustomPagination = () => (
		<ReactPaginate
			previousLabel={''}
			nextLabel={''}
			forcePage={currentPage}
			onPageChange={(page) => handlePagination(page)}
			pageCount={Math.ceil(totalRecord / state.pageSize.value) || 1}
			breakLabel={'...'}
			pageRangeDisplayed={3}
			marginPagesDisplayed={2}
			activeClassName="active"
			pageClassName="page-item"
			breakClassName="page-item"
			nextLinkClassName="page-link"
			pageLinkClassName="page-link"
			breakLinkClassName="page-link"
			previousLinkClassName="page-link"
			nextClassName="page-item next-item"
			previousClassName="page-item prev-item"
			containerClassName={
				'pagination react-paginate separated-pagination pagination-sm justify-content-end pe-1 mt-1'
			}
		/>
	);

	const updatedColumns = [
		{
			name:
				// <h5
				// 	style={{
				// 		fontSize: '15px',
				// 		fontWeight: 1000,
				// 		color: 'black',
				// 	}}
				// >
				'DATE',
			// {/* </h5> */}
			sortable: true,
			minWidth: '150px',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.createdAt &&
						moment(row.createdAt).format('MM/DD/YYYY')}
				</a>
			),
			selector: (row) => row.createdAt && row.createdAt,
		},
		{
			name:
				// <h5
				// 	style={{
				// 		fontSize: '14.5px',
				// 		fontWeight: 1000,
				// 		color: 'black',
				// 	}}
				// >
				'SCORE',
			// </h5>
			sortable: true,
			minWidth: '50px',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.score_value && row.score_value}
				</a>
			),
			selector: (row) => row.score_value && row.score_value,
		},

		{
			name:
				// <h5
				// 	style={{
				// 		fontSize: '14.5px',
				// 		fontWeight: 1000,
				// 		color: 'black',
				// 	}}
				// >
				'PAGE',
			// </h5>
			sortable: true,
			minWidth: '250px',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.url && row.url}
				</a>
			),
			selector: (row) => row.url && row.url,
		},
		{
			name:
				// <h5
				// 	style={{
				// 		fontSize: '14.5px',
				// 		fontWeight: 1000,
				// 		color: 'black',
				// 	}}
				// >
				'COMMENTS IF PROVIDED',
			// </h5>
			sortable: true,
			minWidth: '300px',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.review_message && row.review_message}
				</a>
			),
			selector: (row) => row.review_message && row.review_message,
		},
	];

	if (state.tableLoading) {
		return <Loading />;
	}
	return (
		<>
			{/* {state.tableLoading ? (
				<Loading style={{ bottom: 50 }} />
			) : ( */}
			<Container className="container">
				<Meta title="Feedback" description="" />

				<Breadcrumbs data={['Analytics', 'Feedback']} />

				{keywordId == null ||
				keywordId == undefined ||
				keywordId == '' ? null : (
					<img
						src={Back}
						className="back-img"
						onClick={() => history.goBack()}
					/>
				)}
				{commentId == null ||
				commentId == undefined ||
				commentId == '' ? null : (
					<img
						src={Back}
						className="back-img"
						onClick={() => history.goBack()}
					/>
				)}
				<div className="title">Feedback</div>

				<Fragment>
					<div
						style={{
							display: 'none',
							width: '100% !important',
						}}
					>
						<PrintTable
							ref={componentRef}
							data={state.bData && state.bData.list}
							heading={'SURVEY FEEDBACK'}
						/>
					</div>

					<Fragment>
						<div className="react-dataTable">
							<DataTable
								noHeader
								pagination
								paginationServer
								columns={updatedColumns}
								paginationPerPage={10}
								className="react-dataTable"
								sortIcon={<ChevronDown />}
								paginationDefaultPage={currentPage}
								paginationComponent={CustomPagination}
								subHeader
								responsive
								data={state.bData && state.bData.list}
								subHeaderComponent={
									<CustomHeader
										from={state.from}
										to={state.to}
										total={totalRecord}
										handlePageSize={(e) =>
											handlePageSize(e)
										}
										pageSize={state.pageSize}
										handleSurveyType={(e) =>
											handleSurveyType(e)
										}
										selectedSurveyType={
											state.selectedSurveyType
										}
										bData={
											state.bData &&
											state.bData
										}
										componentRef={componentRef}
									/>
								}
							/>
						</div>
					</Fragment>
				</Fragment>
			</Container>
			{/* )} */}
		</>
	);
};

export default Home;
