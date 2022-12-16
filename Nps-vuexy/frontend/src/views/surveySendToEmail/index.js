// import React from 'react';
// import { Button } from 'reactstrap';
// import { connect } from 'react-redux';
// import qs from 'querystring';

// // import * as Actions from '../../container/redux/actions';
// import FormComponent from '../../container/components/FormValidationHelper';
// import { ROUTE_SURVEY } from '../../router/routes';
// import {
// 	EMPTY_STRING,
// 	EMPTY_OBJECT,
// } from '../../container/constants/commonConstants';
// import Meta from '../../container/utils/meta';
// import { Container } from './Styled';

// import Loading from '../../container/assets/loading.gif';
// import Back from '../../container/assets/Back.svg';

// class SurveySendToEmail extends FormComponent {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			email: EMPTY_STRING,
// 			loading: false,
// 			form: {
// 				errors: EMPTY_OBJECT,
// 			},
// 		};
// 	}

// 	submit = () => {
// 		const {
// 			sendSurveyMail,
// 			history,
// 			match: {
// 				params: { surveyId },
// 			},
// 		} = this.props;
// 		const { email } = this.state;
// 		this.setState({
// 			loading: true,
// 		});
// 		const newData = {
// 			survey_id: parseFloat(surveyId),
// 			mail_list: email,
// 		};
// 		sendSurveyMail(qs.stringify(newData), history).then(() => {
// 			this.setState({
// 				loading: false,
// 			});
// 		});
// 	};

// 	goBack = () => {

// 		history.push(ROUTE_SURVEY);
// 	};

// 	render() {
// 		const { loading, email } = this.state;
// 		return (
// 			<Container className="container">
// 				<Meta title="Survey send to email" description="" />
// 				<img
// 					src={Back}
// 					className="back-img"
// 					onClick={this.goBack}
// 				/>
// 				<div className="title">Send a one-time email survey</div>
// 				<div className="people">
// 					Paste some people below(use comma separated, name is
// 					optional)
// 				</div>
// 				<div>
// 					<textarea
// 						name="email"
// 						value={email}
// 						onChange={this._handleInput}
// 						autoComplete="off"
// 						placeholder="John:john@mailinator.com"
// 					/>
// 				</div>
// 				<Button
// 					color="primary"
// 					className="submit"
// 					onClick={() => !loading && this.submit()}
// 				>
// 					{loading ? (
// 						<img src={Loading} className="loading" />
// 					) : (
// 						'Send'
// 					)}
// 				</Button>
// 			</Container>
// 		);
// 	}
// }

// export default connect(null, {
// 	sendSurveyMail: Actions.sendSurveyMail,
// })(SurveySendToEmail);

import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import qs from 'querystring';

// import * as Actions from '../../container/redux/actions';
import FormComponent from '../../container/components/FormValidationHelper';
import { ROUTE_SURVEY } from '../../router/routes';
import {
	EMPTY_STRING,
	EMPTY_OBJECT,
} from '../../container/constants/commonConstants';
import Meta from '../../container/utils/meta';
import { Container } from './Styled';
import { useHistory, useParams } from 'react-router-dom';
import Loading from '../../container/assets/loading.gif';
import Back from '../../container/assets/Back.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';
import config from '../../container/utils/axiosConfig';
import axiosInstance from '../../container/utils/axiosInstance';
import { SURVEY_SEND_EMAIL_API_PATH } from '../../ApiRoutes/ApiRoutes';

const SurveySendToEmail = () => {
	const history = useHistory();
	const { surveyId } = useParams();

	const [state, setState] = useState({
		email: EMPTY_STRING,
		loading: false,
		form: {
			errors: EMPTY_OBJECT,
		},
	});

	const submit = () => {
		// const {
		// 	sendSurveyMail,
		// 	history,
		// 	match: {
		// 		params: { surveyId },
		// 	},
		// } = this.props;
		const { email } = state;

		setState({ ...state, loading: true });

		const newData = {
			surveyId: parseFloat(surveyId),
			emailList: email,
		};

		if (email == '') {
			toast.error(
				<ErrorToast message={'Please enter atleast one email.'} />
			);
			setState({ ...state, loading: false });
		} else {
			axiosInstance
				.post(SURVEY_SEND_EMAIL_API_PATH, newData)
				.then((res) => {
					if (res.data.success === 1) {
						toast.success(
							<SuccessToast message={res.data.message} />
						);

						setState({ ...state, loading: false });
						history.push(ROUTE_SURVEY);
					} else {
						toast.error(
							<ErrorToast message={res.data.message} />
						);

						setState({ ...state, loading: false });
					}
				});
		}
		// sendSurveyMail(qs.stringify(newData), history).then(() => {
		// 	this.setState({
		// 		loading: false,
		// 	});
		// });
	};

	const goBack = () => {
		history.push(ROUTE_SURVEY);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		setState({
			...state,
			[name]: value,
		});
	};

	return (
		<Container className="container">
			<Meta title="Survey send to email" description="" />
			<img src={Back} className="back-img" onClick={goBack} />
			<div className="title">Send a one-time email survey</div>
			<div className="people">
				Paste some people below(use comma separated, name is
				optional)
			</div>
			<div>
				<textarea
					style={{ background: 'white' }}
					name="email"
					value={state.email}
					onChange={handleInputChange}
					autoComplete="off"
					placeholder="John:john@mailinator.com"
				/>
			</div>
			<Button
				color="primary"
				className="submit"
				onClick={() => !state.loading && submit()}
			>
				{state.loading ? (
					<img
						style={{
							width: '15%',
							height: '100%',
						}}
						src={Loading}
						className="loading"
					/>
				) : (
					'Send'
				)}
			</Button>
		</Container>
	);
};

export default SurveySendToEmail;
