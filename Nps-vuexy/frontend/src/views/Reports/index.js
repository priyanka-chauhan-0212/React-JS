// ** React Imports
import { Fragment, useState, useEffect } from 'react';

// ** Third Party Components

// ** Reactstrap Imports
import { Row, Col, TabContent, TabPane } from 'reactstrap';

// ** Demo Components
import Tabs from './Tabs';
import Breadcrumbs from '@components/breadcrumbs';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-account-settings.scss';
import ReportTab from './ReportTab';
import OverTimeTab from './OverTime/OverTimeTab';
import SnapShotTab from './SnapShotTab/SnapShotTab';

const AccountSettings = () => {
	// ** States
	const [activeTab, setActiveTab] = useState('1');
	const [data, setData] = useState(null);

	const toggleTab = (tab) => {
		setActiveTab(tab);
	};

	return (
		<Fragment>
			<Row>
				<Col md={12} xs={12}>
					<div style={{ margin: '0 27px' }}>
						<Tabs
							className="mb-2"
							activeTab={activeTab}
							toggleTab={toggleTab}
						/>
					</div>

					<TabContent activeTab={activeTab}>
						<TabPane tabId="1">
							<ReportTab />
						</TabPane>
						<TabPane tabId="2">
							<OverTimeTab />
						</TabPane>
						<TabPane tabId="3">
							<SnapShotTab />
						</TabPane>
					</TabContent>
				</Col>
			</Row>
		</Fragment>
	);
};

export default AccountSettings;
