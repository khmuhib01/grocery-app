import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {API, STORAGE_KEYS} from '../config';

// Create instance
const http = axios.create({
	baseURL: API.BASE_URL,
	timeout: API.TIMEOUT_MS,
});

// Attach token for every request
http.interceptors.request.use(async (config) => {
	try {
		const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
	} catch (e) {
		// ignore token read errors
	}
	// Default headers
	config.headers.Accept = 'application/json';
	if (!config.headers['Content-Type']) {
		config.headers['Content-Type'] = 'application/json';
	}
	return config;
});

// Unified response / error handling
http.interceptors.response.use(
	(response) => response,
	async (error) => {
		// Normalize network / timeout / server errors
		const status = error?.response?.status;
		const message = error?.response?.data?.message || error?.message || 'Network error';

		// Example: force logout on 401 if needed (optional)
		if (status === 401) {
			// Optionally remove token here:
			// await AsyncStorage.removeItem(STORAGE_KEYS.TOKEN);
			// You could also emit an event or dispatch to Redux in a centralized observer.
		}

		// Throw a consistent shape
		return Promise.reject({
			status,
			message,
			data: error?.response?.data,
			original: error,
		});
	}
);

export default http;
