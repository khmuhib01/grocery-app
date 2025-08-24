// components/cart/CartBar.jsx
import {Ionicons} from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants/Colors';

export default function CartBar({items, count = 0, total = 0, onPress}) {
	const inset = useSafeAreaInsets();
	return (
		<View style={[styles.wrap, {paddingBottom: inset.bottom + 8}]}>
			<TouchableOpacity activeOpacity={0.9} style={styles.btn} onPress={onPress}>
				<Text style={styles.btnTxt}>
					{items} {count === 1 ? 'Item' : 'Items'}
				</Text>
				<Text style={styles.btnTxt}>৳{Number(total).toLocaleString()}</Text>
				<Text style={[styles.btnTxt, styles.bold]}>View Cart</Text>
				<Ionicons name="chevron-forward" size={18} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		position: 'absolute',
		left: 12,
		right: 12,
		bottom: 0,
		alignItems: 'center',
	},
	pills: {
		height: 24,
		marginBottom: 6,
		alignSelf: 'flex-start',
	},
	pill: {
		position: 'absolute',
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: COLORS.primary,
		opacity: 0.25,
	},
	btn: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
		backgroundColor: COLORS.primary,
		borderRadius: 24,
		paddingVertical: 12,
		paddingHorizontal: 16,
	},
	btnTxt: {color: '#fff', fontWeight: '700'},
	bold: {fontWeight: '900'},
});
