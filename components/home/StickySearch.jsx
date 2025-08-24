import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function StickySearch() {
	return (
		<View style={styles.stickyWrap}>
			<TouchableOpacity style={styles.searchBar} activeOpacity={0.9} onPress={() => router.push('/search')}>
				<Ionicons name="search" size={18} color={COLORS.white} />
				<Text style={styles.searchPlaceholder}>Search by product name or brand</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	stickyWrap: {
		backgroundColor: COLORS.success,
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 8,
		zIndex: 20,
		shadowOffset: {width: 0, height: 3},
		shadowRadius: 6,
	},
	searchBar: {
		backgroundColor: COLORS.success,
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.25)',
	},
	searchPlaceholder: {marginLeft: 8, color: COLORS.white, fontWeight: '600'},
});
