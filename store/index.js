import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer,
	products: productReducer,
});

export const store = configureStore({
	reducer: rootReducer,
	// middleware and devTools are fine with defaults
});

export const RootState = undefined; // (JS placeholder; using TS would type these)
export const AppDispatch = undefined;
