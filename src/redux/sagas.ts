import { all } from 'redux-saga/effects';

import loginSaga from 'pages/Public/Login/Login.saga';

export default function* rootSaga(): any {
	yield all([loginSaga()]);
}
