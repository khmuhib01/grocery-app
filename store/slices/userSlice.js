import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	user: null, // { id, name, email, ... }
	token: null, // JWT / session token
	loading: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setAuth(state, action) {
			const {user, token} = action.payload || {};
			state.user = user ?? null;
			state.token = token ?? null;
		},
		clearAuth(state) {
			state.user = null;
			state.token = null;
		},
		setUserLoading(state, action) {
			state.loading = !!action.payload;
		},
	},
});

export const {setAuth, clearAuth, setUserLoading} = userSlice.actions;
export default userSlice.reducer;
