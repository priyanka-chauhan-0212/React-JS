import React, { Fragment, useEffect, useState } from 'react';
import { Button, Input, CheckBox, Label } from 'reactstrap';
import { connect } from 'react-redux';
import qs from 'querystring';
import _map from 'lodash/map';

import Toast from '../../container/components/Toast';
// import * as Actions from '../../container/redux/actions';
import FormComponent from '../../container/components/FormValidationHelper';
import Meta from '../../container/utils/meta';
import Preview from './Preview';
import { emailOptions, webOptions } from './MockData';
import {
	EMPTY_STRING,
	SURVEY_METHOD,
	EMPTY_OBJECT,
} from '../../container/constants/commonConstants';
// import { Container, Arrows } from './Styled';

import Loading from '../../container/assets/loading.gif';
import Back from '../../container/assets/Back.svg';

import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowRight,
	faThumbsUp,
	faHandPeace,
	faPrayingHands,
	faGrinHearts,
	faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
AddIconToLibrary([
	faArrowRight,
	faChevronDown,
	faThumbsUp,
	faHandPeace,
	faPrayingHands,
	faGrinHearts,
]);

import { useHistory, useParams } from 'react-router-dom';

import styled from 'styled-components';

import Colors from '../../container/design/Colors';
import { scrollbars } from '../../container/design/Styled';
import axiosInstance from '../../container/utils/axiosInstance';

