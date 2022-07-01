//* Authenticated Pages
import Welcome from 'pages/Auth/Welcome/Welcome';

//* Public Pages
import Login from 'pages/Public/Login/Login';

const publicRoutes = [
	{
		path: '/login',
		component: Login,
	},
];

const authenticatedRoutes = [
	{
		path: '/welcome',
		component: Welcome,
	},
];

export { publicRoutes, authenticatedRoutes };
