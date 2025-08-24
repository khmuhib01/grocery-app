import axios from 'axios';
import {Platform} from 'react-native';

// Works everywhere without changing config:
// - iOS simulator: localhost
// - Android emulator: 10.0.2.2
// - Real device: change to your PC/LAN IP once (e.g. http://192.168.0.105:4000)
const BASE_URL = Platform.select({
	ios: 'http://localhost:4000',
	android: 'http://10.0.2.2:4000',
	default: 'http://localhost:4000',
});

const http = axios.create({
	baseURL: BASE_URL,
	timeout: 15000,
});

export default http;
