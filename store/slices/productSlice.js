import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import http from '../../services/http';

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

// GET /home from json-server
export const loadHome = createAsyncThunk('products/loadHome', async () => {
	const {data} = await http.get('/home'); // data is { tabs, slides, brands, categories, sections:{...} }
	// Flatten sections → state.home
	return {
		tabs: data.tabs || [],
		slides: data.slides || [],
		brands: data.brands || [],
		categories: data.categories || [],
		hot: data.sections?.hot || [],
		trending: data.sections?.trending || [],
		recommended: data.sections?.recommended || [],
		offers: data.sections?.offers || [],
		deals: data.sections?.deals || [],
	};
});

// GET /products/:id
export const loadProductById = createAsyncThunk('products/loadById', async (id) => {
	const {data} = await http.get(`/products/${id}`);
	return data; // single product object
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
			s.home = a.payload;

			// seed byId from visible sections (optional)
			const arr = [...s.home.hot, ...s.home.trending, ...s.home.recommended];
			arr.forEach((p) => {
				if (p?.id) s.byId[p.id] = {...(s.byId[p.id] || {}), ...p};
			});
		});
		b.addCase(loadHome.rejected, (s, a) => {
			s.status = 'failed';
			s.error = a.error?.message || 'Failed to load';
		});

		b.addCase(loadProductById.fulfilled, (s, a) => {
			const p = a.payload;
			if (p?.id) s.byId[p.id] = p;
		});
	},
});

export default slice.reducer;
