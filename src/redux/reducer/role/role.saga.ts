import { call, put, takeEvery } from "redux-saga/effects";
import API from "services";
import { roleActions } from "./role.actions";
import { fetchRoleSuccessed } from "./role.slice";

function* fetchRoleData(payload) {
    const { page, sizePerPage, searchKey } = payload;
    console.log("payload ", page, sizePerPage);
    try {
        const res = yield call(API.role.fetchRoleData, { page, sizePerPage, searchKey });
        console.log(res);
        yield put(fetchRoleSuccessed(res));
    } catch (error) {
        return error;
    }
}

export default function* roleSaga() {
    yield takeEvery(roleActions.FETCH_ROLE_DATA, fetchRoleData);
}