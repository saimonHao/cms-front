import { all } from 'redux-saga/effects';
import loginSaga from './reducer/login/login.saga';
import userSaga from './reducer/user/user.saga';
import roleSaga from './reducer/role/role.saga';
export default function* rootSaga(): any {
	yield all([
		loginSaga(),
		userSaga(),
		roleSaga(),
	]);
}
