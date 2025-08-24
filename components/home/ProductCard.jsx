import {Ionicons} from '@expo/vector-icons';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function ProductCard({item, onAdd}) {
	return (
		<View style={styles.productCard}>
			{item.off ? (
				<View style={styles.offBadge}>
					<Text style={styles.offBadgeText}>-{item.off}%</Text>
				</View>
			) : null}
			<Image source={{uri: item.img}} style={styles.productImg} resizeMode="cover" />
			<Text style={styles.unitText}>{item.unit}</Text>
			<Text style={styles.productName} numberOfLines={2}>
				{item.name}
			</Text>
			<View style={styles.priceRow}>
				{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
				<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
			</View>
			<TouchableOpacity onPress={onAdd} style={styles.addBtn} activeOpacity={0.9}>
				<Ionicons name="add" size={20} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	productCard: {
		width: 180,
		borderRadius: 18,
		backgroundColor: COLORS.white,
		padding: 12,
		marginRight: 14,
		shadowColor: COLORS.black,
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 3,
	},
	offBadge: {
		position: 'absolute',
		left: 10,
		top: 10,
		backgroundColor: COLORS.danger,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		zIndex: 1,
	},
	offBadgeText: {color: COLORS.white, fontWeight: '700', fontSize: 12},
	productImg: {width: '100%', height: 120, borderRadius: 14, marginBottom: 10},
	unitText: {color: COLORS.gray500, fontSize: 12, textAlign: 'center'},
	productName: {fontWeight: '700', textAlign: 'center', marginTop: 4, fontSize: 14},
	priceRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 6, fontSize: 13},
	price: {color: COLORS.primary, fontWeight: '800', fontSize: 15},
	addBtn: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: COLORS.primary,
		shadowOpacity: 0.3,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 4,
	},
});
