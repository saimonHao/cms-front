import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';
import { saveUser } from '../../../services/user';
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
            state.users = action.payload.data.users;
            state.total = action.payload.data.total;
        },
        fetchUsersFailed: (state, action) => {
            state.error = action.payload.data.message;
        },
        addUserSuccessed: (state, action) => {
            state.users = action.payload.data.users;
        },
        addUserFailed: (state, action) => {
            console.log(action);
            state.error = action.payload.data.message;
        },
    },
    // extraReducers: (builder) => {
    //     // When our request is pending:
    //     // - store the 'pending' state as the status for the corresponding pokemon name
    //     builder.addCase(saveUser.pending, (state, action) => {
    //         console.log("===pending====", state, action);
    //     })
    //     // When our request is fulfilled:
    //     // - store the 'fulfilled' state as the status for the corresponding pokemon name
    //     // - and store the received payload as the data for the corresponding pokemon name
    //     builder.addCase(saveUser.fulfilled, (state, action) => {
    //         console.log("===fulfilled====", state, action);
    //     })
    //     // When our request is rejected:
    //     // - store the 'rejected' state as the status for the corresponding pokemon name
    //     builder.addCase(saveUser.rejected, (state, action) => {
    //         console.log("===rejected====", state, action);
    //     })
    // },
});
export const { fetchUsers, fetchUsersSuccessed, fetchUsersFailed, addUserSuccessed, addUserFailed } = userSlice.actions;
export default userSlice.reducer;