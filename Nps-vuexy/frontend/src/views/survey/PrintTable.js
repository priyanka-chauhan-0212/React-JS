import React, { PureComponent, Fragment } from 'react';
import { Table, Button, Col, Row } from 'reactstrap';
import _map from 'lodash/map';
import moment from 'moment';

class ComponentToPrint extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		console.log('table print props', this.props.data);

		const list = this.props.data && this.props.data;
		const heading = this.props.heading && this.props.heading;
		const listing =
			list &&
			_map(list, (list, index) => (
				<tr key={index}>
					<td
						style={{
							border: '1px solid black',
							textAlign: 'center',
						}}
						className="date"
					>
						{index + 1}
					</td>
					<td
						style={{ border: '1px solid black' }}
						className="date"
					>
						{moment(list.created_at).format('L')}
					</td>
					<td
						style={{ border: '1px solid black' }}
						className="survey-method"
					>
						{list.survey_method === 1 ? 'Email' : 'Web'}
					</td>
					<td
						style={{ border: '1px solid black' }}
						className="brand-title"
					>
						{list.brand_title}
					</td>
					<td
						style={{ border: '1px solid black' }}
						className="description"
					>
						{list.description}
					</td>
					<td
						style={{ border: '1px solid black' }}
						className="question"
					>
						{list.question}
					</td>
				</tr>
			));

		return (
			<div>
				<h2
					style={{
						color: 'black',
						textAlign: 'center',
						fontSize: '24px',
					}}
				>
					{heading && heading}
				</h2>

				<Table
					style={{
						border: '1px solid black',
						// width: '100% !important',
					}}
				>
					<thead>
						<tr>
							<th
								style={{ border: '1px solid black' }}
								className="date"
							>
								Sr. No
							</th>
							<th
								style={{ border: '1px solid black' }}
								className="date"
							>
								Date
							</th>
							<th
								style={{ border: '1px solid black' }}
								className="survey-method"
							>
								Survey Method
							</th>
							<th
								style={{ border: '1px solid black' }}
								className="brand-title"
							>
								Brand
							</th>
							<th
								style={{ border: '1px solid black' }}
								className="description"
							>
								Description
							</th>
							<th
								style={{ border: '1px solid black' }}
								className="question"
							>
								Question
							</th>
						</tr>
					</thead>
					<tbody>{listing}</tbody>
				</Table>
			</div>
		);
	}
}

export default ComponentToPrint;

// class ComponentToPrint extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {};
// 	}

// 	render() {
// 		console.log('table print props', props);
// 		return (
// 			<div>
// 				{/* <h2 style={{ color: 'green', textAlign: 'center' }}>
// 					Attendance
// 				</h2> */}
// 				<table
// 					style={{
// 						width: '100%',
// 						display: 'table',
// 					}}
// 				>
// 					<thead>
// 						<th>S/N</th>
// 						<th>Name</th>
// 						<th>Email</th>
// 					</thead>
// 					<tbody>
// 						<tr>
// 							<td>1</td>
// 							<td>Njoku Samson</td>
// 							<td>samson@yahoo.com</td>
// 						</tr>
// 						<tr>
// 							<td>2</td>
// 							<td>Ebere Plenty</td>
// 							<td>ebere@gmail.com</td>
// 						</tr>
// 						<tr>
// 							<td>3</td>
// 							<td>Undefined</td>
// 							<td>No Email</td>
// 						</tr>
// 					</tbody>
// 				</table>
// 			</div>
// 		);
// 	}
// }

// export default ComponentToPrint;
