import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	items: [], // [{ id, name, price, qty, ... }]
	subtotal: 0,
	voucher: null, // full voucher object if applied
};

const calcSubtotal = (items) => items.reduce((s, it) => s + Number(it.price || 0) * Number(it.qty || 1), 0);

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
			const item = action.payload;
			const existing = state.items.find((i) => i.id === item.id);
			if (existing) existing.qty += item.qty || 1;
			else state.items.push({...item, qty: item.qty || 1});
			state.subtotal = calcSubtotal(state.items);
		},
		updateQty(state, action) {
			const {id, qty} = action.payload;
			const it = state.items.find((i) => i.id === id);
			if (it) {
				it.qty = Math.max(1, qty);
				state.subtotal = calcSubtotal(state.items);
			}
		},
		removeItem(state, action) {
			state.items = state.items.filter((i) => i.id !== action.payload);
			state.subtotal = calcSubtotal(state.items);
		},
		clearCart(state) {
			state.items = [];
			state.subtotal = 0;
			state.voucher = null;
		},
		setVoucher(state, action) {
			state.voucher = action.payload || null; // store full voucher object
		},
	},
});

export const {addItem, updateQty, removeItem, clearCart, setVoucher} = cartSlice.actions;
export default cartSlice.reducer;
