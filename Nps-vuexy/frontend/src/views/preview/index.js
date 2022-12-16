import React, { PureComponent, Fragment, useState } from 'react';
import { Button, Row, Col } from 'reactstrap';
import _map from 'lodash/map';

import Meta from '../../container/utils/meta';
import { SURVEY_METHOD } from '../../container/constants/commonConstants';
import { ROUTE_ON_BOARDING } from '../../router/routes';
import { Container } from './Styled';

import Check from '../../container/assets/check.svg';
import Uncheck from '../../container/assets/uncheck.svg';
import Back from '../../container/assets/Back.svg';

import AddIconToLibrary from '../../container/utils/fontAwesomeIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPrayingHands,
	faThumbsUp,
	faHandPeace,
	faGrinHearts,
} from '@fortawesome/free-solid-svg-icons';
AddIconToLibrary([faPrayingHands, faThumbsUp, faHandPeace, faGrinHearts]);
import { useHistory, useParams } from 'react-router-dom';
const Preview = () => {
	const history = useHistory();
	const { surveyMethod } = useParams();

	const [state, setState] = useState({
		active: 1,
		activeEmoji: 1,
	});

	const setNewActive = (active) => {
		setState({ ...state, active });
	};

	const setNewEmoji = (activeEmoji) => {
		setState({ ...state, activeEmoji });
	};

	const redirect = () => {
		let route = ROUTE_ON_BOARDING;
		switch (state.active) {
			case 1:
				history.push({
					pathname: route
						.replace(':surveyMethod', surveyMethod)
						.replace(':surveyType', 'standard'),
				});
				break;
			case 2:
				history.push({
					pathname: route
						.replace(':surveyMethod', surveyMethod)
						.replace(':surveyType', 'simple'),
				});
				break;
			default:
				history.push({
					pathname: route
						.replace(':surveyMethod', surveyMethod)
						.replace(':surveyType', 'modern'),
				});
				break;
		}
	};
	console.log('state isguyguy', state.active);
	return (
		<Container className="container">
			<Meta title="Row Data" description="" />
			<img
				src={Back}
				className="back-img"
				onClick={() => history.goBack()}
			/>
			<div className="title">
				Your Net Promoter Score Survey Preview
			</div>
			<div className="flex">
				<div className="view-card">
					<div className="name">
						On a scale between 1-10, how likely are you to
						recommend The NPS to a friend or collegue?
					</div>
					<div className="description">
						Your feedback is important to us. The NPS user
						this feedback to improve our service and provide a
						richer experience for our account holders.
					</div>
					{state.active === 1 && (
						<Fragment>
							<div className="rating">
								<div className="number color0">0</div>
								<div className="number color1">1</div>
								<div className="number color2">2</div>
								<div className="number color3">3</div>
								<div className="number color4">4</div>
								<div className="number color5">5</div>
								<div className="number color6">6</div>
								<div className="number color7">7</div>
								<div className="number color8">8</div>
								<div className="number color9">9</div>
								<div className="number color10">10</div>
							</div>
							<div className="like">
								<div className="not-likely">
									Not Likely
								</div>
								<div className="not-likely">
									Very Likely
								</div>
							</div>
						</Fragment>
					)}
					{state.active === 2 && (
						<Row>
							<Col onClick={() => setNewEmoji(1)}>
								<div
									className={
										state.activeEmoji === 1
											? 'emoji-card active'
											: 'emoji-card'
									}
								>
									<FontAwesomeIcon
										icon={[
											'fas',
											'praying-hands',
										]}
									/>
									<div className="emoji-text">
										Enough
									</div>
								</div>
							</Col>
							<Col onClick={() => setNewEmoji(2)}>
								<div
									className={
										state.activeEmoji === 2
											? 'emoji-card active'
											: 'emoji-card'
									}
								>
									<FontAwesomeIcon
										icon={['fas', 'thumbs-up']}
									/>
									<div className="emoji-text">
										Great
									</div>
								</div>
							</Col>
							<Col onClick={() => setNewEmoji(3)}>
								<div
									className={
										state.activeEmoji === 3
											? 'emoji-card active'
											: 'emoji-card'
									}
								>
									<FontAwesomeIcon
										icon={['fas', 'hand-peace']}
									/>
									<div className="emoji-text">
										Good
									</div>
								</div>
							</Col>
							<Col onClick={() => setNewEmoji(4)}>
								<div
									className={
										state.activeEmoji === 4
											? 'emoji-card active'
											: 'emoji-card'
									}
								>
									<FontAwesomeIcon
										icon={['fas', 'grin-hearts']}
									/>
									<div className="emoji-text">
										I love it
									</div>
								</div>
							</Col>
						</Row>
					)}
					{state.active === 3 && (
						<Fragment>
							<div className="rating-m">
								<div className="number color01">0</div>
								<div className="line" />
								<div className="line" />
								<div className="line" />
								<div className="number color43">4</div>
								<div className="line" />
								<div className="line" />
								<div className="line" />
								<div className="line" />
								<div className="line" />
								<div className="number color100">
									10
								</div>
							</div>
							<div className="dropdown-divider new" />
							<div className="like">
								<div className="not-likely">
									Not Likely
								</div>
								<div className="not-likely">
									Very Likely
								</div>
							</div>
						</Fragment>
					)}
					{surveyMethod !== SURVEY_METHOD.EMAIL ? (
						<Fragment>
							<div className="dropdown-divider" />
							<div className="comment-text">
								What about The NPS do you like?
								<br />
								please comment below.
							</div>
							<div className="box" />
							<div className="buttons">
								<Button
									color="primary"
									onClick={redirect}
									className="send"
								>
									Send feedback
								</Button>
							</div>
						</Fragment>
					) : (
						<div className="divider" />
					)}
				</div>
				<div className="category-card">
					<div className="name">Update Your Survey's design</div>
					<div className="select">
						<div
							className={
								state.active === 1
									? 'survey active'
									: 'survey'
							}
							onClick={() => setNewActive(1)}
						>
							<img
								src={
									state.active === 1
										? Check
										: Uncheck
								}
								className="check-box"
							/>
							<div className="s-box">Standard Survey</div>
						</div>
						{surveyMethod !== SURVEY_METHOD.EMAIL && (
							<div
								className={
									state.active === 2
										? 'survey active'
										: 'survey'
								}
								onClick={() => setNewActive(2)}
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
									Simple Emojis 1-4
								</div>
							</div>
						)}
						{surveyMethod !== SURVEY_METHOD.EMAIL && (
							<div
								className={
									state.active === 3
										? 'survey active'
										: 'survey'
								}
								onClick={() => setNewActive(3)}
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
									Modern Survey 1-10
								</div>
							</div>
						)}
					</div>
					<Button
						color="primary"
						style={{ cursor: 'pointer' }}
						onClick={redirect}
						className="customize"
					>
						Customize
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default Preview;
