import CommonReducer from 'redux/reducer/common';
import LoginReducer from 'redux/reducer/auth/login.slice';
const reducers = {
	common: CommonReducer,
	login: LoginReducer
};

export default reducers;
