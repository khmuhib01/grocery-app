import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	// middleware and devTools are fine with defaults
});

export const RootState = undefined; // (JS placeholder; using TS would type these)
export const AppDispatch = undefined;
