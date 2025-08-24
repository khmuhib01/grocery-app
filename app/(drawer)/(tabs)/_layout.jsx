// app/(drawer)/(tabs)/_layout.jsx
import {Ionicons} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import React from 'react';
import {useSelector} from 'react-redux';
import {COLORS} from '../../../constants/Colors'; // ← adjust path if needed

export default function TabsLayout() {
	const totalQty = useSelector((s) => s.cart?.totalQty || 0);

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
					tabBarBadge: totalQty > 0 ? String(totalQty) : undefined,
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
