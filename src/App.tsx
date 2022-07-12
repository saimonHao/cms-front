import React from 'react';
import { publicRoutes, authenticatedRoutes } from 'routes/menu';
import { Switch, Route, Redirect, RouteProps, RouteChildrenProps } from 'react-router-dom';
import AuthLayout from 'layout/AuthLayout';

import "@fontsource/poppins";
import "assets/skote/app.scss";
import "styles/global.scss";
import './assets/skote/datatables.scss'

const App = (): JSX.Element => {
	return (
		<Switch>
			{publicRoutes.map((route) => {
				const { path, component: Component } = route;
				return (
					<Route
						path={path}
						render={(props: RouteProps & RouteChildrenProps) => {
							return <Component {...props} />;
						}}
						exact
						key={path}
					/>
				);
			})}
			{authenticatedRoutes.map((route) => {
				const { path, component: Component } = route;
				return (
					<Route
						path={path}
						render={(props: RouteProps & RouteChildrenProps) => {
							console.log(props);
							if (!localStorage.getItem('authUser')) {
								return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
							}
							return (
								<AuthLayout>
									<Component {...props} />
								</AuthLayout>
							);
						}}
						exact
						key={path}
					/>
				);
			})}
			<Route exact path="/" component={() => <Redirect to="/login" />} />
		</Switch>
	);
};

export default App;
