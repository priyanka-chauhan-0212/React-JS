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
	UncontrolledTooltip,
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
	Trash,
	Edit,
	Code,
	Codesandbox,
	Codepen,
} from 'react-feather';
import { useHistory } from 'react-router-dom';
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
import Loading from '../../@core/components/spinner/Fallback-spinner';

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

import {
	ROUTE_SURVEY_PEOPLE,
	ROUTE_ON_BOARDING,
	ROUTE_GET_SNIPPET,
	ROUTE_SURVEY_SEND_TO_EMAIL,
} from '../../router/routes.js';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import axios from 'axios';
import axiosInstance from '../../container/utils/axiosInstance';
import { SURVEY_METHOD } from '../../container/constants/commonConstants';
import PrintTable from './PrintTable';
import ExportReactCSV from '../../container/components/ExportToCsv/ExportCsv';
import config from '../../container/utils/axiosConfig';
import { toast } from 'react-toastify';
import { ErrorToast } from '../../container/components/ToastComponent';
import {
	DELETE_SURVEY_API_PATH,
	GET_ALL_SURVEY_API_PATH,
} from '../../ApiRoutes/ApiRoutes';

const MySwal = withReactContent(Swal);

const Home = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const [totalRecord, setTotalRecord] = useState(0);

	const componentRef = useRef();
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});
	const history = useHistory();
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

	console.log('bData===========changed', state.bData);

	const queryParams = new URLSearchParams(window.location.search);
	const keywordId = queryParams.get('keywordId');
	const commentId = queryParams.get('comment_id');

	useEffect(() => {
		setState({
			...state,
			tableLoading: true,
		});

		getSurveyList();
	}, [
		currentPage,
		state.pageSize,
		state.selectedSurveyType,
		state.startDate,
		state.endDate,
	]);

	const getSurveyList = async () => {
		let localApiBodyData = {
			page: currentPage + 1,
			sort_by: 'created_at',
			direction: 'DESC',
			page_size: state.pageSize.value,
			survey_method: state.selectedSurveyType.value,
			start_date: state.startDate,
			end_date: state.endDate,
		};

		await axiosInstance
			.post(GET_ALL_SURVEY_API_PATH, localApiBodyData)
			.then((res) => {
				console.log('get all from local api', res.data);
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
	};

	const handleDateRange = (e) => {
		if (e.value == 'Last7Days') {
			let endDate = moment(new Date()).format('YYYY-MM-DD');
			let startDate = moment(new Date())
				.subtract(1, 'week')
				.format('YYYY-MM-DD');

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

	const handlePageSize = (e) => {
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
		setCurrentPage(page.selected);
	};

	const snippet = (method, id) => {
		let route =
			method === 1 ? ROUTE_SURVEY_SEND_TO_EMAIL : ROUTE_GET_SNIPPET;
		history.push({
			pathname: route.replace(':surveyId', parseFloat(id)),
		});
	};

	const editSurvey = (method, id) => {
		let route = ROUTE_ON_BOARDING;
		history.push({
			pathname: route
				.replace(':surveyMethod', method)
				.replace(':surveyType', id),
		});
	};

	const redirect = () => {
		history.push(ROUTE_SURVEY_PEOPLE);
	};

	const deleteData = (id) => {
		return MySwal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete this survey?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			customClass: {
				confirmButton: 'btn btn-primary',
				cancelButton: 'btn btn-outline-danger ms-1',
			},
			buttonsStyling: false,
		}).then(function (result) {
			if (result.value) {
				let data = {
					id: id,
				};

				axiosInstance
					.post(DELETE_SURVEY_API_PATH, data)
					.then((res) => {
						if (res.data.success === 1) {
							MySwal.fire({
								icon: 'success',
								title: 'Deleted!',
								text: 'Your survey has been deleted.',
								customClass: {
									confirmButton: 'btn btn-success',
								},
							});
							getSurveyList();
						} else {
							toast.error(
								<ErrorToast
									message={
										'Error in deleting survey !'
									}
								/>
							);
						}
					});
			}
		});
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

	const CustomHeader = (props) => {
		const headers = [
			{ label: 'Date', key: 'createdAt' },
			{
				label: 'Survey Method',
				key: 'survey_method',
			},
			{ label: 'Brand Title', key: 'brand_title' },
			{ label: 'Description', key: 'description' },
			{ label: 'Question', key: 'question' },
		];
		const { from, to, pageSize, selectedSurveyType, bData } = state;

		let csvData = bData && bData.list;
		console.log('custom header bData', csvData);

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
										{from}-{to} of {totalRecord}
									</b>
								</h6>
							</div>
						</Col>

						<Col md="1" style={{ width: '130px' }}>
							{' '}
							<Select
								tag={Col}
								width={2}
								value={pageSize}
								options={[
									{ value: 10, label: 10 },
									{ value: 50, label: 50 },
									{ value: 100, label: 100 },
									{ value: 250, label: 250 },
								]}
								onChange={(e) => handlePageSize(e)}
							/>
						</Col>
						<Col md="1" style={{ width: '140px' }}>
							{' '}
							<Select
								tag={Col}
								value={selectedSurveyType}
								isDisabled
								options={[
									{ value: 0, label: 'Web' },
									{ value: 1, label: 'E-mail' },
									{ value: 2, label: 'Both' },
								]}
								onChange={(e) => handleSurveyType(e)}
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
									onChange={handleDateRange}
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
									onChange={handleDateChange}
									placement="bottom"
									appearance="default"
									placeholder="Select Date Range"
									size="md"
									style={{
										justifyContent: 'center',
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
							<Button
								color="primary"
								style={{ marginRight: '10px' }}
								onClick={redirect}
							>
								Add Survey
							</Button>
							<UncontrolledButtonDropdown>
								<DropdownToggle
									color="primary"
									caret
									outline
									disabled={
										bData &&
										bData.list &&
										bData.list.length < 1
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
											textDecoration: 'none',
										}}
										onClick={handlePrint}
									>
										<Printer size={15} />
										<span className="align-middle ms-50">
											Print
										</span>
									</DropdownItem>

									<DropdownItem
										className="w-100"
										color="secondary"
										style={{
											color: 'black',
											textDecoration: 'none',
										}}
									>
										<ExportReactCSV
											style={{
												color: 'black',
												textDecoration:
													'none',
											}}
											csvHeaders={headers}
											csvData={csvData}
											fileName="npsSurveyList.csv"
										/>
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledButtonDropdown>
						</Col>
					</Row>
				</>
			</Row>
		);
	};

	const customStyles = {
		rows: {
			style: {
				minHeight: '72px', // override the row height
			},
		},
		headCells: {
			style: {
				padding: '80px',
			},
		},
		cells: {
			style: {
				// padding: '80px',
			},
		},
	};

	const updatedColumns = [
		{
			name: 'DATE',
			sortable: true,
			minWidth: '50px',
			minHeight: 'fit-content',
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

		//uncomment below code for survey type option

		// {
		// 	name: 'Type',
		// 	sortable: true,
		// 	minWidth: '20px',
		// 	minHeight: 'fit-content',
		// 	cell: (row) => (
		// 		<a
		// 			style={{
		// 				fontSize: '14.5px',
		// 				color: 'black',
		// 			}}
		// 		>
		// 			{row && row.survey_method == 0
		// 				? 'Web'
		// 				: row.survey_method == 1
		// 				? 'E-Mail'
		// 				: ''}
		// 		</a>
		// 	),
		// 	selector: (row) => row.survey_method && row.survey_method,
		// },

		{
			name: 'title',
			sortable: true,
			minWidth: '310px',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.brand_title && row.brand_title}
				</a>
			),
			selector: (row) => row.brand_title && row.brand_title,
		},
		// {
		// 	name: 'description',
		// 	sortable: true,
		// 	minWidth: '480px',
		// 	minHeight: 'fit-content',

		// 	cell: (row) => (
		// 		<a
		// 			style={{
		// 				fontSize: '14.5px',

		// 				color: 'black',
		// 			}}
		// 		>
		// 			{row.description && row.description}
		// 		</a>
		// 	),
		// 	selector: (row) => row.description && row.description,
		// },
		{
			name: 'question',
			sortable: true,
			minWidth: '400px',
			minHeight: 'fit-content',
			cell: (row) => (
				<a
					style={{
						fontSize: '14.5px',

						color: 'black',
					}}
				>
					{row.question && row.question}
				</a>
			),
			selector: (row) => row.question && row.question,
		},
		{
			name: 'Actions',
			cell: (row) => {
				return (
					<div className="d-flex align-items-center permissions-actions">
						<Button
							size="sm"
							color="transparent"
							className="btn btn-icon"
							onClick={() =>
								snippet(row.survey_method, row.id)
							}
						>
							<Code
								className="font-medium-2"
								id={'viewSnippet' + row.id}
							/>
						</Button>

						<UncontrolledTooltip
							placement="top"
							target={'viewSnippet' + row.id}
						>
							View Snippet
						</UncontrolledTooltip>
						<Button
							size="sm"
							color="transparent"
							className="btn btn-icon"
							onClick={() =>
								editSurvey(
									row && row.survey_method === 1
										? SURVEY_METHOD.EMAIL
										: SURVEY_METHOD.WEB,
									row && row.id
								)
							}
						>
							<Edit
								className="font-medium-2"
								id={'editSnippet' + row.id}
							/>
						</Button>

						<UncontrolledTooltip
							placement="top"
							target={'editSnippet' + row.id}
						>
							Edit Snippet
						</UncontrolledTooltip>

						<Button
							size="sm"
							color="transparent"
							className="btn btn-icon"
							onClick={() => deleteData(row.id && row.id)}
						>
							<Trash
								className="font-medium-2"
								id={'deleteSnippet' + row.id}
							/>
						</Button>

						<UncontrolledTooltip
							placement="top"
							target={'deleteSnippet' + row.id}
						>
							Delete Snippet
						</UncontrolledTooltip>
					</div>
				);
			},
		},
	];

	if (state.tableLoading) {
		return <Loading />;
	}
	return (
		<>
			<Container className="container">
				<Meta title="Survey" description="" />
				<Breadcrumbs data={['Dashboard', 'Your Nps Survey']} />
				<div className="title">Your Nps Survey</div>

				{keywordId == null ||
				keywordId == undefined ||
				keywordId == '' ? null : (
					<b
						style={{
							fontSize: '15px',
							marginBottom: '10px',
							color: '#183B56',
							background: 'none',
						}}
						onClick={() => {
							// props.history.goBack();
						}}
					>
						<i
							class="fa fa-arrow-left"
							aria-hidden="true"
							style={{ marginRight: '8px' }}
						/>
						Back
					</b>
				)}

				{commentId == null ||
				commentId == undefined ||
				commentId == '' ? null : (
					<b
						style={{
							fontSize: '17px',
							marginBottom: '10px',
							color: '#183B56',
							background: 'none',
						}}
					>
						<i
							class="fa fa-arrow-left"
							aria-hidden="true"
							style={{ marginRight: '8px' }}
						/>
						Back
					</b>
				)}
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
							heading={'YOUR NPS SURVEY'}
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
										bData={state.bData && state}
									/>
								}
							/>
						</div>
					</Fragment>
				</Fragment>
			</Container>
		</>
	);
};

export default Home;
