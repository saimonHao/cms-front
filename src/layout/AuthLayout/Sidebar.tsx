import React from 'react';
import SidebarContent from './SidebarContent';
import { Link } from 'react-router-dom';

const Sidebar = (): JSX.Element => {
	return (
		<>
			<div className="vertical-menu">
				<div className="navbar-brand-box">
					<Link to="/" className="logo logo-light" style={{ color: 'white' }}>
						<span className="logo-sm">CMS</span>
						<span className="logo-lg">CMS FRONTED</span>
					</Link>
				</div>
				<div data-simplebar className="h-100">
					<SidebarContent />
				</div>
				<div className="sidebar-background"></div>
			</div>
		</>
	);
};

export default Sidebar;
