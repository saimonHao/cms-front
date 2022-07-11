import { call, put, takeEvery } from "redux-saga/effects";
import API from "services";
import { userActions } from "./user.actions";
import { fetchUsersSuccessed, fetchUsersFailed } from "./user.slice";

function* fetchUsers(payload) {
    const { page, sizePerPage } = payload;
    try {
        const res = yield call(API.user.fetchUserData);
        console.log(res);
        if (res.data.code === 200) {
            yield put(fetchUsersSuccessed(res));
        }
        yield put(fetchUsersFailed(res))
    } catch (error: any) {
        console.log('call fetch users data error :', error.message);
        yield put(fetchUsersFailed(error.message));
    }
}
export default function* userSaga() {
    yield takeEvery(userActions.FETCH_USERS, fetchUsers)
}