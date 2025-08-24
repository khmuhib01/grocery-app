// components/product/ProductCard.jsx
import {Ionicons} from '@expo/vector-icons';
import {useState} from 'react';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function ProductCard({
	item,
	qty: controlledQty,
	onChangeQty,
	onAdd,
	width = 160,
	onPressCard,
	variant = 'list', // 'list' (carousel) | 'grid' (compact)
}) {
	const isControlled = typeof controlledQty === 'number';
	const [qtyUncontrolled, setQtyUncontrolled] = useState(0);
	const qty = isControlled ? controlledQty : qtyUncontrolled;

	const setQty = (next) => {
		if (!isControlled) setQtyUncontrolled(next);
		onChangeQty?.(next);
	};

	const handleAdd = () => {
		setQty(1);
		onAdd?.(item);
	};

	const isGrid = variant === 'grid';

	return (
		<Pressable
			style={[
				styles.card,
				{
					width,
					marginRight: isGrid ? 0 : 14, // 🔹 no right-gap inside grid
					padding: isGrid ? 10 : 12,
				},
			]}
			onPress={() => onPressCard?.(item)}
		>
			{item.off ? (
				<View style={styles.offBadge}>
					<Ionicons name="pricetag-outline" size={12} color={COLORS.primary} />
					<Text style={styles.offTop}>৳{item.off}</Text>
					<Text style={styles.offBottom}>OFF</Text>
				</View>
			) : null}

			<View style={[styles.imgWrap, {height: isGrid ? 100 : 120}]}>
				<Image source={{uri: item.img}} style={styles.img} resizeMode="cover" />
			</View>

			<Text style={[styles.name, {fontSize: isGrid ? 13 : 14}]} numberOfLines={2}>
				{item.name}
			</Text>
			<Text style={styles.unit}>EACH</Text>

			<View style={styles.priceRow}>
				{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
				<Text style={[styles.price, {fontSize: isGrid ? 15 : 16}]}>৳{Number(item.price).toLocaleString()}</Text>
			</View>

			<View style={styles.actionBottom}>
				{qty > 0 ? (
					<View style={[styles.stepper, {height: isGrid ? 32 : 34}]}>
						<TouchableOpacity onPress={() => setQty(Math.max(0, qty - 1))} style={styles.stepBtn} activeOpacity={0.8}>
							<Ionicons name="remove" size={18} color="#fff" />
						</TouchableOpacity>
						<Text style={styles.qtyText}>{qty}</Text>
						<TouchableOpacity onPress={() => setQty(qty + 1)} style={styles.stepBtn} activeOpacity={0.8}>
							<Ionicons name="add" size={18} color="#fff" />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation?.();
							handleAdd();
						}}
						style={[styles.addOutline, {height: isGrid ? 32 : 34, marginTop: isGrid ? 8 : 10}]}
						activeOpacity={0.9}
					>
						<Ionicons name="flash-outline" size={16} color={COLORS.primary} />
						<Text style={styles.addOutlineTxt}>ADD</Text>
					</TouchableOpacity>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 14,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 1,
		flexDirection: 'column',
	},
	offBadge: {
		position: 'absolute',
		left: 10,
		top: 10,
		backgroundColor: COLORS.brandGreenTint,
		width: 'auto',
		borderRadius: 4,
		borderColor: COLORS.primary,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
		flexDirection: 'row',
		paddingHorizontal: 6,
		paddingVertical: 2,
		gap: 4,
		transform: [{scale: 0.8}],
		transformOrigin: 'left top',
	},
	offTop: {color: COLORS.primary, fontSize: 10, fontWeight: '900'},
	offBottom: {color: COLORS.primary, fontSize: 10, fontWeight: '900'},
	imgWrap: {
		backgroundColor: '#f6fff4',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		borderRadius: 10,
		overflow: 'hidden',
	},
	img: {width: '100%', height: '100%'},
	unit: {color: COLORS.gray500, fontSize: 11, marginTop: 2, textTransform: 'uppercase'},
	name: {fontWeight: '800', color: COLORS.dark},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 13},
	price: {color: COLORS.dark, fontWeight: '900'},
	actionBottom: {marginTop: 'auto'},
	addOutline: {
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.primary,
		backgroundColor: '#f6fff4',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	addOutlineTxt: {color: COLORS.primary, fontWeight: '800'},
	stepper: {
		borderRadius: 8,
		backgroundColor: COLORS.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 6,
	},
	stepBtn: {width: 32, height: 28, borderRadius: 6, alignItems: 'center', justifyContent: 'center'},
	qtyText: {color: '#fff', fontWeight: '900', fontSize: 14},
});
