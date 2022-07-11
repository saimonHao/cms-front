import { createSlice } from '@reduxjs/toolkit';
import { number } from 'prop-types';

interface LoginState {
    total: number,
    users: [],
    error: string
}
const initialState = { total: 0, users: [], error: '' } as LoginState;

const logiinSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        login: (state, action) => {
            state.total = action.payload.data.total;
            state.users = action.payload.data.users;
        },
        loginSuccess: (state, action) => {
            console.log(action);
        },
        loginFailed: (state, action) => {
            state.error = action.payload.data.message
        }
    }
});
export const { login, loginSuccess, loginFailed } = logiinSlice.actions;
export default logiinSlice.reducer;