import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from './../constants/Colors'; // ✅ global colors

export default function HomeHeader({
	etaText = 'Delivery in 59 minutes',
	area = 'Kachukhet',
	onPressLocation = () => {},
	onPressSearch = () => {},
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
				<Ionicons name="time-outline" size={16} color={COLORS.white} />
				<Text style={styles.etaText}>{etaText}</Text>
				<Ionicons name="location-outline" size={16} color={COLORS.white} style={styles.ml10} />
				<Text style={styles.areaText}>{area}</Text>
				<Ionicons name="chevron-forward" size={14} color={COLORS.white} />
			</TouchableOpacity>

			{/* search */}
			<TouchableOpacity style={styles.searchBar} onPress={onPressSearch} activeOpacity={0.9}>
				<Ionicons name="search" size={18} color={COLORS.gray500} />
				<Text style={styles.searchPlaceholder}>Search by product name or brand</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrap: {
		backgroundColor: COLORS.success,
		paddingTop: 12,
		paddingHorizontal: 12,
		paddingBottom: 14,
		borderBottomLeftRadius: 18,
		borderBottomRightRadius: 18,
	},
	headerTop: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	circleBtn: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	brandRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	brandMeena: {
		fontSize: 20,
		fontWeight: '900',
		color: COLORS.danger,
		textTransform: 'lowercase',
	},
	brandBazar: {
		fontSize: 20,
		fontWeight: '900',
		color: COLORS.dark,
		marginLeft: 4,
		textTransform: 'lowercase',
	},
	locationRow: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	etaText: {
		color: COLORS.white,
		marginLeft: 6,
		fontWeight: '700',
	},
	areaText: {
		color: COLORS.white,
		marginHorizontal: 6,
		fontWeight: '700',
	},
	searchBar: {
		marginTop: 10,
		backgroundColor: COLORS.white,
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
	},
	searchPlaceholder: {
		marginLeft: 8,
		color: COLORS.gray500,
		fontWeight: '600',
	},
	ml4: {marginLeft: 4},
	ml10: {marginLeft: 10},
});
