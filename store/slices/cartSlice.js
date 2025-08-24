// store/slices/cartSlice.js
import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	items: [], // [{id, name, price, img, qty}]
	totalQty: 0,
	totalAmount: 0,
};

const slice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addToCart: (state, action) => {
			const p = action.payload; // {id, name, price, ...}
			const found = state.items.find((i) => i.id === p.id);
			if (found) {
				found.qty += 1;
			} else {
				state.items.push({...p, qty: 1});
			}
			state.totalQty += 1;
			state.totalAmount += Number(p.price) || 0;
		},
		removeFromCart: (state, action) => {
			const id = action.payload;
			const item = state.items.find((i) => i.id === id);
			if (!item) return;
			state.totalQty -= item.qty;
			state.totalAmount -= (Number(item.price) || 0) * item.qty;
			state.items = state.items.filter((i) => i.id !== id);
		},
		increaseQty: (state, action) => {
			const id = action.payload;
			const item = state.items.find((i) => i.id === id);
			if (!item) return;
			item.qty += 1;
			state.totalQty += 1;
			state.totalAmount += Number(item.price) || 0;
		},
		decreaseQty: (state, action) => {
			const id = action.payload;
			const idx = state.items.findIndex((i) => i.id === id);
			if (idx === -1) return;

			const item = state.items[idx];
			item.qty = Math.max(0, (item.qty || 0) - 1);

			if (item.qty === 0) {
				state.items.splice(idx, 1); // remove item completely
			}

			// If you also store precomputed totals in state, recompute here:
			// const totals = state.items.reduce((acc, it) => ({
			//   qty: acc.qty + it.qty, amount: acc.amount + it.qty * it.price
			// }), { qty: 0, amount: 0 });
			// state.totalQty = totals.qty;
			// state.totalAmount = totals.amount;
		},
		clearCart: (state) => {
			state.items = [];
			state.totalQty = 0;
			state.totalAmount = 0;
		},
	},
});

export const {addToCart, removeFromCart, increaseQty, decreaseQty, clearCart} = slice.actions;
export default slice.reducer;
