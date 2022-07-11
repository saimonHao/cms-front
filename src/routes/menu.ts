//* Authenticated Pages
import Welcome from 'pages/Auth/Welcome/Welcome';
import UserList from 'pages/Auth/User/UserList';

//* Public Pages
import Login from 'pages/Public/Login/Login';
import Logout from 'pages/Public/Logout/Logout';

const publicRoutes = [
	{
		path: '/login',
		component: Login,
	},
	{
		path: '/logout',
		component: Logout,
	},
];

const authenticatedRoutes = [
	{
		path: '/welcome',
		component: Welcome,
	},
	{
		path: '/user',
		component: UserList,
	},
];

export { publicRoutes, authenticatedRoutes };
