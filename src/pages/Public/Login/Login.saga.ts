import { put, takeEvery } from 'redux-saga/effects';
import { increment } from './Login.slice';
import { sagaActions } from './Login.sagaActions';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* delayIncrement(): any {
	yield delay(1000);
	yield put(increment());
}

export default function* loginSaga(): any {
	yield takeEvery(sagaActions.DELAY_INCREMENT, delayIncrement);
}
