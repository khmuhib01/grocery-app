import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
	return (
		<View style={styles.wrap}>
			<Text style={styles.title}>Home</Text>
			<Text>Welcome to Grocery App 👋</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24},
	title: {fontSize: 22, fontWeight: '700', marginBottom: 8},
});
