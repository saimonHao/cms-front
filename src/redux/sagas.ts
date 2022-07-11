import { all } from 'redux-saga/effects';
import loginSaga from './reducer/login/login.saga';
import userSaga from './reducer/user/user.saga';
export default function* rootSaga(): any {
	yield all([
		loginSaga(),
		userSaga()
	]);
}