import { Container, Arrows } from './Styled';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	ErrorToast,
	SuccessToast,
} from '../../container/components/ToastComponent';
import { ROUTE_SURVEY } from '../../router/routes';
import config from '../../container/utils/axiosConfig';
import {
	CREATE_SURVEY_API_PATH,
	GET_SURVEY_BY_ID_API_PATH,
	UPDATE_SURVEY_API_PATH,
} from '../../ApiRoutes/ApiRoutes';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { ExpandMoreIcon } from '@mui/icons-material/AccessAlarm';
// import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const SurveyConfigure = () => {
	const history = useHistory();
	const { surveyType, surveyMethod } = useParams();

	const [state, setState] = useState({
		expanded: '',

		loading: false,
		surveyTypes: EMPTY_STRING,
		title: EMPTY_STRING,
		description: EMPTY_STRING,
		color: '#636363',
		iconColor: '#636363',
		textColor: '#636363',
		transparent: true,
		radius: 1,
		question: EMPTY_STRING,
		language: 'en',
		commentPrompt: EMPTY_STRING,
		from: EMPTY_STRING,
		to: EMPTY_STRING,
		subject: EMPTY_STRING,
		skipComment: 0,
		form: {
			errors: EMPTY_OBJECT,
		},
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setState({
			...state,
			[name]: value,
		});
	};

	const setTransparent = (transparent) => {
		setState({ ...state, transparent });
	};

	const setRadius = (radius) => {
		setState({ ...state, radius });
	};

	const onChangeSkipComment = (event) => {
		const value = event.target.checked;
		setState({ ...state, skipComment: value ? 1 : 0 });
	};

	// const setContent = (id) => {
	// 	console.log('setfunction called', id);
	// };
	const setContent = (id) => {
		let node;

		const {
			surveyTypes,
			title,
			description,
			color,
			iconColor,
			textColor,
			transparent,
			radius,
			question,
			commentPrompt,
			skipComment,
			from,
			to,
			subject,
		} = state;
		const surveyTypeData = surveyTypes || surveyType;

		switch (id) {
			case 101:
				node = (
					<Fragment>
						<label>Brand & product name</label>
						<textarea
							name="title"
							value={title}
							placeholder="On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue?"
							onChange={handleInputChange}
							autoComplete="off"
						/>
						{surveyMethod !== SURVEY_METHOD.EMAIL && (
							<Fragment>
								<label>Description</label>
								<textarea
									name="description"
									value={description}
									placeholder="Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders."
									onChange={handleInputChange}
									autoComplete="off"
								/>
							</Fragment>
						)}
						{surveyTypeData === 'simple' && (
							<Fragment>
								<div className="color-flex">
									<label>Icon color</label>
									<input
										type="color"
										name="iconColor"
										className="color"
										value={iconColor}
										onChange={handleInputChange}
									/>
								</div>
								<div className="color-flex">
									<label>Text color</label>
									<input
										type="color"
										name="textColor"
										className="color shape"
										value={textColor}
										onChange={handleInputChange}
									/>
								</div>
							</Fragment>
						)}
						{surveyTypeData !== 'simple' && (
							<div className="color-flex">
								<label>Brand color</label>
								<input
									type="color"
									name="color"
									className="color"
									value={color}
									onChange={handleInputChange}
								/>
							</div>
						)}
						{surveyTypeData !== 'simple' && (
							<Fragment>
								<label>Button style</label>
								<div className="radio-buttons">
									<div
										style={{
											background:
												transparent &&
												'#344eaa21',
											borderColor:
												transparent &&
												'#344eaa',
										}}
										className="theme-option"
										onClick={() =>
											setTransparent(true)
										}
									>
										<div className="theme-option-label number1">
											10
										</div>
									</div>
									<div
										style={{
											background:
												!transparent &&
												'#344eaa21',
											borderColor:
												!transparent &&
												'#344eaa',
										}}
										className="theme-option"
										onClick={() =>
											setTransparent(false)
										}
									>
										<div className="theme-option-label number2">
											10
										</div>
									</div>
								</div>
								<label>Button shape</label>
								<div className="radio-buttons shape">
									<div
										style={{
											background:
												radius === 1 &&
												'#344eaa21',
											borderColor:
												radius === 1 &&
												'#344eaa',
										}}
										className="theme-option"
										onClick={() => setRadius(1)}
									>
										<div className="shape1" />
									</div>
									<div
										style={{
											background:
												radius === 2 &&
												'#344eaa21',
											borderColor:
												radius === 2 &&
												'#344eaa',
										}}
										className="theme-option"
										onClick={() => setRadius(2)}
									>
										<div className="shape2" />
									</div>
									<div
										style={{
											background:
												radius === 3 &&
												'#344eaa21',
											borderColor:
												radius === 3 &&
												'#344eaa',
										}}
										className="theme-option"
										onClick={() => setRadius(3)}
									>
										<div className="shape3" />
									</div>
								</div>
							</Fragment>
						)}
					</Fragment>
				);
				break;
			case 102:
				node = (
					<Fragment>
						<label>Question</label>
						<textarea
							name="question"
							value={question}
							placeholder="What about The NPS do you like? please comment below"
							onChange={handleInputChange}
							autoComplete="off"
						/>
						<div className="form-check mt-1">
							<Input
								type="checkbox"
								defaultChecked
								id="basic-cb-checked"
								onChange={onChangeSkipComment}
								checked={skipComment}
							/>
							Skip comment prompt
						</div>
					</Fragment>
				);
				break;
			case 104:
				node = (
					<Fragment>
						<label>Comment prompt</label>
						<textarea
							name="commentPrompt"
							value={commentPrompt}
							placeholder="Tell us a bit more about why you chose {{ survey_response.score }}"
							onChange={handleInputChange}
							autoComplete="off"
						/>
						{/* <div className="comment">
							<Input
								type="checkbox"
								id="checkbox2"
								onChange={onChangeSkipComment}
								checked={skipComment}
							/>
							Skip comment prompt
						</div> */}

						<div className="form-check mt-1">
							<Input
								type="checkbox"
								defaultChecked
								id="basic-cb-checked"
								onChange={onChangeSkipComment}
								checked={skipComment}
							/>
							Skip comment prompt
						</div>
					</Fragment>
				);
				break;
			default:
				node = surveyMethod === SURVEY_METHOD.EMAIL && (
					<Fragment>
						<label>From Name</label>
						<input
							type="type"
							name="from"
							className="input"
							value={from}
							onChange={handleInputChange}
						/>
						<label>Reply to email</label>
						<input
							type="type"
							name="to"
							className="input"
							value={to}
							onChange={handleInputChange}
						/>
						<label>Email subject</label>
						<textarea
							name="subject"
							value={subject}
							placeholder="How satisfied were you with some?"
							onChange={handleInputChange}
							autoComplete="off"
						/>
					</Fragment>
				);
				break;
		}
		return node;
	};

	const configure = () => {
		// const {
		// 	createSurvey,
		// 	updateSurvey,
		// 	history,
		// 	match: {
		// 		params: { surveyType, surveyMethod },
		// 	},
		// } = props;
		const {
			surveyTypes,
			title,
			description,
			color,
			iconColor,
			textColor,
			question,
			transparent,
			radius,
			language,
			skipComment,
			from,
			to,
			subject,
		} = state;
		if (surveyMethod === SURVEY_METHOD.EMAIL) {
			if (!from) {
				Toast({
					message: `Please enter from name`,
					type: 'error',
				});
				return;
			}
			if (!subject) {
				Toast({
					message: `Please enter subject name`,
					type: 'error',
				});
				return;
			}
		}
		if (parseFloat(surveyType)) {
			console.log('update survey =-====', parseFloat(surveyType));
			const newData = {
				survey_method: surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0,
				survey_type: surveyTypes,
				// user_id: 1,
				from_email: from,
				reply_to: to,
				subject,
				brand_title: title,
				description: description || 'Somethings',
				question:
					question ||
					`How likely are you to recommend ${title} to a friend?`,
				brand_color: color,
				icon_color: iconColor,
				text_color: textColor,
				button_style: transparent ? 'fill' : 'bordered',
				button_shape:
					radius === 1
						? 'border-radius'
						: radius === 2
						? 'sqaure'
						: 'round',
				lang: language,
				skip_comment: skipComment ? 1 : 0,
			};
			if (title) {
				setState({
					loading: true,
				});

				console.log('check log ----', {
					surveyMethod,
					surveyTypes,
				});

				let updateData = {
					// user_id: 1,
					survey_id: parseFloat(surveyType),

					survey_method:
						surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0,
					survey_type: surveyTypes,
					// user_id: 1,
					from_email: from,
					reply_to: to,
					subject,
					brand_title: title,
					description: description || 'Somethings',
					question:
						question ||
						`How likely are you to recommend ${title} to a friend?`,
					brand_color: color,
					icon_color: iconColor,
					text_color: textColor,
					button_style: transparent ? 'fill' : 'bordered',
					button_shape:
						radius === 1
							? 'border-radius'
							: radius === 2
							? 'sqaure'
							: 'round',
					lang: language,
					skip_comment: skipComment ? 1 : 0,
				};

				axiosInstance
					.post(UPDATE_SURVEY_API_PATH, updateData)
					.then((res) => {
						setState({ ...state, loading: false });

						if (res.data.success === 1) {
							toast.success(
								<SuccessToast
									message={res.data.message}
								/>
							);
							history.push(ROUTE_SURVEY);
						} else {
							toast.error(
								<ErrorToast
									message={res.data.message}
								/>
							);
						}
					});

				// updateSurvey(
				// 	parseFloat(surveyType),
				// 	qs.stringify(newData),
				// 	history,
				// 	surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0
				// ).then(() => {
				// 	setState({
				// 		loading: false,
				// 	});
				// });
			} else {
				toast.error(
					<ErrorToast
						message={"Brand/product name can't be blank"}
					/>
				);

				// Toast({
				// 	message: `Brand/product name can't be blank`,
				// 	type: 'error',
				// });
				return;
			}
		} else {
			const newData = {
				survey_method: surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0,
				survey_type: surveyType,

				from_email: from,
				reply_to: to,
				subject,
				brand_title: title,
				description: description || 'Somethings',
				question:
					question ||
					`How likely are you to recommend ${title} to a friend?`,
				brand_color: color,
				icon_color: iconColor,
				text_color: textColor,
				button_style: transparent ? 'fill' : 'bordered',
				button_shape:
					radius === 1
						? 'border-radius'
						: radius === 2
						? 'sqaure'
						: 'round',
				lang: language,
				skip_comment: skipComment ? 1 : 0,
			};
			if (title) {
				// console.log('data', { newData, history, surveyMethod });

				axiosInstance
					.post(CREATE_SURVEY_API_PATH, newData)
					.then((res) => {
						console.log(
							'rurvey craete api response',
							res.data
						);

						if (res.data.success == 1) {
							history.push(
								'/get-snippet/' + res.data.data.id
							);
						}
					});
				// setState({
				// 	loading: true,
				// });
				// createSurvey(
				// 	qs.stringify(newData),
				// 	history,
				// 	surveyMethod
				// ).then(() => {
				// 	setState({
				// 		loading: false,
				// 	});
				// });
			} else {
				toast.error(
					<ErrorToast
						message={"Brand/product name can't be blank"}
					/>
				);
				return;
			}
		}
	};

	const {
		loading,
		title,
		description,
		color,
		iconColor,
		textColor,
		radius,
		transparent,
		question,
		surveyTypes,
		from,
		to,
		skipComment,
		subject,
	} = state;
	const menusList = _map(
		surveyMethod === SURVEY_METHOD.EMAIL ? emailOptions : webOptions,
		(list, index) => {
			return (
				<Accordion
					expanded={state.expanded === list.id}
					onChange={() =>
						state.expanded === list.id
							? setState({
									...state,
									expanded: '',
							  })
							: setState({
									...state,
									expanded: list.id,
							  })
					}
				>
					<AccordionSummary
						// style={{
						// 	borderBottom: '1px solid black',
						// }}
						expandIcon={<ExpandMoreIcon />}
						aria-controls="panel1a-content"
						id="panel1a-header"
					>
						<b>{list.title}</b>
					</AccordionSummary>
					<AccordionDetails>
						{setContent(list && list.id)}
					</AccordionDetails>
				</Accordion>

				// <div className="card" key={index}>
				// 	<div
				// 		className="card-header"
				// 		id={`heading${list.id}`}
				// 		data-toggle="collapse"
				// 		data-target={`#collapse${list.id}`}
				// 		aria-expanded={false}
				// 		aria-controls={`collapse${list.id}`}
				// 	>
				// 		<div className="title">{list.title}</div>
				// 		<Arrows
				// 			style={{
				// 				position: 'absolute',
				// 				top: '17px',
				// 				right: 0,
				// 				fontSize: '12px',
				// 				color: '#183b56',
				// 			}}
				// 		>
				// 			<FontAwesomeIcon
				// 				icon={['fas', 'chevron-circle-down']}
				// 			/>
				// 			<FontAwesomeIcon
				// 				icon={['fas', 'chevron-circle-up']}
				// 			/>
				// 		</Arrows>
				// 	</div>
				// 	<div
				// 		id={`collapse${list.id}`}
				// 		className="collapse show"
				// 		aria-labelledby={`heading${list.id}`}
				// 		data-parent="#accordionSurvey"
				// 	>
				// 		{list.id && setContent(list && list.id)}
				// 		{/* {() => setContent(list && list.id)} */}
				// 	</div>
				// </div>
			);
		}
	);

	useEffect(() => {
		let postData = {
			// user_id: 1,
			survey_id: surveyType && surveyType,
		};
		// console.log('survey configure--', { surveyType, surveyMethod });
		axiosInstance
			.post(GET_SURVEY_BY_ID_API_PATH, postData)
			.then((res) => {
				let survey = res.data && res.data.data;
				// console.log('get survey by id', survey);
				if (survey) {
					setState({
						...state,
						surveyTypes: survey.survey_type,
						from: survey.from_email,
						to: survey.reply_to,
						subject: survey.subject,
						title: survey.brand_title,
						description: survey.description,
						color: survey.brand_color
							? survey.brand_color
							: '#636363',
						iconColor: survey.icon_color
							? survey.icon_color
							: '#636363',
						textColor: survey.text_color
							? survey.text_color
							: '#636363',
						transparent:
							survey.button_style === 'fill'
								? true
								: false,
						radius:
							survey.button_shape === 'border-radius'
								? 1
								: survey.button_shape === 'sqaure'
								? 2
								: 3,
						question: survey.question,
						language: survey.lang,
						skipComment:
							parseFloat(survey.skip_comment) === 1
								? true
								: false,
					});
				}
			});
	}, []);
	console.log('skipComment', skipComment);
	return (
		<Container
			className="container"
			color={color}
			transparent={transparent}
		>
			<Meta title="Dashboard" description="" />
			<img
				src={Back}
				className="back-img"
				onClick={() => history.goBack()}
			/>
			<h2>Your Net Promoter Score Survey Preview</h2>
			<div className="section">
				<div className="custome">
					<div className="custome-title">
						Customize appearance
					</div>
					<div className="accordion" id="accordionSurvey">
						{menusList}
					</div>

					<div className="align">
						<Button
							color="primary"
							className="configure"
							onClick={() => !loading && configure()}
						>
							{loading ? (
								<img
									style={{
										width: '15%',
										height: '100%',
									}}
									src={Loading}
									className="loading"
								/>
							) : (
								'Next: Configure'
							)}
						</Button>
					</div>
				</div>
				<div className="cards">
					<Preview
						title={title}
						description={description}
						color={color}
						iconColor={iconColor}
						textColor={textColor}
						transparent={transparent}
						radius={radius}
						question={question}
						surveyType={
							surveyTypes ? surveyTypes : surveyType
						}
						skip_comment={skipComment}
						surveyMethod={surveyMethod}
						from={from}
						to={to}
						subject={subject}
					/>
				</div>
			</div>
		</Container>
	);
};

