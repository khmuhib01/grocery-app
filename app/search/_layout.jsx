// app/search/_layout.jsx
import {Stack} from 'expo-router';

export default function SearchLayout() {
	return (
		<Stack screenOptions={{headerShown: false}}>
			<Stack.Screen
				name="index"
				options={{
					title: 'Search',
					headerBackTitleVisible: true,
				}}
			/>
		</Stack>
	);
}
