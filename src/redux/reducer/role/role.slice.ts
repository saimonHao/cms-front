import { createSlice } from '@reduxjs/toolkit';

interface RoleState {
    roles: Array<Object>,
    total: number,
    error?: string
}
const initialState = { roles: [], total: 0, error: "" } as RoleState;
const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        fetchRoleSuccessed: (state, action) => {
            state.roles = action.payload.data.roles;
            state.total = action.payload.data.total;
        },
        createRoleSuccessed: (state, action) => {
            return {
                ...state,
                action
            }
        }
    }
});
export const { fetchRoleSuccessed } = roleSlice.actions;
export default roleSlice.reducer;