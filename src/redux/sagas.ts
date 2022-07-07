import { all } from 'redux-saga/effects';
import loginSaga from '../redux/reducer/auth/login.saga';

export default function* rootSaga(): any {
	yield all([
		loginSaga()
	]);
}
