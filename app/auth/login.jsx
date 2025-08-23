// app/auth/login.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {Text, TouchableOpacity, View} from 'react-native';
import {STORAGE_KEYS} from '../../config';
import {Colors} from '../../constants/Colors';

const Login = () => {
	const C = Colors.light;

	// TODO: replace with real apiLogin -> save token -> go to tabs
	const handleMockLogin = async () => {
		await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, 'demo_token');
		router.replace('/(tabs)/home/index');
	};

	return (
		<View style={{flex: 1, padding: 24, justifyContent: 'center', backgroundColor: C.background}}>
			<Text style={{fontSize: 20, fontWeight: '700', color: C.text, marginBottom: 16}}>Login</Text>
			<TouchableOpacity
				onPress={handleMockLogin}
				style={{backgroundColor: C.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center'}}
			>
				<Text style={{color: C.white, fontWeight: '700'}}>Sign in (Mock)</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Login;
