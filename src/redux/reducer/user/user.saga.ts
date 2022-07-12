import { call, put, takeEvery } from "redux-saga/effects";
import API from "services";
import { saveUser } from "services/user";
import { userActions } from "./user.actions";
import { fetchUsersSuccessed, fetchUsersFailed, addUserSuccessed, addUserFailed } from "./user.slice";

function* fetchUsers(payload) {
    const { page, sizePerPage } = payload;
    try {
        const res = yield call(API.user.fetchUserData, { page, sizePerPage });
        if (res.data.code === 200) {
            yield put(fetchUsersSuccessed(res));
        }
        yield put(fetchUsersFailed(res))
    } catch (error: any) {
        console.log('call fetch users data error :', error.message);
        yield put(fetchUsersFailed(error.message));
    }
}
function* newUser(payload) {
    const { callback } = payload;
    try {
        const res = yield call(API.user.saveUser, payload);
        if (res.data.code === 200) {
            callback && callback(res);
            yield put(addUserSuccessed(res));
        }
    } catch (error: any) {
        console.log("call create user error ", error.message);
        yield put(addUserFailed(error.message))
    }
}
function* delUser(payload) {
    const { delId, callback } = payload;
    try {
        const res = yield call(API.user.delUser, delId);
        if (res.data.code === 200) {
            callback && callback(res);
            // yield put(addUserSuccessed(res));
        }
    } catch (error: any) {
        console.log("call create user error ", error.message);
        // yield put(addUserFailed(error.message))
    }
}
export default function* userSaga() {
    yield takeEvery(userActions.FETCH_USERS, fetchUsers);
    yield takeEvery(userActions.ADD_USER, newUser);
    yield takeEvery(userActions.DEL_USER, delUser);

}