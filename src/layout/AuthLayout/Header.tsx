import PropTypes from 'prop-types';
import React, { useState } from 'react';

// import { connect } from 'react-redux';
// import { Row, Col } from 'reactstrap';
// import ReactDrawer from 'react-drawer';
import 'react-drawer/lib/react-drawer.css';
import { Link } from 'react-router-dom';

// Reactstrap
// import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';

// Import menuDropdown
// import LanguageDropdown from '../CommonForBoth/TopbarDropdown/LanguageDropdown';
// import NotificationDropdown from '../CommonForBoth/TopbarDropdown/NotificationDropdown';
import ProfileMenu from './ProfileMenu';
// import RightSidebar from '../CommonForBoth/RightSidebar';
// import megamenuImg from '../../assets/images/megamenu-img.png';

// import images
// import github from '../../assets/images/brands/github.png';
// import bitbucket from '../../assets/images/brands/bitbucket.png';
// import dribbble from '../../assets/images/brands/dribbble.png';
// import dropbox from '../../assets/images/brands/dropbox.png';
// import mail_chimp from '../../assets/images/brands/mail_chimp.png';
// import slack from '../../assets/images/brands/slack.png';

// import logo from '../../assets/images/logo.svg';
// import logoLightSvg from '../../assets/images/logo-light.svg';

// Redux Store
// import { showRightSidebarAction, toggleLeftmenu, changeSidebarType } from '../../store/actions';

const Header = (): JSX.Element => {
	const [search, setsearch] = useState(false);
	// const [megaMenu, setmegaMenu] = useState(false);
	// const [socialDrp, setsocialDrp] = useState(false);

	// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

	// const [position, setPosition] = useState('');
	// const [open, setOpen] = useState(false);

	// const toggleTopDrawer = () => {
	// 	setPosition('right');
	// 	setOpen(!open);
	// };

	// const onDrawerClose = () => {
	// 	setOpen(false);
	// };

	function tToggle() {
		const body = document.body;
		if (window.screen.width <= 998) {
			body.classList.toggle('sidebar-enable');
		} else {
			body.classList.toggle('vertical-collpsed');
			body.classList.toggle('sidebar-enable');
		}
	}

	return (
		<>
			<header id="page-topbar">
				<div className="navbar-header">
					<div className="d-flex">
						<div className="navbar-brand-box d-lg-none d-md-block">
							<Link to="/" className="logo logo-dark">
								<span className="logo-sm">{/* <img src={logo} alt="" height="22" /> */}</span>
							</Link>

							<Link to="/" className="logo logo-light">
								<span className="logo-sm">{/* <img src={logoLightSvg} alt="" height="22" /> */}</span>
							</Link>
						</div>

						<button
							type="button"
							onClick={() => {
								tToggle();
							}}
							className="btn btn-sm px-3 font-size-16 header-item "
							id="vertical-menu-btn"
						>
							<i className="fa fa-fw fa-bars" />
						</button>

						<form className="app-search d-none d-lg-block">
							<div className="position-relative">
								<input type="text" className="form-control" placeholder={'Search' + '...'} />
								<span className="bx bx-search-alt" />
							</div>
						</form>
					</div>
					<div className="d-flex">
						<div className="dropdown d-inline-block d-lg-none ms-2">
							<button
								onClick={() => {
									setsearch(!search);
								}}
								type="button"
								className="btn header-item noti-icon "
								id="page-header-search-dropdown"
							>
								<i className="mdi mdi-magnify" />
							</button>
							<div
								className={
									search
										? 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show'
										: 'dropdown-menu dropdown-menu-lg dropdown-menu-end p-0'
								}
								aria-labelledby="page-header-search-dropdown"
							>
								<form className="p-3">
									<div className="form-group m-0">
										<div className="input-group">
											<input
												type="text"
												className="form-control"
												placeholder="Search ..."
												aria-label="Recipient's username"
											/>
											<div className="input-group-append">
												<button className="btn btn-primary" type="submit">
													<i className="mdi mdi-magnify" />
												</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>

						{/* <LanguageDropdown /> */}

						{/* <div className="dropdown d-none d-lg-inline-block ms-1">
							<button
								type="button"
								onClick={() => {
									toggleFullscreen();
								}}
								className="btn header-item noti-icon "
								data-toggle="fullscreen"
							>
								<i className="bx bx-fullscreen" />
							</button>
						</div> */}

						{/* <NotificationDropdown /> */}
						<ProfileMenu />

						{/* <div onClick={toggleTopDrawer} disabled={open} className="dropdown d-inline-block">
							<button type="button" className="btn header-item noti-icon right-bar-toggle ">
								<i className="bx bx-cog bx-spin" />
							</button>
						</div> */}
					</div>
				</div>
			</header>
			{/* <ReactDrawer open={open} position={position} onClose={onDrawerClose}>
				<RightSidebar onClose={onDrawerClose} />
			</ReactDrawer> */}
		</>
	);
};

Header.propTypes = {
	changeSidebarType: PropTypes.func,
	leftMenu: PropTypes.any,
	leftSideBarType: PropTypes.any,
	showRightSidebar: PropTypes.any,
	showRightSidebarAction: PropTypes.func,
	t: PropTypes.any,
	toggleLeftmenu: PropTypes.func,
};

export default Header;
