import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import readXlsxFile from 'read-excel-file';
import UsaMap from './UsaMap';
import UsaMapTest from './UsaMapTest';
import { Button, Card, Col, Input, Label } from 'reactstrap';
import LineChart from './LineChart';
import Loading from '../../../src/@core/components/spinner/Fallback-spinner';
import demofile from '../../assets/demoSheet.xlsx';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';
import './styles.css';

import Papa from 'papaparse';
import axiosInstance from '../../container/utils/axiosInstance';
import { GET_SHEET_DATA_API_PATH } from '../../ApiRoutes/ApiRoutes';
import { useSelector } from 'react-redux';

// ** Third Party Components
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const AccountGrowth = () => {
	const user = useSelector((state) => state.user.currentUser);
	const [usaMapData, setUsaMapData] = useState('');
	const [nmMapData, setNmMapData] = useState('');

	const [lineChartData, setLineChartData] = useState('');

	const [loading, setLoading] = useState('');
	const [reloadLoading, setReloadLoading] = useState(true);
	const [firstTimeInfo, setFirstTimeInfo] = useState(true);

	const [count, setCount] = useState(0);

	const handleReload = () => {
		setCount(count + 1);
	};

	const handleInfo = () => {
		return MySwal.fire({
			title: 'Info!',
			text: 'You are getting Demo data. To view your own data fill up Google sheet ID in settings section!',
			icon: 'info',
			customClass: {
				confirmButton: 'btn btn-primary',
			},
			buttonsStyling: false,
		});
	};

	let sheet_id = user && user.sheetID ? user.sheetID : '';
	useEffect(() => {
		setReloadLoading(true);
		axiosInstance
			.post(GET_SHEET_DATA_API_PATH, { sheetId: sheet_id })
			.then((res) => {
				if (res.data.success == 1) {
					setLineChartData(res.data.accountData);
					setUsaMapData(res.data.stateData);
					setNmMapData(res.data.nmMapData);
					setReloadLoading(false);

					// if (firstTimeInfo && res.data.isDemoSheet) {
					// 	handleInfo();
					// 	setFirstTimeInfo(false);
					// }
					// toast.success(<SuccessToast message={'Success!'} />);
				} else {
					setReloadLoading(false);
					toast.error(
						<ErrorToast message={'Something went wrong!'} />
					);
				}
			})
			.catch((e) => {
				setReloadLoading(false);
				toast.error(
					<ErrorToast message={'Something went wrong!'} />
				);
			});
	}, [count]);

	return (
		<div>
			<>
				{' '}
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						marginBottom: '20px',
					}}
				>
					<Col md="3" sm="6" xs="7">
						<Button
							color="primary"
							content
							onClick={handleReload}
						>
							Reload Data
						</Button>
					</Col>

					<Button color="primary" content>
						<a
							style={{
								textDecoration: 'none',
								color: 'white',
							}}
							href={demofile}
							download="DemoFile"
						>
							Demo File
						</a>
					</Button>
				</div>
				{reloadLoading && reloadLoading == true ? (
					<Loading />
				) : usaMapData && lineChartData ? (
					<>
						<Col md="12">
							<LineChart
								lineChartData={
									lineChartData && lineChartData
								}
							/>
						</Col>
						<div className="usMapCol">
							<Col md="12" style={{ minHeight: '600px' }}>
								{/* <UsaMap
									usaMapData={
										usaMapData && usaMapData
									}
								/> */}
								<UsaMapTest
									usaMapData={
										usaMapData && usaMapData
									}
									nmMapData={nmMapData && nmMapData}
								/>
							</Col>
						</div>
					</>
				) : (
					<Loading />
				)}
			</>
		</div>
	);
};

export default AccountGrowth;

//for reference

//if want to use papaparse to get data from google sheet
// var stateDataUrl =
// 	'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6m7q96O8hS5VVM9SjhLlKyajSmbD0E7RpfMxzOpZgppTkr_tQtRHMaGznxhlgb7V2h227SxHNtJ6L/pub?gid=593485213&single=true&output=csv';

// var accountDataUrl =
// 	'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6m7q96O8hS5VVM9SjhLlKyajSmbD0E7RpfMxzOpZgppTkr_tQtRHMaGznxhlgb7V2h227SxHNtJ6L/pub?gid=0&single=true&output=csv';

// const handleReload = async () => {
// 	Papa.parse(stateDataUrl, {
// 		download: true,
// 		header: true,
// 		complete: (results) => {
// 			setStateData(results.data);
// 		},
// 	});
// 	Papa.parse(accountDataUrl, {
// 		download: true,
// 		header: true,
// 		complete: (results) => {
// 			setAccountData(results.data);
// 		},
// 	});
// 	//
// };

// function to convert xlsx into json
// const handleUpload = (e) => {
// 	e.preventDefault();
// 	setLoading(true);

// 	function getFileExtension(filename) {
// 		const extension = filename.split('.').pop();
// 		return extension;
// 	}

// 	const ext = getFileExtension(
// 		e.target.files && e.target.files[0].name
// 	);
// 	console.log(ext);

// 	if (ext == 'xlsx' || ext == 'xls') {
// 		if (e.target.files) {
// 			const reader = new FileReader();
// 			reader.onload = (e) => {
// 				const data = e.target.result;
// 				const workbook = XLSX.read(data, { type: 'array' });
// 				const sheetName = workbook.SheetNames[0];
// 				const worksheet = workbook.Sheets[sheetName];
// 				const lineData = XLSX.utils.sheet_to_json(worksheet);
// 				const sheetName1 = workbook.SheetNames[2];
// 				const worksheet1 = workbook.Sheets[sheetName1];
// 				const mapData = XLSX.utils.sheet_to_json(worksheet1);

// 				setUsaMapData(mapData && mapData);
// 				setLineChartData(lineData && lineData);
// 				setLoading(false);
// 			};
// 			reader.readAsArrayBuffer(e.target.files[0]);
// 		}
// 	} else {
// 		setLoading(false);
// 		toast.error(
// 			<ErrorToast
// 				message={'Please upload .xlsx or .xls File !'}
// 			/>
// 		);
// 	}
// };
