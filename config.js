// Central place for environment-like values.
// Later you can read from app.config.js -> Constants.manifest.extra
export const API = {
	BASE_URL: 'https://your-api.example.com', // ← change this
	TIMEOUT_MS: 15000,
};

export const STORAGE_KEYS = {
	TOKEN: 'auth_token',
	STARTER_FLAG: 'hasSeenStarter',
};
