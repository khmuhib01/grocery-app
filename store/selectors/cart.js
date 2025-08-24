// selectors/cart.js (or inside cartSlice.js and export it)
export const selectCartTotals = (state) => {
	const items = state.cart?.items || [];
	return items.reduce(
		(acc, it) => {
			const qty = Math.max(0, Number(it.qty) || 0);
			const price = Number(it.price) || 0;
			acc.qty += qty;
			acc.amount += qty * price;
			return acc;
		},
		{qty: 0, amount: 0}
	);
};
