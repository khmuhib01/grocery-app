import {Ionicons} from '@expo/vector-icons';
import {Tabs} from 'expo-router';
import React from 'react';
import {Platform, TouchableOpacity, View} from 'react-native';

// Big circular middle button for Cart
function CartTabButton({children, onPress}) {
	return (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={onPress}
			style={{
				top: -22,
				justifyContent: 'center',
				alignItems: 'center',
				shadowColor: '#000',
				shadowOpacity: 0.15,
				shadowRadius: 8,
				shadowOffset: {width: 0, height: 4},
				elevation: 8,
			}}
		>
			<View
				style={{
					width: 64,
					height: 64,
					borderRadius: 32,
					backgroundColor: '#16a34a', // primary
					justifyContent: 'center',
					alignItems: 'center',
					borderWidth: 6,
					borderColor: '#ffffff', // white ring
				}}
			>
				{children}
			</View>
		</TouchableOpacity>
	);
}

export default function TabsLayout() {
	return (
		<Tabs
			initialRouteName="home/index"
			screenOptions={({route}) => ({
				headerShown: ['home/index', 'profile/index'].includes(route.name) ? false : true,
				tabBarShowLabel: false,
				tabBarActiveTintColor: '#16a34a',
				tabBarInactiveTintColor: '#94a3b8',
				tabBarStyle: {
					width: '90%',
					marginHorizontal: '5%',
					position: 'absolute',
					left: 12,
					right: 12,
					bottom: 12,
					height: 64,
					borderTopWidth: 0,
					backgroundColor: '#ffffff',
					borderRadius: 28,
					paddingBottom: Platform.OS === 'ios' ? 10 : 8,
					paddingTop: 8,
					shadowColor: '#000',
					shadowOpacity: 0.08,
					shadowRadius: 12,
					shadowOffset: {width: 0, height: 4},
					elevation: 10,
				},
				tabBarIcon: ({color, size, focused}) => {
					const nameMap = {
						'home/index': focused ? 'home' : 'home-outline',
						'cart/index': focused ? 'cart' : 'cart-outline',
						'orders/index': focused ? 'file-tray-full' : 'file-tray-full-outline',
						'profile/index': focused ? 'person' : 'person-outline',
						'products/index': focused ? 'grid' : 'grid-outline',
					};
					return <Ionicons name={nameMap[route.name] ?? 'home-outline'} size={size} color={color} />;
				},
			})}
		>
			<Tabs.Screen
				name="home/index"
				options={{
					title: 'Home',
					headerShown: false,
					tabBarIcon: ({color, focused}) => (
						<Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="products/index"
				options={{
					title: 'Products',
					tabBarIcon: ({color, focused}) => (
						<Ionicons name={focused ? 'grid' : 'grid-outline'} size={24} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="cart/index"
				options={{
					title: 'Cart',
					tabBarButton: (props) => <CartTabButton {...props} />,
					tabBarIcon: ({focused}) => <Ionicons name={focused ? 'cart' : 'cart-outline'} size={28} color="#ffffff" />,
				}}
			/>

			<Tabs.Screen
				name="orders/index"
				options={{
					title: 'Orders',
					tabBarIcon: ({color, focused}) => (
						<Ionicons name={focused ? 'file-tray-full' : 'file-tray-full-outline'} size={24} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile/index"
				options={{
					title: 'Profile',
					headerShown: false,
					tabBarIcon: ({color, focused}) => (
						<Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