export default SurveyConfigure;

// import React, { Fragment, useState } from 'react';
// import { Button, Input } from 'reactstrap';
// import { connect } from 'react-redux';
// import qs from 'querystring';
// import _map from 'lodash/map';

// import Toast from '../../container/components/Toast';
// // import * as Actions from '../../container/redux/actions';
// import FormComponent from '../../container/components/FormValidationHelper';
// import Meta from '../../container/utils/meta';
// import Preview from './Preview';
// import { emailOptions, webOptions } from './MockData';
// import {
// 	EMPTY_STRING,
// 	SURVEY_METHOD,
// 	EMPTY_OBJECT,
// } from '../../container/constants/commonConstants';
// // import { Container, Arrows } from './Styled';

// import Loading from '../../container/assets/loading.gif';
// import Back from '../../container/assets/Back.svg';

// import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// 	faArrowRight,
// 	faThumbsUp,
// 	faHandPeace,
// 	faPrayingHands,
// 	faGrinHearts,
// 	faChevronDown,
// } from '@fortawesome/free-solid-svg-icons';
// AddIconToLibrary([
// 	faArrowRight,
// 	faChevronDown,
// 	faThumbsUp,
// 	faHandPeace,
// 	faPrayingHands,
// 	faGrinHearts,
// ]);

