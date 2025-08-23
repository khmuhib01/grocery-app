// app/onboarding/index.jsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import {router} from 'expo-router';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {STORAGE_KEYS} from '../../config';
import {Colors} from '../../constants/Colors';

const Onboarding = () => {
	const C = Colors.light;

	const handleGetStarted = async () => {
		await AsyncStorage.setItem(STORAGE_KEYS.STARTER_FLAG, '1');
		const token = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
		router.replace(token ? '/(tabs)' : '/auth/login');
	};

	return (
		<View style={{flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: C.background}}>
			<Image
				source={{uri: 'https://picsum.photos/seed/grocery/600/400'}}
				style={{width: 280, height: 180, borderRadius: 16, marginBottom: 24}}
			/>
			<Text style={{fontSize: 24, fontWeight: '700', color: C.text, textAlign: 'center'}}>
				Fresh groceries, delivered fast
			</Text>
			<Text style={{marginTop: 10, color: C.gray500, textAlign: 'center'}}>
				Browse stores, find deals, and check out in minutes.
			</Text>

			<TouchableOpacity
				onPress={handleGetStarted}
				style={{
					marginTop: 28,
					backgroundColor: C.primary,
					paddingVertical: 14,
					borderRadius: 12,
					width: '100%',
					alignItems: 'center',
				}}
			>
				<Text style={{color: C.white, fontSize: 16, fontWeight: '700'}}>Get Started</Text>
			</TouchableOpacity>
		</View>
	);
};

export default Onboarding;
