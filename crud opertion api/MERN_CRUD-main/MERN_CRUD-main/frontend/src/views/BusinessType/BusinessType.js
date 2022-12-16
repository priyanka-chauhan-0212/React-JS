/*eslint-disable*/

import { useEffect, useState, Fragment } from 'react';

import {
	Alert,
	CardBody,
	Row,
	Col,
	Label,
	Form,
	Input,
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	FormFeedback,
} from 'reactstrap';
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import {
	getData,
	addPermission,
	deletePermission,
	selectPermission,
	updatePermission,
} from '../apps/roles-permissions/store/index';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

import api from '../../api';
import ReactPaginate from 'react-paginate';
import XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
import { useForm, Controller } from 'react-hook-form';
import { ChevronDown, Edit, Trash } from 'react-feather';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import '@styles/react/libs/tables/react-dataTable-component.scss';
import Spinner from '../spinner/Fallback-spinner';
import axios from 'axios';
const api1 = axios.create({
	baseURL: process.env.REACT_APP_SERVERURL,
	timeout: 1000,
	headers: {
		'Content-Type': 'application/json;charset=UTF-8',
		Authorization: localStorage.getItem('token'),
	},
});
const MySwal = withReactContent(Swal);

const SignupSchema = yup.object().shape({
	businessTypeName: yup.string().required(),
});

const CustomHeader = ({
	setShow,
	businessType,
	setBusinessType,
	getAllFunction,
	downloadExcel,
	bData,
}) => {
	return (
		<Row className="text-nowrap w-100 my-75 g-0 permission-header">
			<Col xs={12} lg={8}>
				<div className="mt-lg-0 mt-1">
					<Button
						className="add-permission mt-sm-0 mt-1"
						color="primary"
						onClick={() => setShow(true)}
					>
						Add Business Type
					</Button>
				</div>

				<CardBody>
					<Row className="">
						<Col lg="4" md="6">
							<Input
								id="name"
								placeholder="Business Type"
								value={businessType}
								onChange={(e) =>
									setBusinessType(e.target.value)
								}
							/>
						</Col>

						<Col md="2">
							<Button onClick={getAllFunction}>
								Search
							</Button>
						</Col>
						<Col>
							<Button
								color="primary"
								//disabled={
									//bData.length <= 0 ? true : false
								//}
								onClick={downloadExcel}
							>
								Export
							</Button>
						</Col>
					</Row>
				</CardBody>
			</Col>
		</Row>
	);
};