// import { useHistory, useParams } from 'react-router-dom';

// import styled from 'styled-components';

// import Colors from '../../container/design/Colors';
// import { scrollbars } from '../../container/design/Styled';
// import axiosInstance from '../../container/utils/axiosInstance';

// import { Container, Arrows } from './Styled';

// const SurveyConfigure = () => {
// 	const history = useHistory();
// 	const { surveyType, surveyMethod } = useParams();

// 	const [state, setState] = useState({
// 		loading: false,
// 		surveyTypes: EMPTY_STRING,
// 		title: EMPTY_STRING,
// 		description: EMPTY_STRING,
// 		color: '#636363',
// 		iconColor: '#636363',
// 		textColor: '#636363',
// 		transparent: true,
// 		radius: 1,
// 		question: EMPTY_STRING,
// 		language: 'en',
// 		commentPrompt: EMPTY_STRING,
// 		from: EMPTY_STRING,
// 		to: EMPTY_STRING,
// 		subject: EMPTY_STRING,
// 		skipComment: 0,
// 		form: {
// 			errors: EMPTY_OBJECT,
// 		},
// 	});

// 	const handleInputChange = (e) => {
// 		const { name, value } = e.target;
// 		setState({
// 			...state,
// 			[name]: value,
// 		});
// 	};

