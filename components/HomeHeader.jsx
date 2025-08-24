import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from './../constants/Colors';

export default function HomeHeader({
	etaText = 'Delivery in 59 minutes',
	area = 'Kachukhet',
	onPressLocation = () => {
		router.push('/search');
	},
	onPressSearch = () => {
		console.log('search');
	},
	showSearch = true, // controls whether header shows its own search
}) {
	return (
		<View style={styles.headerWrap}>
			{/* top bar: menu • logo • settings */}
			<View style={styles.headerTop}>
				<TouchableOpacity style={styles.circleBtn} onPress={() => console.log('menu')}>
					<Ionicons name="menu" size={22} color={COLORS.dark} />
				</TouchableOpacity>

				<View style={styles.brandRow}>
					<Text style={styles.brandMeena}>test</Text>
					<Text style={styles.brandBazar}>pro</Text>
					<Ionicons name="cart" size={16} color={COLORS.dark} style={styles.ml4} />
				</View>

				<TouchableOpacity style={styles.circleBtn} onPress={() => console.log('settings')}>
					<Ionicons name="settings-outline" size={20} color={COLORS.dark} />
				</TouchableOpacity>
			</View>

			{/* eta + location */}
			<TouchableOpacity style={styles.locationRow} onPress={onPressLocation} activeOpacity={0.9}>
				<View style={styles.etaRow}>
					<Ionicons name="time-outline" size={16} color={COLORS.white} />
					<Text style={styles.etaText}>{etaText}</Text>
					<Ionicons name="location-outline" size={16} color={COLORS.white} style={styles.ml10} />
					<Text style={styles.areaText}>{area}</Text>
				</View>
				<View style={styles.rightArrow}>
					<Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
				</View>
			</TouchableOpacity>

			{/* header search (only if you want it) */}
			{showSearch && (
				<TouchableOpacity style={styles.searchBar} onPress={onPressSearch} activeOpacity={0.9}>
					<Ionicons name="search" size={18} color={COLORS.white} />
					<Text style={styles.searchPlaceholder}>Search by product name or brand</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrap: {
		backgroundColor: COLORS.success,
		paddingTop: 12,
		paddingHorizontal: 12,
		paddingBottom: 14,
	},
	headerTop: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: COLORS.success,
	},
	circleBtn: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	brandRow: {flexDirection: 'row', alignItems: 'center'},
	brandMeena: {fontSize: 20, fontWeight: '900', color: COLORS.danger, textTransform: 'lowercase'},
	brandBazar: {fontSize: 20, fontWeight: '900', color: COLORS.dark, marginLeft: 4, textTransform: 'lowercase'},

	locationRow: {flexDirection: 'row', alignItems: 'center', marginTop: 10, justifyContent: 'space-between'},
	etaRow: {flexDirection: 'row', alignItems: 'center'},
	etaText: {color: COLORS.white, marginLeft: 6, fontWeight: '700'},
	rightArrow: {
		width: 20,
		height: 20,
		borderRadius: 16,
		backgroundColor: COLORS.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	areaText: {color: COLORS.white, marginHorizontal: 6, fontWeight: '700'},

	searchBar: {
		marginTop: 10,
		backgroundColor: COLORS.success,
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.25)',
	},
	searchPlaceholder: {marginLeft: 8, color: COLORS.white, fontWeight: '600'}, // ✅ white text
	ml4: {marginLeft: 4},
	ml10: {marginLeft: 10},
});
