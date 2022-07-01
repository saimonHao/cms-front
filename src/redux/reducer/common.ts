import { createSlice } from '@reduxjs/toolkit';

interface State {
	isPreloader?: boolean;
}

const initialState: State = {
	isPreloader: true,
};

const CommonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		togglePreloader: (state) => {
			state.isPreloader = !state.isPreloader;
		},
	},
});

export const { togglePreloader } = CommonSlice.actions;

export default CommonSlice.reducer;
