import http from './http';

// Auth
export const apiLogin = (payload) => {
	// payload: { email, password } or { phone, otp } – adapt to your backend
	return http.post('/auth/login', payload).then((r) => r.data);
};

export const apiRegister = (payload) => {
	// payload: { name, email, phone, password }
	return http.post('/auth/register', payload).then((r) => r.data);
};

export const apiGetProfile = () => http.get('/me').then((r) => r.data);

// Catalog
export const apiGetStores = (params = {}) => http.get('/stores', {params}).then((r) => r.data);

export const apiGetStoreDetails = (storeId) => http.get(`/stores/${storeId}`).then((r) => r.data);

export const apiGetStoreProducts = (storeId, params = {}) =>
	http.get(`/stores/${storeId}/products`, {params}).then((r) => r.data);

// Search
export const apiSearchProducts = (query, params = {}) =>
	http.get('/products/search', {params: {q: query, ...params}}).then((r) => r.data);

// Cart / Orders
export const apiCreateOrder = (payload) => http.post('/orders', payload).then((r) => r.data);

export const apiGetOrders = (params = {}) => http.get('/orders', {params}).then((r) => r.data);
