import { APIS } from "env/api-list";
import { parseParams } from "utils/parseParams";
import { del, get, post, put } from '../services/http/request';
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserData = async (params) => await get(APIS.fetchUserData(parseParams(params)));
export const saveUser = async (params) => await post(APIS.saveUser, params);
export const delUser = async (delId) => await del(APIS.delUser(delId));
export const updateUser = async (params) => await put(APIS.updateUser, params);
// export const saveUser = createAsyncThunk('user/createUser', async (params, { rejectWithValue }) => {
//     console.log("params===", params);
//     const response = await post(APIS.saveUser, params);
//     if (response.status < 200 || response.status >= 300) {
//         return rejectWithValue(response.data)
//     }
//     return response.data
// })