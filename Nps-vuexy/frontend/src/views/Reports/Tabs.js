// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from 'reactstrap';

// ** Icons Imports
import { User, Lock, Bookmark, Link, Bell } from 'react-feather';

const Tabs = ({ activeTab, toggleTab }) => {
	return null;

	return (
		<Nav pills className="mb-2">
			<NavItem>
				<NavLink
					active={activeTab === '1'}
					onClick={() => toggleTab('1')}
				>
					<User size={18} className="me-50" />
					<span className="fw-bold">Report</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					active={activeTab === '2'}
					onClick={() => toggleTab('2')}
				>
					<Lock size={18} className="me-50" />
					<span className="fw-bold">Over Time</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					active={activeTab === '3'}
					onClick={() => toggleTab('3')}
				>
					<User size={18} className="me-50" />
					<span className="fw-bold">Snapshot</span>
				</NavLink>
			</NavItem>
			<NavItem>
				<NavLink
					active={activeTab === '4'}
					onClick={() => toggleTab('4')}
				>
					<Lock size={18} className="me-50" />
					<span className="fw-bold">Benchmarks</span>
				</NavLink>
			</NavItem>
		</Nav>
	);
};

export default Tabs;
