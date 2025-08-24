// app/(drawer)/(tabs)/_layout.jsx
import {Ionicons} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS} from '../../../constants/Colors';

export default function TabsLayout() {
	// count items array length
	const cartLength = useSelector((s) => s.cart?.items?.length || 0);

	return (
		<Tabs screenOptions={{headerShown: false}}>
			<Tabs.Screen
				name="home/index"
				options={{
					title: 'Home',
					tabBarIcon: ({color, size}) => <Ionicons name="home-outline" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="products/index"
				options={{
					title: 'Products',
					tabBarIcon: ({color, size}) => <Ionicons name="grid-outline" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="cart/index"
				options={{
					title: 'Cart',
					tabBarIcon: ({color, size}) => <Ionicons name="cart-outline" color={color} size={size} />,
					// just show the number of different items in cart
					tabBarBadge: cartLength > 0 ? String(cartLength) : undefined,
					tabBarBadgeStyle: {backgroundColor: COLORS.primary, color: '#fff'},
				}}
			/>
			<Tabs.Screen
				name="orders/index"
				options={{
					title: 'Orders',
					tabBarIcon: ({color, size}) => <Ionicons name="file-tray-full-outline" color={color} size={size} />,
				}}
			/>
			<Tabs.Screen
				name="profile/index"
				options={{
					title: 'Profile',
					tabBarIcon: ({color, size}) => <Ionicons name="person-outline" color={color} size={size} />,
				}}
			/>
		</Tabs>
	);
}