// 	const setTransparent = (transparent) => {
// 		setState({ ...state, transparent });
// 	};

// 	const setRadius = (radius) => {
// 		setState({ ...state, radius });
// 	};

// 	const onChangeSkipComment = (event) => {
// 		const value = event.target.checked;
// 		setState({ ...state, skipComment: value ? 1 : 0 });
// 	};

// 	// const setContent = (id) => {
// 	// 	console.log('setfunction called', id);
// 	// };
// 	const setContent = (id) => {
// 		let node;

// 		const {
// 			surveyTypes,
// 			title,
// 			description,
// 			color,
// 			iconColor,
// 			textColor,
// 			transparent,
// 			radius,
// 			question,
// 			commentPrompt,
// 			skipComment,
// 			from,
// 			to,
// 			subject,
// 		} = state;
// 		const surveyTypeData = state.surveyTypes || state.surveyType;
// 		switch (id) {
// 			case 101:
// 				node = (
// 					<Fragment>
// 						<label>Brand & product name</label>
// 						<textarea
// 							name="title"
// 							value={title}
// 							placeholder="On a scale between 1-10, how likely are you to recommend The NPS to a friend or collegue?"
// 							onChange={handleInputChange}
// 							autoComplete="off"
// 						/>
// 						{surveyMethod !== SURVEY_METHOD.EMAIL && (
// 							<Fragment>
// 								<label>Description</label>
// 								<textarea
// 									name="description"
// 									value={description}
// 									placeholder="Your feedback is important to us. The NPS user this feedback to improve our service and provide a richer experience for our account holders."
// 									onChange={handleInputChange}
// 									autoComplete="off"
// 								/>
// 							</Fragment>
// 						)}
// 						{surveyTypeData === 'simple' && (
// 							<Fragment>
// 								<div className="color-flex">
// 									<label>Icon color</label>
// 									<input
// 										type="color"
// 										name="iconColor"
// 										className="color"
// 										value={iconColor}
// 										onChange={handleInputChange}
// 									/>
// 								</div>
// 								<div className="color-flex">
// 									<label>Text color</label>
// 									<input
// 										type="color"
// 										name="textColor"
// 										className="color shape"
// 										value={textColor}
// 										onChange={handleInputChange}
// 									/>
// 								</div>
// 							</Fragment>
// 						)}
// 						{surveyTypeData !== 'simple' && (
// 							<div className="color-flex">
// 								<label>Brand color</label>
// 								<input
// 									type="color"
// 									name="color"
// 									className="color"
// 									value={color}
// 									onChange={handleInputChange}
// 								/>
// 							</div>
// 						)}
// 						{surveyTypeData !== 'simple' && (
// 							<Fragment>
// 								<label>Button style</label>
// 								<div className="radio-buttons">
// 									<div
// 										style={{
// 											background:
// 												transparent &&
// 												'#344eaa21',
// 											borderColor:
// 												transparent &&
// 												'#344eaa',
// 										}}
// 										className="theme-option"
// 										onClick={() =>
// 											setTransparent(true)
// 										}
// 									>
// 										<div className="theme-option-label number1">
// 											10
// 										</div>
// 									</div>
// 									<div
// 										style={{
// 											background:
// 												!transparent &&
// 												'#344eaa21',
// 											borderColor:
// 												!transparent &&
// 												'#344eaa',
// 										}}
// 										className="theme-option"
// 										onClick={() =>
// 											setTransparent(false)
// 										}
// 									>
// 										<div className="theme-option-label number2">
// 											10
// 										</div>
// 									</div>
// 								</div>
// 								<label>Button shape</label>
// 								<div className="radio-buttons shape">
// 									<div
// 										style={{
// 											background:
// 												radius === 1 &&
// 												'#344eaa21',
// 											borderColor:
// 												radius === 1 &&
// 												'#344eaa',
// 										}}
// 										className="theme-option"
// 										onClick={() => setRadius(1)}
// 									>
// 										<div className="shape1" />
// 									</div>
// 									<div
// 										style={{
// 											background:
// 												radius === 2 &&
// 												'#344eaa21',
// 											borderColor:
// 												radius === 2 &&
// 												'#344eaa',
// 										}}
// 										className="theme-option"
// 										onClick={() => setRadius(2)}
// 									>
// 										<div className="shape2" />
// 									</div>
// 									<div
// 										style={{
// 											background:
// 												radius === 3 &&
// 												'#344eaa21',
// 											borderColor:
// 												radius === 3 &&
// 												'#344eaa',
// 										}}
// 										className="theme-option"
// 										onClick={() => setRadius(3)}
// 									>
// 										<div className="shape3" />
// 									</div>
// 								</div>
// 							</Fragment>
// 						)}
// 					</Fragment>
// 				);
// 				break;
// 			case 102:
// 				node = (
// 					<Fragment>
// 						<label>Question</label>
// 						<textarea
// 							name="question"
// 							value={question}
// 							placeholder="What about The NPS do you like? please comment below"
// 							onChange={handleInputChange}
// 							autoComplete="off"
// 						/>
// 					</Fragment>
// 				);
// 				break;
// 			case 104:
// 				node = (
// 					<Fragment>
// 						<label>Comment prompt</label>
// 						<textarea
// 							name="commentPrompt"
// 							value={commentPrompt}
// 							placeholder="Tell us a bit more about why you chose {{ survey_response.score }}"
// 							onChange={handleInputChange}
// 							autoComplete="off"
// 						/>
// 						<div className="comment">
// 							<Input
// 								type="checkbox"
// 								onChange={onChangeSkipComment}
// 								checked={skipComment}
// 							/>
// 							Skip comment prompt
// 						</div>
// 					</Fragment>
// 				);
// 				break;
// 			default:
// 				node = surveyMethod === SURVEY_METHOD.EMAIL && (
// 					<Fragment>
// 						<label>From Name</label>
// 						<input
// 							type="type"
// 							name="from"
// 							className="input"
// 							value={from}
// 							onChange={handleInputChange}
// 						/>
// 						<label>Reply to email</label>
// 						<input
// 							type="type"
// 							name="to"
// 							className="input"
// 							value={to}
// 							onChange={handleInputChange}
// 						/>
// 						<label>Email subject</label>
// 						<textarea
// 							name="subject"
// 							value={subject}
// 							placeholder="How satisfied were you with some?"
// 							onChange={handleInputChange}
// 							autoComplete="off"
// 						/>
// 					</Fragment>
// 				);
// 				break;
// 		}
// 		return node;
// 	};

