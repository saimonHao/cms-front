import { call, put, take, takeEvery } from "redux-saga/effects";
import API from "services";
import { roleActions } from "./role.actions";
import { fetchRoleSuccessed } from "./role.slice";

function* fetchRoleData(payload) {
    const { page, sizePerPage, searchKey } = payload;
    try {
        const res = yield call(API.role.fetchRoleData, { page, sizePerPage, searchKey });
        yield put(fetchRoleSuccessed(res));
    } catch (error) {
        return error;
    }
}
function* createRole(payload) {
    const { roleName, permissions, callback } = payload;
    try {
        const res = yield call(API.role.createRole, { roleName, permissions });
        callback && callback(res);
        return res;
    } catch (error) {
        return error;
    }
}
function* updateRole(payload) {
    const { upId, roleName, permissions, callback } = payload;
    try {
        const res = yield call(API.role.updateRole, { upId, roleName, permissions });
        callback && callback(res);
        return res;
    } catch (error) {
        return error;
    }
}
function* deleteRole(payload) {
    const { delId, callback } = payload;
    console.log(delId);
    try {
        const res = yield call(API.role.delRole, delId);
        callback && callback(res);
        return res;
    } catch (error) {
        return error;
    }
}
function* updateUserRole(payload) {
    const { uid, roleNames, callback } = payload;
    try {
        const res = yield call(API.role.updateUserRole, { uid, roleNames });
        callback && callback(res);
        return res;
    } catch (error) {
        return error;
    }
}

export default function* roleSaga() {
    yield takeEvery(roleActions.FETCH_ROLE_DATA, fetchRoleData);
    yield takeEvery(roleActions.CREATE_ROLE, createRole);
    yield takeEvery(roleActions.UPDATE_ROLE, updateRole);
    yield takeEvery(roleActions.DELETE_ROLE, deleteRole);
    yield takeEvery(roleActions.UPDATE_USER_ROLE, updateUserRole)
}