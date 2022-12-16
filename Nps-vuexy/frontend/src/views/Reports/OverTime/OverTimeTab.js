import React from 'react';
import OverTimeTabChart from './OverTimeTabChart';
import OverTimeTabTable from './Table';
import { Card } from 'reactstrap';
import { Container } from './OverTimeStyle';

const OverTimeTab = () => {
	return (
		<>
			<Container className="container">
				<Card style={{ width: '100%', margin: '0 auto' }}>
					<OverTimeTabChart />
				</Card>
				<div className="over_time_tab_datatable">
					<OverTimeTabTable />
				</div>
			</Container>
		</>
	);
};

export default OverTimeTab;
