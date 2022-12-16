import React, { Fragment, useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import qs from 'querystring';

import * as Actions from '../../redux/actions';
import FormComponent from '../../container/components/FormValidationHelper';
import {
	EMPTY_STRING,
	EMPTY_OBJECT,
	UNDEFINED,
} from '../../container/constants/commonConstants';
import Meta from '../../container/utils/meta';
import { Container } from './Styled';
import Toast from '../../container/components/Toast';

import Loading from '../../container/assets/loading.gif';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';
import { useParams } from 'react-router-dom';
import config from '../../container/utils/axiosConfig';
import axiosInstance from '../../container/utils/axiosInstance';
import {
	GET_SURVEY_BY_ID_API_PATH,
	SET_EMAIL_SURVEY_RESPONSE_API_PATH,
} from '../../ApiRoutes/ApiRoutes';

const EmailComment = (props) => {
	const [state, setState] = useState({
		brandName: EMPTY_STRING,
		name: EMPTY_STRING,
		loading: false,
		status: 0,
		comment: EMPTY_STRING,
		form: {
			errors: EMPTY_OBJECT,
		},
	});
	let { surveyId, score, token } = useParams();

	useEffect(() => {
		setState({ ...state, loading: true });

		let data = {
			// user_id: 49,
			survey_id: surveyId,
		};

		axiosInstance.post(GET_SURVEY_BY_ID_API_PATH, data).then((res) => {
			console.log('getBrandName', res.data.data.brand_title);

			setState({
				...state,
				loading: false,
				brandName: res.data.data.brand_title,
			});
		});
	}, []);

	// useEffect(() => {
	// 	const { brandName } = props;
	// 	// if (brandName !== prevProps.brandName) {
	// 	setState({ ...state, brandName: brandName.brand_title });
	// 	// }
	// }, [props.brandName]);

	const submit = () => {
		// const { surveyId, score, token } = useParams();
		const { name, comment } = state;

		const newData = {
			name: name || UNDEFINED,
			survey_id: parseFloat(surveyId),
			score: parseFloat(score),
			review_message: comment,
			token: token,
		};

		if (
			name == '' ||
			comment == '' ||
			name == undefined ||
			comment == undefined
		) {
			return toast.error(
				<ErrorToast message={'Please enter all fields.'} />
			);
		} else {
			setState({ ...state, loading: true });

			axiosInstance
				.post(SET_EMAIL_SURVEY_RESPONSE_API_PATH, newData)
				.then((res) => {
					if (res.data.success === 1) {
						this.setState({
							status: 1,
							loading: false,
						});
						return toast.success(
							<SuccessToast
								message={
									'Survey Submitted successfully.'
								}
							/>
						);
					} else {
						this.setState({
							status: 0,
							loading: false,
						});

						return toast.error(
							<ErrorToast message={res.data.message} />
						);
					}
				});
			// console.log('submit data', newData);
			// this.setState({
			// 	status: 1,
			// 	loading: false,
			// });
		}

		// sendSurveyResponse(qs.stringify(newData)).then(() => {
		// 	this.setState({
		// 		status: 1,
		// 		loading: false,
		// 	});
		// });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const { loading, brandName, name, status, comment } = state;

	let showScore = score;
	if (score > 10) {
		showScore = 10;
	}
	if (score < 0) {
		showScore = 0;
	}

	return (
		<Container>
			<Meta title="Email Comment" description="" />
			<div className="title">{brandName}</div>
			<div className="wrapper">
				{status === 0 ? (
					<Fragment>
						<div className="content">
							Tell us a bit more about why you chose{' '}
							{showScore}
						</div>
						<input
							type="text"
							name="name"
							value={name}
							placeholder="Full name"
							onChange={handleInputChange}
						/>
						<div>
							<textarea
								name="comment"
								value={comment}
								placeholder="comment"
								onChange={handleInputChange}
								autoComplete="off"
							/>
						</div>
						<Button
							color="primary"
							className="submit"
							onClick={() => !loading && submit()}
						>
							{loading ? (
								<img
									style={{
										width: '15%',
										height: '100%',
									}}
									src={Loading}
									className="loading12"
								/>
							) : (
								'Submit'
							)}
						</Button>
					</Fragment>
				) : (
					<div className="feedback">
						Thanks, we really appreciate your feedback.
					</div>
				)}
			</div>
		</Container>
	);
};

const mapStateToProps = (state) => ({
	brandName: state.user.brandName,
});

export default connect(mapStateToProps, {
	getBrandName: Actions.getBrandName,
	sendSurveyResponse: Actions.sendSurveyResponse,
})(EmailComment);

// import React, { Fragment } from 'react';
// import { Button } from 'reactstrap';
// import { connect } from 'react-redux';
// import qs from 'querystring';

// import * as Actions from '../../redux/actions';
// import FormComponent from '../../container/components/FormValidationHelper';
// import {
// 	EMPTY_STRING,
// 	EMPTY_OBJECT,
// 	UNDEFINED,
// } from '../../container/constants/commonConstants';
// import Meta from '../../container/utils/meta';
// import { Container } from './Styled';
// import Toast from '../../container/components/Toast';

// import Loading from '../../container/assets/loading.gif';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import {
// 	ErrorToast,
// 	SuccessToast,
// } from '../../container/components/ToastComponent';

// class EmailComment extends FormComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			brandName: EMPTY_STRING,
// 			name: EMPTY_STRING,
// 			loading: false,
// 			status: 0,
// 			comment: EMPTY_STRING,
// 			form: {
// 				errors: EMPTY_OBJECT,
// 			},
// 		};
// 	}

// 	componentDidMount() {
// 		const {
// 			getBrandName,
// 			match: {
// 				params: { surveyId, token },
// 			},
// 		} = this.props;

// 		console.log({ token, surveyId });
// 		this.setState({
// 			loading: true,
// 		});

// 		let data = {
// 			user_id: 49,
// 			survey_id: surveyId,
// 		};

// 		axios.post(
// 			process.env.REACT_APP_BACKEND_API_URL + 'api/v1/getSurveyById',
// 			data
// 		).then((res) => {
// 			console.log('getBrandName', res.data.data.brand_title);

// 			this.setState({
// 				loading: false,
// 				brandName: res.data.data.brand_title,
// 			});
// 		});

// 		// getBrandName(49, surveyId).then(() => {
// 		// 	this.setState({
// 		// 		loading: false,
// 		// 	});
// 		// });
// 	}

// 	componentDidUpdate(prevProps) {
// 		const { brandName } = this.props;
// 		if (brandName !== prevProps.brandName) {
// 			this.setState({
// 				brandName: brandName.brand_title,
// 			});
// 		}
// 	}

// 	submit = () => {
// 		const {
// 			sendSurveyResponse,
// 			match: {
// 				params: { surveyId, score, token },
// 			},
// 		} = this.props;
// 		const { name, comment } = this.state;

// 		const newData = {
// 			name: name || UNDEFINED,
// 			survey_id: parseFloat(surveyId),
// 			score: parseFloat(score),
// 			review_message: comment,
// 			token: token,
// 		};

// 		if (
// 			name == '' ||
// 			comment == '' ||
// 			name == undefined ||
// 			comment == undefined
// 		) {
// 			return toast.error(
// 				<ErrorToast message={'Please enter all fields.'} />
// 			);
// 			// Toast({
// 			// 	message: 'Please enter all fields.',
// 			// 	type: 'error',
// 			// });
// 		} else {
// 			this.setState({
// 				loading: true,
// 			});

// 			axios.post(
// 				process.env.REACT_APP_BACKEND_API_URL +
// 					'api/v1/setEmailSurveyResponse',
// 				newData
// 			).then((res) => {
// 				if (res.data.success === 1) {
// 					this.setState({
// 						status: 1,
// 						loading: false,
// 					});
// 					return toast.success(
// 						<SuccessToast
// 							message={'Survey Submitted successfully.'}
// 						/>
// 					);

// 					// Toast({
// 					// 	message: 'Survey Submitted successfully.',
// 					// 	type: 'success',
// 					// });
// 				} else {
// 					this.setState({
// 						status: 0,
// 						loading: false,
// 					});

// 					return toast.error(
// 						<ErrorToast message={res.data.message} />
// 					);

// 					// Toast({
// 					// 	message: res.data.message,
// 					// 	type: 'error',
// 					// });
// 				}
// 			});
// 			// console.log('submit data', newData);
// 			// this.setState({
// 			// 	status: 1,
// 			// 	loading: false,
// 			// });
// 		}

// 		// sendSurveyResponse(qs.stringify(newData)).then(() => {
// 		// 	this.setState({
// 		// 		status: 1,
// 		// 		loading: false,
// 		// 	});
// 		// });
// 	};

// 	render() {
// 		const {
// 			match: {
// 				params: { score },
// 			},
// 		} = this.props;
// 		const { loading, brandName, name, status, comment } = this.state;

// 		let showScore = score;
// 		if (score > 10) {
// 			showScore = 10;
// 		}
// 		if (score < 0) {
// 			showScore = 0;
// 		}

// 		return (
// 			<Container>
// 				<Meta title="Email Comment" description="" />
// 				<div className="title">{brandName}</div>
// 				<div className="wrapper">
// 					{status === 0 ? (
// 						<Fragment>
// 							<div className="content">
// 								Tell us a bit more about why you chose{' '}
// 								{showScore}
// 							</div>
// 							<input
// 								type="text"
// 								name="name"
// 								value={name}
// 								placeholder="Full name"
// 								onChange={this._handleInput}
// 							/>
// 							<div>
// 								<textarea
// 									name="comment"
// 									value={comment}
// 									placeholder="comment"
// 									onChange={this._handleInput}
// 									autoComplete="off"
// 								/>
// 							</div>
// 							<Button
// 								color="primary"
// 								className="submit"
// 								onClick={() =>
// 									!loading && this.submit()
// 								}
// 							>
// 								{loading ? (
// 									<img
// 										style={{
// 											width: '15%',
// 											height: '100%',
// 										}}
// 										src={Loading}
// 										className="loading12"
// 									/>
// 								) : (
// 									'Submit'
// 								)}
// 							</Button>
// 						</Fragment>
// 					) : (
// 						<div className="feedback">
// 							Thanks, we really appreciate your feedback.
// 						</div>
// 					)}
// 				</div>
// 			</Container>
// 		);
// 	}
// }

// const mapStateToProps = (state) => ({
// 	brandName: state.user.brandName,
// });

// export default connect(mapStateToProps, {
// 	getBrandName: Actions.getBrandName,
// 	sendSurveyResponse: Actions.sendSurveyResponse,
// })(EmailComment);
