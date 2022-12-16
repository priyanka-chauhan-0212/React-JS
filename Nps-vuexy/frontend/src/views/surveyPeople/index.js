import React, { PureComponent, useState } from 'react';
import { Button, Row, Col } from 'reactstrap';

import { ROUTE_PREVIEW } from '../../router/routes';
import Meta from '../../container/utils/meta';
import { Container } from './Styled';

import Back from '../../container/assets/Back.svg';
import Email from '../../container/assets/email.jpg';
import Web from '../../container/assets/web.png';

import { useHistory } from 'react-router-dom';
const SurveyPeople = () => {
	const [state, setState] = useState({});
	const history = useHistory();
	const redirect = (data) => {
		let route = ROUTE_PREVIEW;
		history.push({
			pathname: route.replace(':surveyMethod', data),
		});
	};

	return (
		<Container className="container">
			<Meta title="Survey People" description="" />
			<img
				src={Back}
				className="back-img"
				onClick={() => history.goBack()}
			/>
			<div className="title">How would you like to survey people?</div>
			<Row>
				{/* <Col>
					<div
						className="card"
						onClick={() => redirect('email')}
					>
						<img src={Email} />
						<div className="name">Email</div>
						<div
							className=""
							style={{
								fontSize: '18px',
								fontWeight: 500,
								marginBottom: '20px',
								textAlign: 'center',
							}}
						>
							Send surveys to your
							<br />
							customers using email.
						</div>
						<Button color="primary">Survey people</Button>
					</div>
				</Col> */}
				<Col>
					<div className="card" onClick={() => redirect('web')}>
						<img src={Web} />
						<div className="name">Web</div>
						<div
							className=""
							style={{
								fontSize: '18px',
								fontWeight: 500,
								marginBottom: '20px',
								textAlign: 'center',
							}}
						>
							Survey your customers
							<br />
							directly on your website.
						</div>
						<Button color="primary">Set up</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SurveyPeople;
