import {useRouter} from 'expo-router';
import {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/Colors'; // ✅ global colors

export default function Home() {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.replace('/(drawer)/(tabs)/home');
		}, 2000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<View style={styles.container}>
			<Image source={require('../assets/images/splash-icon.png')} style={styles.image} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.danger, // 🔴 red from global
	},
	image: {
		width: 450,
		height: 200,
		resizeMode: 'cover',
	},
});
