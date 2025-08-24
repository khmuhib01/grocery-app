import {ScrollView, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../../components/HomeHeader';

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView>
				<HomeHeader
					etaText="Delivery in 59 minutes"
					area="Kachukhet"
					onPressLocation={() => console.log('change location')}
					onPressSearch={() => navigation.navigate('Search')}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({});
