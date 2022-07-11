import CommonReducer from 'redux/reducer/common';
import LoginReducer from 'redux/reducer/login/login.slice';
import UserReducer from 'redux/reducer/user/user.slice';
const reducers = {
	common: CommonReducer,
	login: LoginReducer,
	user: UserReducer
};

export default reducers;
