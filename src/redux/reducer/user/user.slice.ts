import { createSlice } from '@reduxjs/toolkit';
interface UserState {
    total: number,
    users: [],
    error: string
}
const initialState = { total: 0, users: [], error: '' } as UserState;
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchUsers: (state, action) => {
            state.total = action.payload.data.total;
            state.users = action.payload.data.users;
        },
        fetchUsersSuccessed: (state, action) => {
            console.log(action);
            state.users = action.payload.data.users;
        },
        fetchUsersFailed: (state, action) => {
            state.error = action.payload.data.message;
        }
    },

});
export const { fetchUsers, fetchUsersSuccessed, fetchUsersFailed } = userSlice.actions;
export default userSlice.reducer;