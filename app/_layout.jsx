// app/_layout.jsx
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {Colors} from '../constants/Colors';
import {store} from '../store';

const buildTheme = (scheme) => {
	const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
	const C = Colors[scheme ?? 'light'];
	return {
		...base,
		colors: {
			...base.colors,
			primary: C.tint,
			background: C.background,
			card: C.background,
			text: C.text,
			border: C.gray200 ?? '#e2e8f0',
			notification: C.tint,
		},
	};
};

export default function RootLayout() {
	const scheme = useColorScheme();
	const theme = buildTheme(scheme);

	return (
		<ThemeProvider value={theme}>
			<Provider store={store}>
				<Stack>
					{/* Initial gate */}
					<Stack.Screen name="index" options={{headerShown: false}} />

					{/* Tabs */}
					<Stack.Screen name="(tabs)" options={{headerShown: false}} />

					{/* Onboarding flow */}
					<Stack.Screen name="onboarding/index" options={{headerShown: false}} />

					{/* Auth */}
					<Stack.Screen name="auth/login" options={{title: 'Login'}} />

					{/* Search */}
					<Stack.Screen name="search/index" options={{title: 'Search'}} />

					{/* Fallback */}
					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
			</Provider>
		</ThemeProvider>
	);
}
