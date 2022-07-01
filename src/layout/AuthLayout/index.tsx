import React, { useEffect } from 'react';

// Layout Related Components
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

//redux
// import { useAppSelector, useAppDispatch } from 'redux/hooks';

interface Props {
	children?: React.ReactNode;
}

const Layout = (props: Props): JSX.Element => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div id="layout-wrapper">
			<Header />
			<Sidebar />
			<div className="main-content">{props.children}</div>
			<Footer />
		</div>
	);
};

export default Layout;
