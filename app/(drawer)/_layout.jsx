// app/(drawer)/_layout.jsx
import {Drawer} from 'expo-router/drawer';
import {useColorScheme} from 'react-native';
import CategoriesDrawer from '../../components/CategoriesDrawer';

export default function DrawerLayout() {
	const scheme = useColorScheme();
	return (
		<Drawer
			screenOptions={{
				headerShown: false,
				drawerStyle: {width: '80%', backgroundColor: '#fff'},
				overlayColor: 'rgba(0,0,0,0.35)',
			}}
			drawerContent={(props) => <CategoriesDrawer {...props} />}
		>
			{/* Your tabs live inside the Drawer */}
			<Drawer.Screen name="(tabs)" options={{drawerItemStyle: {display: 'none'}}} />
		</Drawer>
	);
}