const Table = () => {
	// ** Store Vars & Hooks
	const history = useHistory();

	const [editId, setEditId] = useState('');
	const [loader, setLoader] = useState(false);

	const dispatch = useDispatch();

	const [currentPage, setCurrentPage] = useState(0);
	const [businessType, setBusinessType] = useState('');

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
			pageCount={Math.ceil(totalRecord / 10) || 1}
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
	const deleteData = (id) => {
		return MySwal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete this record?',
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
				api1.post('BusinessType/Remove?BusinessTypeId=' + id)
					.then((res) => {
						console.log('delete res', res);
						if (res.data.statusCode === 200) {
							MySwal.fire({
								icon: 'success',
								title: 'Deleted!',
								text: 'Your record has been deleted.',
								customClass: {
									confirmButton: 'btn btn-success',
								},
							});
							getAllFunction();

							// history.go();
						} else {
							toast.error(
								<ErrorToast
									message={res.data.message}
								/>,
								{
									hideProgressBar: true,
								}
							);
						}
					})
					.catch(function (error) {
						if (error.message == 'Network Error') {
							// Request made and server responded
							history.push('/servererror');
						}
					});
			}
		});
	};

	const SuccessToast = ({ data, message }) => {
		return (
			<Fragment>
				<div className="toastify-header">
					<div className="title-wrapper">
						{/* <Avatar size="sm" color="success" icon={<Check size={12} />} /> */}
						<h6 className="toast-title">{message}</h6>
					</div>
				</div>
			</Fragment>
		);
	};

	const ErrorToast = ({ message }) => {
		return (
			<Fragment>
				<div className="toastify-header">
					<div className="title-wrapper">
						{/* <Avatar size="sm" color="danger" icon={<X size={12} />} /> */}
						<h6 className="toast-title">Error!</h6>
					</div>
				</div>
				<div className="toastify-body">
					<span role="img" aria-label="toast-text">
						{message}
					</span>
				</div>
			</Fragment>
		);
	};

	const store = useSelector((state) => state.permissions);
	const {
		reset,
		control,

		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		defaultValues: { businessTypeName: '' },
		resolver: yupResolver(SignupSchema),
	});

	const [show, setShow] = useState(false);

	const handleEditClick = (data) => {
		const id = data.businessTypeId;
		api.get('BusinessType/GetById?BusinessTypeId=' + id, {
			headers: { Authorization: localStorage.getItem('token') },
		})
			.then((res) => {
				setValue(
					'businessTypeName',
					res.data.workerList.businessTypeName
				);

				setEditId(res.data.workerList.businessTypeId);
			})
			.catch(function (error) {
				if (error.message == 'Network Error') {
					// Request made and server responded
					history.push('/servererror');
				}
			});

		dispatch(selectPermission(data));

		setShow(true);
	};

	const handleModalClosed = () => {
		dispatch(selectPermission(null));
		setValue('permissionName', '');
		reset();
	};

	const onSubmit = (data) => {
		let postData = {
			businessTypeName: data.businessTypeName,
			IsActive: true,
			CreatedBy: localStorage.getItem('userId'),
		};

		api.post('BusinessType/Add', postData, {
			headers: { Authorization: localStorage.getItem('token') },
		})
			.then((res) => {
				if (res.data.statusCode == 200) {
					setShow(false);
					setValue('businessTypeName', '');

					toast.success(
						<SuccessToast
							message={'Added Successfully'}
							data={data}
						/>,
						{
							hideProgressBar: true,
						}
					);
					getAllFunction();
				} else {
					toast.error(
						<ErrorToast message={res.data.message} />,
						{
							hideProgressBar: true,
						}
					);
				}
			})
			.catch(function (error) {
				if (error.message == 'Network Error') {
					// Request made and server responded
					history.push('/servererror');
				}
			});
	};

	const onEdit = (data) => {
		let editData = {
			businessTypeName: data.businessTypeName,
			IsActive: true,
			BusinessTypeId: editId,
			ModifiedBy: localStorage.getItem('userId'),
		};
		api.post('BusinessType/Update', editData, {
			headers: { Authorization: localStorage.getItem('token') },
		})
			.then((res) => {
				if (res.data.statusCode == 200) {
					toast.success(
						<SuccessToast
							message={'Updated Successfully'}
							data={data}
						/>,
						{
							hideProgressBar: true,
						}
					);
					getAllFunction();
					setEditId('');

					setValue('businessTypeName', '');
					setShow(false);
				} else {
					toast.error(
						<ErrorToast message={res.data.message} />,
						{
							hideProgressBar: true,
						}
					);
				}
			})
			.catch(function (error) {
				if (error.message == 'Network Error') {
					// Request made and server responded
					history.push('/servererror');
				}
			});
	};

	const updatedColumns = [
		{
			name: 'BUSINESS TYPE',
			sortable: true,
			minWidth: '350px',
			cell: ({ businessTypeName }) => businessTypeName,
			selector: (row) => row.businessTypeId,
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
							onClick={() => handleEditClick(row)}
						>
							<Edit className="font-medium-2" />
						</Button>
						<Button
							size="sm"
							color="transparent"
							className="btn btn-icon"
							onClick={() =>
								deleteData(row.businessTypeId)
							}
						>
							<Trash className="font-medium-2" />
						</Button>
					</div>
				);
			},
		},
	];

	const handleDiscard = () => {
		setEditId('');
		reset();
		setShow(false);
	};

	const renderForm = () => {
		if (editId == '' || editId == undefined || editId == null) {
			return (
				<Row tag={Form} onSubmit={handleSubmit(onSubmit)}>
					<Col xs={12}>
						<Label
							className="form-label"
							for="businessTypeName"
						>
							Business Type
						</Label>
						<Controller
							control={control}
							id="businessTypeName"
							name="businessTypeName"
							render={({ field }) => (
								<Input
									maxLength={50}
									placeholder="Business Type"
									invalid={
										errors.businessTypeName &&
										true
									}
									{...field}
								/>
							)}
						/>
						{errors && errors.businessTypeName && (
							<FormFeedback>
								Please enter a business type
							</FormFeedback>
						)}
					</Col>

					<Col xs={12} className="mt-2">
						<Button className="me-1" color="primary">
							Add
						</Button>
						<Button
							outline
							type="reset"
							onClick={handleDiscard}
						>
							Discard
						</Button>
					</Col>
				</Row>
			);
		} else {
			return (
				<Fragment>
					<Row tag={Form} onSubmit={handleSubmit(onEdit)}>
						<Col xs={12} sm={9}>
							<Label
								className="form-label"
								for="businessTypeName"
							>
								Business Type
							</Label>
							<Controller
								control={control}
								id="businessTypeName"
								name="businessTypeName"
								render={({ field }) => (
									<Input
										maxLength={50}
										placeholder="Business Type"
										invalid={
											errors.businessTypeName &&
											true
										}
										{...field}
									/>
								)}
							/>
							{errors && errors.businessTypeName && (
								<FormFeedback>
									Please enter a business type
								</FormFeedback>
							)}
						</Col>

						<Col xs={12} className="mt-2">
							<Button className="me-1" color="primary">
								Update
							</Button>
							<Button
								outline
								type="reset"
								onClick={handleDiscard}
							>
								Discard
							</Button>
						</Col>
					</Row>
				</Fragment>
			);
		}
	};

	const [bData, setBData] = useState([]);
	const [totalRecord, setTotalRecord] = useState(0);

	const downloadExcel = (data) => {
		console.log('excel...', data);
		const FilteredData = data.map((item) => ({
			"Business Type Name" : item.businessTypeName
		}))
		const workSheet = XLSX.utils.json_to_sheet(FilteredData);
		const workBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBook, workSheet, 'excel');

		let buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
		XLSX.write(workBook, { bookType: 'xlsx', type: 'binary' });

		//for download xlsx file
		XLSX.writeFile(workBook, 'businessTypeData.xlsx');
	};
	const getAllFunction = () => {
		setLoader(true);

		let obj = {
			BusinessTypeName: businessType,
			PageSize: 10,
			Page: businessType !== '' ? 1 : currentPage + 1,
			IsActive: true,
		};

		api.post('BusinessType/GetPagedRecords', obj, {
			headers: { Authorization: localStorage.getItem('token') },
		})
			.then((res) => {
				setLoader(false);
				if (res.data.errorMessage == 'Invalid Token') {
					localStorage.removeItem('userId');
					localStorage.removeItem('token');
					localStorage.removeItem('refreshToken');
					localStorage.removeItem('accessToken');
					localStorage.removeItem('userData');
					history.push('/notauthorized');
				} else {
					setBData(res.data.data);
					setTotalRecord(res.data.totalRecords);
				}
			})
			.catch(function (error) {
				if (error.message == 'Network Error') {
					// Request made and server responded
					history.push('/servererror');
				}
			});
	};
	useEffect(() => {
		getAllFunction();
	}, [currentPage]);

	return (
		<>
			{loader ? (
				<Spinner />
			) : (
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
							data={bData}
							subHeaderComponent={
								<CustomHeader
									setShow={setShow}
									businessType={businessType}
									setBusinessType={setBusinessType}
									getAllFunction={() =>
										getAllFunction()
									}
									downloadExcel={() =>
										downloadExcel(bData)
									}
									bData={bData}
								/>
							}
						/>
					</div>
					<Modal
						isOpen={show}
						onClosed={handleModalClosed}
						className="modal-dialog-centered"
					>
						<ModalHeader className="bg-transparent"></ModalHeader>
						<ModalBody className="p-3 pt-0">
							<div className="text-center mb-2">
								<h3 className="mb-1">
									{editId == '' ||
									editId == undefined ||
									editId == null
										? 'Add Business Type'
										: 'Edit Business Type'}{' '}
								</h3>
							</div>

							{renderForm()}
						</ModalBody>
					</Modal>
				</Fragment>
			)}
		</>
	);
};

export default Table;
