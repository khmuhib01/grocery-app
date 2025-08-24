// components/product/ProductCard.jsx
import {Ionicons} from '@expo/vector-icons';
import {Image, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../constants/Colors';
import {addToCart, decreaseQty, increaseQty} from '../../store/slices/cartSlice';

export default function ProductCard({
	item,
	width = 160,
	onPressCard, // optional (item => void)
	onChangeQty, // optional (nextQty => void)
}) {
	const dispatch = useDispatch();
	const qty = useSelector((s) => s.cart.items.find((i) => i.id === item.id)?.qty || 0);

	const handleAdd = () => {
		dispatch(addToCart(item));
		onChangeQty?.(1);
	};
	const handleInc = () => {
		dispatch(increaseQty(item.id));
		onChangeQty?.(qty + 1);
	};
	const handleDec = () => {
		if (qty > 0) {
			dispatch(decreaseQty(item.id));
			onChangeQty?.(qty - 1);
		}
	};

	const save = item.mrp ? Math.max(0, Number(item.mrp) - Number(item.price)) : 0;
	const offPct = item.mrp ? Math.round((save / Number(item.mrp)) * 100) : 0;

	return (
		<Pressable style={[styles.card, {width}]} onPress={() => onPressCard?.(item)} android_ripple={{color: '#eef2f7'}}>
			{/* Discount pill */}
			{save > 0 ? (
				<View style={styles.offPill}>
					<Ionicons name="pricetag-outline" size={12} color={COLORS.primary} />
					<Text style={styles.offPillTxt}>৳{save} off</Text>
				</View>
			) : null}

			{/* Image */}
			<View style={styles.imgWrap}>
				<Image source={{uri: item.img}} style={styles.img} resizeMode="cover" />
			</View>

			{/* Title + unit */}
			<Text style={styles.name} numberOfLines={2}>
				{item.name}
			</Text>
			<Text style={styles.unit}>EACH</Text>

			{/* Price row */}
			<View style={styles.priceRow}>
				{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
				<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
				{offPct > 0 ? (
					<View style={styles.saveChip}>
						<Text style={styles.saveChipTxt}>{offPct}%</Text>
					</View>
				) : null}
			</View>

			{/* Action area */}
			<View style={styles.actionBottom}>
				{qty > 0 ? (
					<View style={styles.stepper}>
						<TouchableOpacity onPress={handleDec} style={styles.stepBtn} hitSlop={8} activeOpacity={0.85}>
							<Ionicons name="remove" size={18} color="#fff" />
						</TouchableOpacity>
						<Text style={styles.qtyText}>{qty}</Text>
						<TouchableOpacity onPress={handleInc} style={styles.stepBtn} hitSlop={8} activeOpacity={0.85}>
							<Ionicons name="add" size={18} color="#fff" />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation?.();
							handleAdd();
						}}
						style={styles.addBtn}
						activeOpacity={0.9}
					>
						<Ionicons name="flash-outline" size={16} color={COLORS.primary} />
						<Text style={styles.addTxt}>ADD</Text>
					</TouchableOpacity>
				)}
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		backgroundColor: COLORS.white,
		padding: 12,
		marginRight: 14,
		borderWidth: 1,
		borderColor: '#EEF0F4',
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 6},
		shadowRadius: 12,
		elevation: 2,
	},

	// Discount pill (top-left)
	offPill: {
		position: 'absolute',
		left: 10,
		top: 10,
		zIndex: 2,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
		backgroundColor: COLORS.brandGreenTint,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	offPillTxt: {color: COLORS.primary, fontWeight: '900', fontSize: 11},

	imgWrap: {
		height: 124,
		backgroundColor: '#f6fff4',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
	},
	img: {width: '100%', height: '100%'},

	name: {fontWeight: '900', fontSize: 14, color: COLORS.dark},
	unit: {color: COLORS.gray500, fontSize: 11, marginTop: 2, textTransform: 'uppercase'},

	priceRow: {flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 6, flexWrap: 'wrap'},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', fontSize: 12, fontWeight: '700'},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 16},
	saveChip: {
		marginLeft: 'auto',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 8,
		backgroundColor: '#e8f7ff',
	},
	saveChipTxt: {fontSize: 11, fontWeight: '900', color: '#0284c7'},

	actionBottom: {marginTop: 10},

	// Add button
	addBtn: {
		height: 36,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.primary,
		backgroundColor: '#f6fff4',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
	},
	addTxt: {color: COLORS.primary, fontWeight: '900'},

	// Stepper (pill)
	stepper: {
		height: 36,
		borderRadius: 12,
		backgroundColor: COLORS.primary,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 8,
		shadowColor: COLORS.primary,
		shadowOpacity: 0.18,
		shadowOffset: {width: 0, height: 8},
		shadowRadius: 12,
		elevation: 2,
	},
	stepBtn: {
		width: 32,
		height: 28,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	qtyText: {color: '#fff', fontWeight: '900', fontSize: 14},
});
