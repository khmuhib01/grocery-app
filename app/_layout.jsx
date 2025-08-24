// app/_layout.jsx
import {DarkTheme, DefaultTheme, ThemeProvider} from '@react-navigation/native';
import {Drawer} from 'expo-router/drawer';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import CategoriesDrawer from '../components/CategoriesDrawer'; // 👈 add this
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
				<Drawer
					screenOptions={{
						headerShown: false,
						drawerStyle: {width: '80%', backgroundColor: '#fff'},
						overlayColor: 'rgba(0,0,0,0.35)',
					}}
					drawerContent={(props) => <CategoriesDrawer {...props} />} // 👈 show only categories
				>
					{/* keep tabs visible in drawer list or hide, your call; typically we hide and just show categories */}
					<Drawer.Screen name="(tabs)" options={{drawerItemStyle: {display: 'none'}}} />

					{/* hide navigable routes from drawer */}
					{/* <Drawer.Screen name="index" options={{drawerItemStyle: {display: 'none'}}} />
					<Drawer.Screen name="onboarding/index" options={{drawerItemStyle: {display: 'none'}}} />
					<Drawer.Screen name="auth/login" options={{title: 'Login', drawerItemStyle: {display: 'none'}}} />
					<Drawer.Screen name="search/index" options={{title: 'Search', drawerItemStyle: {display: 'none'}}} />
					<Drawer.Screen name="+not-found" options={{drawerItemStyle: {display: 'none'}}} /> */}
				</Drawer>

				<StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
			</Provider>
		</ThemeProvider>
	);
}