// 	const configure = () => {
// 		// const {
// 		// 	createSurvey,
// 		// 	updateSurvey,
// 		// 	history,
// 		// 	match: {
// 		// 		params: { surveyType, surveyMethod },
// 		// 	},
// 		// } = props;
// 		const {
// 			surveyTypes,
// 			title,
// 			description,
// 			color,
// 			iconColor,
// 			textColor,
// 			question,
// 			transparent,
// 			radius,
// 			language,
// 			skipComment,
// 			from,
// 			to,
// 			subject,
// 		} = state;
// 		if (surveyMethod === SURVEY_METHOD.EMAIL) {
// 			if (!from) {
// 				Toast({
// 					message: `Please enter from name`,
// 					type: 'error',
// 				});
// 				return;
// 			}
// 			if (!subject) {
// 				Toast({
// 					message: `Please enter subject name`,
// 					type: 'error',
// 				});
// 				return;
// 			}
// 		}
// 		if (parseFloat(surveyType)) {
// 			const newData = {
// 				survey_method: surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0,
// 				survey_type: surveyTypes,
// 				user_id: 49,
// 				from_email: from,
// 				reply_to: to,
// 				subject,
// 				brand_title: title,
// 				description: description || 'Somethings',
// 				question:
// 					question ||
// 					`How likely are you to recommend ${title} to a friend?`,
// 				brand_color: color,
// 				icon_color: iconColor,
// 				text_color: textColor,
// 				button_style: transparent ? 'fill' : 'bordered',
// 				button_shape:
// 					radius === 1
// 						? 'border-radius'
// 						: radius === 2
// 						? 'sqaure'
// 						: 'round',
// 				lang: language,
// 				skip_comment: skipComment ? 1 : 0,
// 			};
// 			if (title) {
// 				setState({
// 					loading: true,
// 				});
// 				updateSurvey(
// 					parseFloat(surveyType),
// 					qs.stringify(newData),
// 					history,
// 					surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0
// 				).then(() => {
// 					setState({
// 						loading: false,
// 					});
// 				});
// 			} else {
// 				Toast({
// 					message: `Brand/product name can't be blank`,
// 					type: 'error',
// 				});
// 				return;
// 			}
// 		} else {
// 			const newData = {
// 				survey_method: surveyMethod === SURVEY_METHOD.EMAIL ? 1 : 0,
// 				survey_type: surveyType,
// 				user_id: 49,
// 				from_email: from,
// 				reply_to: to,
// 				subject,
// 				brand_title: title,
// 				description: description || 'Somethings',
// 				question:
// 					question ||
// 					`How likely are you to recommend ${title} to a friend?`,
// 				brand_color: color,
// 				icon_color: iconColor,
// 				text_color: textColor,
// 				button_style: transparent ? 'fill' : 'bordered',
// 				button_shape:
// 					radius === 1
// 						? 'border-radius'
// 						: radius === 2
// 						? 'sqaure'
// 						: 'round',
// 				lang: language,
// 				skip_comment: skipComment ? 1 : 0,
// 			};
// 			if (title) {
// 				// console.log('data', { newData, history, surveyMethod });

