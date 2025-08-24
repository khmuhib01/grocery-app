// app/auth/_layout.jsx
import {Stack} from 'expo-router';

export default function AuthLayout() {
	return (
		<Stack screenOptions={{headerShown: true}}>
			<Stack.Screen name="login" options={{title: 'Login', headerBackTitleVisible: false}} />
		</Stack>
	);
}
