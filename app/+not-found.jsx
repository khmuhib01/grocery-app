import {Stack, router} from 'expo-router';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function NotFoundScreen() {
	const goHome = () => router.replace('/(tabs)/home');

	return (
		<>
			<Stack.Screen options={{title: 'Oops!'}} />
			<View style={styles.container}>
				<Text style={styles.title}>This screen does not exist.</Text>

				<Pressable onPress={goHome} style={styles.link}>
					<Text style={styles.linkText}>Go to Home</Text>
				</Pressable>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20},
	title: {fontSize: 20, fontWeight: '600', marginBottom: 16},
	link: {marginTop: 15, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 8, backgroundColor: '#16a34a'},
	linkText: {color: '#fff', fontWeight: '600', fontSize: 16},
});
