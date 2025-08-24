import http from './http';

// Allow both shapes: {success,data} or raw object/array
const unwrap = (r) => (r?.data?.data !== undefined ? r.data.data : r.data);

// HOME (json-server: GET /home → returns an object)
export const apiGetHome = async () => {
	const r = await http.get('/home');
	return unwrap(r);
};

// PRODUCTS list (json-server: GET /products → array)
export const apiGetProducts = async (params = {}) => {
	const r = await http.get('/products', {params});
	return unwrap(r);
};

// PRODUCT detail (json-server: GET /products/:id → object)
// json-server uses numeric or string ids—your db.json uses string ids (e.g. prod_rice_miniket_5kg)
export const apiGetProductById = async (id) => {
	const r = await http.get(`/products/${id}`);
	return unwrap(r);
};

// Simple search (json-server supports ?q= for full-text)
export const apiSearchProducts = async (q, params = {}) => {
	const r = await http.get('/products', {params: {q, ...params}});
	return unwrap(r);
};

// (Keep your auth/order endpoints for later real backend)
export const apiLogin = (payload) => http.post('/auth/login', payload).then(unwrap);
export const apiRegister = (payload) => http.post('/auth/register', payload).then(unwrap);
export const apiGetProfile = () => http.get('/me').then(unwrap);
export const apiCreateOrder = (payload) => http.post('/orders', payload).then(unwrap);
export const apiGetOrders = (params = {}) => http.get('/orders', {params}).then(unwrap);
