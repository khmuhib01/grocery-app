// app/(drawer)/_layout.jsx
import {Drawer} from 'expo-router/drawer';
import CategoriesDrawer from '../../components/CategoriesDrawer';

export default function DrawerLayout() {
	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerStyle: {width: '80%', backgroundColor: '#fff'},
				overlayColor: 'rgba(0,0,0,0.35)',
			}}
			drawerContent={(props) => <CategoriesDrawer {...props} />}
		>
			{/* Tabs live INSIDE the drawer group */}
			<Drawer.Screen name="(tabs)" options={{drawerItemStyle: {display: 'none'}}} />
		</Drawer>
	);
}
