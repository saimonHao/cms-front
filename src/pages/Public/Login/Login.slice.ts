import { createSlice } from '@reduxjs/toolkit';

interface LoginFormState {
	value: number;
}

const initialState: LoginFormState = {
	value: 0,
};

const LoginFormSlice = createSlice({
	name: 'loginForm',
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
	},
});

export const { increment } = LoginFormSlice.actions;

export default LoginFormSlice.reducer;