// 				axiosInstance
// 					.post(
// 						'http://localhost:8000/api/v1/createSurvey',
// 						newData
// 					)
// 					.then((res) => {
// 						console.log(
// 							'rurvey craete api response',
// 							res.data
// 						);

// 						if (res.data.success == 1) {
// 							history.push(
// 								'/get-snippet/' + res.data.data.id
// 							);
// 						}
// 					});
// 				// setState({
// 				// 	loading: true,
// 				// });
// 				// createSurvey(
// 				// 	qs.stringify(newData),
// 				// 	history,
// 				// 	surveyMethod
// 				// ).then(() => {
// 				// 	setState({
// 				// 		loading: false,
// 				// 	});
// 				// });
// 			} else {
// 				Toast({
// 					message: `Brand/product name can't be blank.`,
// 					type: 'error',
// 				});
// 				return;
// 			}
// 		}
// 	};

// 	const {
// 		loading,
// 		title,
// 		description,
// 		color,
// 		iconColor,
// 		textColor,
// 		radius,
// 		transparent,
// 		question,
// 		surveyTypes,
// 		from,
// 		to,
// 		subject,
// 	} = state;
// 	const menusList = _map(
// 		surveyMethod === SURVEY_METHOD.EMAIL ? emailOptions : webOptions,
// 		(list, index) => {
// 			return (
// 				<div className="card" key={index}>
// 					<div
// 						className="card-header"
// 						id={`heading${list.id}`}
// 						data-toggle="collapse"
// 						data-target={`#collapse${list.id}`}
// 						aria-expanded={false}
// 						aria-controls={`collapse${list.id}`}
// 					>
// 						<div className="title">{list.title}</div>
// 						<Arrows
// 							style={{
// 								position: 'absolute',
// 								top: '17px',
// 								right: 0,
// 								fontSize: '12px',
// 								color: '#183b56',
// 							}}
// 						>
// 							<FontAwesomeIcon
// 								icon={['fas', 'chevron-circle-down']}
// 							/>
// 							<FontAwesomeIcon
// 								icon={['fas', 'chevron-circle-up']}
// 							/>
// 						</Arrows>
// 					</div>
// 					<div
// 						id={`collapse${list.id}`}
// 						className="collapse show"
// 						aria-labelledby={`heading${list.id}`}
// 						data-parent="#accordionSurvey"
// 					>
// 						{list.id && setContent(list && list.id)}
// 						{/* {() => setContent(list && list.id)} */}
// 					</div>
// 				</div>
// 			);
// 		}
// 	);

