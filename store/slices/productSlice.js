import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
// Local mock fallback
import {
	BRANDS,
	CATEGORIES,
	DEALS,
	HOT_FAST_MOVERS,
	OFFERS,
	PRODUCTS,
	PRODUCTS_BY_ID,
	RECOMMENDED,
	SLIDES,
	tabs,
	TRENDING,
} from '../../data/homeData';

const initialState = {
	home: {
		tabs: [],
		slides: [],
		brands: [],
		categories: [],
		hot: [],
		trending: [],
		recommended: [],
		offers: [],
		deals: [],
	},
	byId: {},
	status: 'idle',
	error: null,
};

export const loadHome = createAsyncThunk('products/loadHome', async (_, {getState, rejectWithValue}) => {
	try {
		// If you have an API endpoint, use it here:
		// const {data} = await api.get('/home', { headers: authHeaders(getState) });
		// return data;

		// Fallback to local mocks for now:
		return {
			tabs,
			slides: SLIDES,
			brands: BRANDS,
			categories: CATEGORIES,
			hot: HOT_FAST_MOVERS,
			trending: TRENDING,
			recommended: RECOMMENDED,
			offers: OFFERS,
			deals: DEALS,
			products: PRODUCTS,
		};
	} catch (e) {
		return rejectWithValue(e?.response?.data || e.message);
	}
});

export const loadProductById = createAsyncThunk('products/loadById', async (id, {getState, rejectWithValue}) => {
	try {
		// const {data} = await api.get(`/products/${id}`, { headers: authHeaders(getState) });
		// return data;

		// Fallback to mock:
		const found = PRODUCTS_BY_ID[id];
		if (!found) throw new Error('Product not found');
		return found;
	} catch (e) {
		return rejectWithValue(e?.response?.data || e.message);
	}
});

const slice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (b) => {
		b.addCase(loadHome.pending, (s) => {
			s.status = 'loading';
			s.error = null;
		});
		b.addCase(loadHome.fulfilled, (s, a) => {
			s.status = 'succeeded';
			const d = a.payload;
			s.home = {
				tabs: d.tabs,
				slides: d.slides,
				brands: d.brands,
				categories: d.categories,
				hot: d.hot,
				trending: d.trending,
				recommended: d.recommended,
				offers: d.offers,
				deals: d.deals,
			};
			// seed byId map
			for (const p of d.products || []) s.byId[p.id] = p;
		});
		b.addCase(loadHome.rejected, (s, a) => {
			s.status = 'failed';
			s.error = a.payload || String(a.error);
		});

		b.addCase(loadProductById.fulfilled, (s, a) => {
			const p = a.payload;
			s.byId[p.id] = p;
		});
	},
});

export default slice.reducer;
