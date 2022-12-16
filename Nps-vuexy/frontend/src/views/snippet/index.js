import React, { PureComponent, useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Tooltip from '../../container/components/Tooltip';
// import * as Actions from '../../container/redux/actions';
import { ROUTE_SURVEY } from '../../router/routes';
import Meta from '../../container/utils/meta';
import { Container } from './Styled';

import CopyIcon from '../../container/assets/copy-icon.svg';
import Back from '../../container/assets/Back.svg';
import { useParams, useHistory } from 'react-router-dom';
import Loading from '../../../src/@core/components/spinner/Fallback-spinner';
import axiosInstance from '../../container/utils/axiosInstance';
import { GET_SURVEY_SNIPPET_API_PATH } from '../../ApiRoutes/ApiRoutes';

const Snippet = () => {
	const { surveyId } = useParams();
	const [state, setState] = useState({
		snippet: '',
		snippetLoading: false,
	});

	const history = useHistory();

	useEffect(() => {
		setState({
			...state,
			snippetLoading: true,
		});
		console.log('id of survey', surveyId);
		if (surveyId === '' || surveyId == undefined || surveyId == null) {
			setState({
				...state,
				snippetLoading: false,
			});
		} else {
			axiosInstance
				.get(GET_SURVEY_SNIPPET_API_PATH + surveyId)
				.then((res) => {
					console.log('local get snippet', res.data);
					setState({
						...state,
						snippet: res.data.data && res.data.data,
						snippetLoading: false,
					});
				})
				.catch((e) => {
					setState({
						...state,

						snippetLoading: false,
					});
				});
		}
	}, []);

	const copyTextToClipboard = (TextToCopy) => {
		let TempText = document.createElement('input');
		TempText.value = TextToCopy;
		document.body.appendChild(TempText);
		TempText.select();
		document.execCommand('copy');
		document.body.removeChild(TempText);
	};

	const goBack = () => {
		history.push(ROUTE_SURVEY);
	};

	return (
		<>
			{state.snippetLoading ? (
				<Loading />
			) : (
				<Container className="container">
					<Meta title="Snippet" description="" />
					<img
						src={Back}
						className="back-img"
						onClick={goBack}
					/>
					<div className="title">Snippet</div>
					<div className="wrapper">
						<Tooltip
							className="copy-img"
							content={
								<img
									src={CopyIcon}
									onClick={() =>
										copyTextToClipboard(
											state.snippet.html
										)
									}
								/>
							}
						/>
						{state.snippet && (
							<pre
								style={{
									background: 'rgb(40, 44, 52)',
									fontSize: '1em',
									padding: '10px',
								}}
							>
								{state.snippet.html}
							</pre>
						)}
					</div>
				</Container>
			)}
		</>
	);
};

export default Snippet;
