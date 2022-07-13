import PropTypes from 'prop-types';
import React, { useEffect, useRef } from 'react';

// Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { Link } from 'react-router-dom';

const SidebarContent = (): JSX.Element => {
	const ref = useRef<any>();
	// Use ComponentDidMount and ComponentDidUpdate method symultaniously
	useEffect(() => {
		const pathName = window.location.pathname;

		const initMenu = () => {
			new MetisMenu('#side-menu');
			let matchingMenuItem;
			const ul = document.getElementById('side-menu');
			if (ul) {
				const items = ul.getElementsByTagName('a');
				for (let i = 0; i < items.length; ++i) {
					if (pathName === items[i].pathname) {
						matchingMenuItem = items[i];
						break;
					}
				}
				if (matchingMenuItem) {
					activateParentDropdown(matchingMenuItem);
				}
			}
		};
		initMenu();
	}, []);

	useEffect(() => {
		if (ref.current) {
			ref.current.recalculate();
		}
	});

	function scrollElement(item) {
		if (item) {
			const currentPosition = item.offsetTop;
			if (currentPosition > window.innerHeight && ref.current) {
				ref.current.getScrollElement().scrollTop = currentPosition - 300;
			}
		}
	}

	function activateParentDropdown(item) {
		item.classList.add('active');
		const parent = item.parentElement;
		const parent2El = parent.childNodes[1];
		if (parent2El && parent2El.id !== 'side-menu') {
			parent2El.classList.add('mm-show');
		}

		if (parent) {
			parent.classList.add('mm-active');
			const parent2 = parent.parentElement;

			if (parent2) {
				parent2.classList.add('mm-show'); // ul tag

				const parent3 = parent2.parentElement; // li tag

				if (parent3) {
					parent3.classList.add('mm-active'); // li
					parent3.childNodes[0].classList.add('mm-active'); //a
					const parent4 = parent3.parentElement; // ul
					if (parent4) {
						parent4.classList.add('mm-show'); // ul
						const parent5 = parent4.parentElement;
						if (parent5) {
							parent5.classList.add('mm-show'); // li
							parent5.childNodes[0].classList.add('mm-active'); // a tag
						}
					}
				}
			}
			scrollElement(item);
			return false;
		}
		scrollElement(item);
		return false;
	}

	return (
		<>
			<SimpleBar className="h-100" ref={ref}>
				<div id="sidebar-menu">
					<ul className="metismenu list-unstyled" id="side-menu">
						{/* <li className="menu-title">{'Menu'} </li> */}
						<li>
							<Link to="/#" className="">
								<i className="bx bx-home-circle"></i>
								{/* <span className="badge rounded-pill bg-info float-end">04</span> */}
								<span>{'Dashboards'}</span>
							</Link>
							<ul className="sub-menu" aria-expanded="false">
								<li>
									<Link to="/welcome">{'Default'}</Link>
								</li>
							</ul>
						</li>
						{/** User Management */}
						<li>
							<Link to="/#" className="">
								<i className="bx bx-user"></i>
								<span>{'User Management'}</span>
							</Link>
							<ul className="sub-menu" aria-expanded="false">
								<li>
									<Link to="/user">{'User List'}</Link>
								</li>
								<li>
									<Link to="/role">{'Role List'}</Link>
								</li>
							</ul>
						</li>

					</ul>
				</div>
			</SimpleBar>
		</>
	);
};

SidebarContent.propTypes = {
	location: PropTypes.object,
	t: PropTypes.any,
};

export default SidebarContent;
