import { useHistory } from "react-router-dom";
import { takeEvery } from "redux-saga/effects";
import { call, put } from 'redux-saga/effects'
import API from "services";
import { loginActions } from "./login.actions";
import history from '../../history';
import { loginFailed, loginSuccess } from "./login.slice";

function* login(payload: any) {

    const { email, password } = payload;
    try {
        const response: any = yield call(API.auth.login, email, password);
        console.log(response);
        if (response.data.code === 200) {
            localStorage.setItem('authId', response.data.id)
            yield put(loginSuccess(response));
            history.push('/welcome');
        } else {
            yield put(loginFailed(response));
        }
    } catch (error: any) {
        console.log("call login api error ", error.message);
        yield put(loginFailed(error.message));
    }
}
export default function* loginSaga(): any {
    yield takeEvery("LOGIN_REQUESTED", login)
}