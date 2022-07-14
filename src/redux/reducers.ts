import CommonReducer from 'redux/reducer/common';
import LoginReducer from 'redux/reducer/login/login.slice';
import UserReducer from 'redux/reducer/user/user.slice';
import RoleReducer from 'redux/reducer/role/role.slice';
const reducers = {
	common: CommonReducer,
	login: LoginReducer,
	user: UserReducer,
	role: RoleReducer
};

export default reducers;
