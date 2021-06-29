import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SidebarLink } from '../core/SidebarLink';
import { DesktopsPage } from './DesktopsPage';
import { Logo } from '../core/Logo';
import { showModal } from '../core/Modal';
import { LogoutConfirmModal } from '../modals/LogoutConfirmModal';
import { Dashboard } from './Dashboard';
import { PhoneLogPage } from './PhoneLogPage';
import { CamerasPage } from './CamerasPage';
import { IntegrationsPage } from './IntegrationsPage';

export const LoggedInView = ({user}) => {
	const clickLogout = () => showModal(<LogoutConfirmModal/>);

	return (
		<BrowserRouter>
			<div className="nav">
				<Logo/>
				<span className="avatar-name" onClick={clickLogout}>{user.emails[0].address}</span>
			</div>
			<div className="body">
				<div className="sidebar">
					<div className="sidebar-group">
						<SidebarLink to="/" title="Dashboard" icon="home"/>
					</div>
					<div className="sidebar-group">
						<div className="sidebar-header">Monitoring</div>
						<SidebarLink to="/inspections" title="Inspections" icon="eco"/>
						<SidebarLink to="/desktops" title="Desktops" icon="desktop_windows"/>
						<SidebarLink to="/cameras" title="Cameras" icon="videocam"/>
						<SidebarLink to="/phone" title="Phone Calls" icon="phone"/>
					</div>
					<div className="sidebar-group">
						<div className="sidebar-header">Settings</div>
						<SidebarLink to="/devices" title="Settings" icon="settings"/>
					</div>
				</div>
				<div className="main">
					<Switch>
						<Route path="/about" children={<About/>}/>
						<Route path="/desktops" children={<DesktopsPage/>}/>
						<Route path="/phone" children={<PhoneLogPage/>}/>
						<Route path="/cameras" children={<CamerasPage/>}/>
						<Route path="/devices" children={<IntegrationsPage/>}/>
						<Route path="/" children={<Dashboard/>}/>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

function About() {
	return <h2>About</h2>;
}