// 	return (
// 		<Container
// 			className="container"
// 			color={color}
// 			transparent={transparent}
// 		>
// 			<Meta title="Dashboard" description="" />
// 			<img
// 				src={Back}
// 				className="back-img"
// 				onClick={() => history.goBack()}
// 			/>
// 			<h2>Your Net Promoter Score Survey Preview 123</h2>
// 			<div className="section">
// 				<div className="custome">
// 					<div className="custome-title">
// 						Customize appearance
// 					</div>
// 					<div className="accordion" id="accordionSurvey">
// 						{menusList}
// 					</div>
// 					<div className="align">
// 						<Button
// 							color="primary"
// 							className="configure"
// 							onClick={() => !loading && configure()}
// 						>
// 							{loading ? (
// 								<img
// 									src={Loading}
// 									className="loading"
// 								/>
// 							) : (
// 								'Next: Configure'
// 							)}
// 						</Button>
// 					</div>
// 				</div>
// 				<div className="cards">
// 					<Preview
// 						title={title}
// 						description={description}
// 						color={color}
// 						iconColor={iconColor}
// 						textColor={textColor}
// 						transparent={transparent}
// 						radius={radius}
// 						question={question}
// 						surveyType={
// 							surveyTypes ? surveyTypes : surveyType
// 						}
// 						surveyMethod={surveyMethod}
// 						from={from}
// 						to={to}
// 						subject={subject}
// 					/>
// 				</div>
// 			</div>
// 		</Container>
// 	);
// };

// export default SurveyConfigure;
