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
	const C = Colors[scheme ?? 'light'] ?? {};
	return {
		...base,
		colors: {
			...base.colors,
			primary: C.tint ?? base.colors.primary,
			background: C.background ?? base.colors.background,
			card: C.background ?? base.colors.card,
			text: C.text ?? base.colors.text,
			border: C.gray200 ?? '#e2e8f0',
			notification: C.tint ?? base.colors.notification,
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
					{/* Drawer app (tabs live inside it) */}
					<Stack.Screen name="(drawer)" options={{headerShown: false}} />

					{/* Push search on top of drawer so back arrow appears */}
					<Stack.Screen name="search" options={{title: 'Search', headerBackTitleVisible: false}} />
					<Stack.Screen name="checkout/index" options={{title: 'Checkout', headerBackTitleVisible: false}} />

					<Stack.Screen name="+not-found" />
				</Stack>
				<StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
			</Provider>
		</ThemeProvider>
	);
}
