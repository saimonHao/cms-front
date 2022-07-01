import React from 'react';
import MetaTags from 'react-meta-tags';
import { Button } from 'reactstrap';
import { useHistory, RouteChildrenProps } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { increment } from './Login.slice';
import { sagaActions } from './Login.sagaActions';

//* Components
import LoginForm from 'components/LoginForm/LoginForm';

const Login = (props: RouteChildrenProps): JSX.Element => {
	console.log(props);
	const history = useHistory();

	const count = useAppSelector((state) => state.loginForm.value);
	const dispatch = useAppDispatch();

	const handleLoginBtnClick = () => {
		localStorage.setItem('authUser', 'test');
		history.push('/welcome');
	};

	return (
		<>
			<MetaTags>
				<title>Login | Skote - React Admin & Dashboard Template</title>
			</MetaTags>
			<div>Login</div>
			<Button onClick={handleLoginBtnClick}>Login</Button>
			{count}
			<Button onClick={() => dispatch(increment())}>+1</Button>
			<Button onClick={() => dispatch({ type: sagaActions.DELAY_INCREMENT })}>Delay</Button>
			<LoginForm />
		</>
	);
};

export default Login;
