import {Colors} from '@/constants/Colors';
import {useColorScheme} from '@/hooks/useColorScheme';
import {Ionicons} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import {Platform} from 'react-native';

export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: false,

				tabBarStyle: Platform.select({
					ios: {
						// Use a transparent background on iOS to show the blur effect
						position: 'absolute',
					},
					default: {},
				}),
			}}
		>
			<Tabs.Screen
				name="home/HomeScreen"
				options={{
					title: 'Home',
					tabBarIcon: ({color}) => <Ionicons name="search" size={28} />,
				}}
			/>
			<Tabs.Screen
				name="orders/OrderScreen"
				options={{
					title: 'Explore',
					tabBarIcon: ({color}) => <Ionicons name="search" size={28} />,
				}}
			/>
			<Tabs.Screen
				name="search/SearchScreen"
				options={{
					title: 'Explore',
					tabBarIcon: ({color}) => <Ionicons name="search" size={28} />,
				}}
			/>
			<Tabs.Screen
				name="profile/ProfileScreen"
				options={{
					title: 'Explore',
					tabBarIcon: ({color}) => <Ionicons name="search" size={28} />,
				}}
			/>
		</Tabs>
	);
}
