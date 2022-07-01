import CommonReducer from 'redux/reducer/common';
import LoginFormReducer from 'pages/Public/Login/Login.slice';

const reducers = {
	common: CommonReducer,
	loginForm: LoginFormReducer,
};

export default reducers;
