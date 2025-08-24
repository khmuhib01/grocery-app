// components/HomeHeader.jsx
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import {router} from 'expo-router';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function HomeHeader({
	etaText = 'Delivery in 59 minutes',
	area = 'Kachukhet',
	onPressLocation = () => router.push('/search'),
	onPressSearch = () => router.push('/search'),
	showSearch = true,
}) {
	const navigation = useNavigation();

	return (
		<View style={styles.headerWrap}>
			{/* top bar: menu • logo • settings */}
			<View style={styles.headerTop}>
				<TouchableOpacity style={styles.circleBtn} onPress={() => navigation?.openDrawer?.()} activeOpacity={0.9}>
					<Ionicons name="menu" size={20} color={COLORS.dark} />
				</TouchableOpacity>

				<View style={styles.brandRow}>
					<Text style={styles.brandPrimary}>test</Text>
					<Text style={styles.brandSecondary}>pro</Text>
					<Ionicons name="cart" size={16} color={COLORS.dark} style={styles.ml4} />
				</View>

				<TouchableOpacity style={styles.circleBtn} onPress={() => router.push('/profile')} activeOpacity={0.9}>
					<Ionicons name="settings-outline" size={20} color={COLORS.dark} />
				</TouchableOpacity>
			</View>

			{/* eta + location */}
			<TouchableOpacity style={styles.infoRow} onPress={onPressLocation} activeOpacity={0.95}>
				<View style={styles.etaPill}>
					<Ionicons name="time-outline" size={14} color={COLORS.primary} />
					<Text style={styles.etaText}>{etaText}</Text>
				</View>
				<View style={styles.etaPill}>
					<Ionicons name="location-outline" size={14} color={COLORS.primary} />
					<Text style={styles.etaText}>{area}</Text>
					<Ionicons name="chevron-forward" size={14} color={COLORS.primary} />
				</View>
			</TouchableOpacity>

			{/* header search */}
			{showSearch && (
				<TouchableOpacity style={styles.searchBar} onPress={onPressSearch} activeOpacity={0.95}>
					<Ionicons name="search" size={18} color={COLORS.gray500} />
					<Text style={styles.searchPlaceholder}>Search by product name or brand</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	headerWrap: {
		backgroundColor: COLORS.success, // ✅ fixed color
		paddingTop: 12,
		paddingHorizontal: 12,
		paddingBottom: 14,
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
	brandRow: {flexDirection: 'row', alignItems: 'center'},
	brandPrimary: {fontSize: 20, fontWeight: '900', color: COLORS.danger, textTransform: 'lowercase'},
	brandSecondary: {fontSize: 20, fontWeight: '900', color: COLORS.dark, marginLeft: 4, textTransform: 'lowercase'},
	ml4: {marginLeft: 4},

	infoRow: {marginTop: 10, gap: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
	etaPill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 999,
		backgroundColor: 'rgba(255,255,255,0.9)',
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.06)',
	},
	etaText: {color: COLORS.primary, fontWeight: '900', fontSize: 12},

	searchBar: {
		marginTop: 10,
		height: 46,
		borderRadius: 12,
		paddingHorizontal: 12,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: 'rgba(0,0,0,0.06)',
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 6},
		shadowRadius: 10,
		elevation: 2,
	},
	searchPlaceholder: {marginLeft: 8, color: COLORS.gray500, fontWeight: '700'},
});
