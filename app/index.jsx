// app/index.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {STORAGE_KEYS} from '../config';
import {Colors} from '../constants/Colors';

const InitialGate = () => {
	const [ready, setReady] = useState(false);
	const [err, setErr] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const [starter, token] = await Promise.all([
					AsyncStorage.getItem(STORAGE_KEYS.STARTER_FLAG),
					AsyncStorage.getItem(STORAGE_KEYS.TOKEN),
				]);

				if (!starter) router.replace('/onboarding');
				else if (token) router.replace('/(tabs)');
				else router.replace('/auth/login');
			} catch {
				setErr('Failed to read local storage.');
			} finally {
				setReady(true);
			}
		})();
	}, []);

	const C = Colors.light;
	return (
		<View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: C.background}}>
			<ActivityIndicator size="large" color={C.tint} />
			<Text style={{marginTop: 10, color: C.text}}>{err || 'Preparing your app…'}</Text>
		</View>
	);
};

export default InitialGate;
