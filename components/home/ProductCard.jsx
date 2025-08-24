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
	onChangeQty, // optional (nextQty => void) - we'll still call it if provided
}) {
	const dispatch = useDispatch();

	// derive current qty for this item from the cart
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

	return (
		<Pressable style={[styles.card, {width}]} onPress={() => onPressCard?.(item)}>
			{item.off ? (
				<View style={styles.offBadge}>
					<Text style={styles.offTop}>৳{item.off}</Text>
					<Text style={styles.offBottom}>OFF</Text>
				</View>
			) : null}

			<View style={styles.imgWrap}>
				<Image source={{uri: item.img}} style={styles.img} resizeMode="cover" />
			</View>

			<Text style={styles.name} numberOfLines={2}>
				{item.name}
			</Text>
			<Text style={styles.unit}>EACH</Text>

			<View style={styles.priceRow}>
				{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
				<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
			</View>

			<View style={styles.actionBottom}>
				{qty > 0 ? (
					<View style={styles.stepper}>
						<TouchableOpacity onPress={handleDec} style={styles.stepBtn} activeOpacity={0.8}>
							<Ionicons name="remove" size={18} color="#fff" />
						</TouchableOpacity>
						<Text style={styles.qtyText}>{qty}</Text>
						<TouchableOpacity onPress={handleInc} style={styles.stepBtn} activeOpacity={0.8}>
							<Ionicons name="add" size={18} color="#fff" />
						</TouchableOpacity>
					</View>
				) : (
					<TouchableOpacity
						onPress={(e) => {
							e.stopPropagation?.();
							handleAdd();
						}}
						style={styles.addOutline}
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
		padding: 12,
		marginRight: 14,
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
		left: 8,
		top: 8,
		backgroundColor: COLORS.danger,
		width: 36,
		height: 40,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: 2,
	},
	offTop: {color: '#fff', fontSize: 10, fontWeight: '900', lineHeight: 12},
	offBottom: {color: '#fff', fontSize: 10, fontWeight: '900', marginTop: 2},
	imgWrap: {
		height: 120,
		backgroundColor: '#f6fff4',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 10,
		borderRadius: 10,
		overflow: 'hidden',
	},
	img: {width: '100%', height: '100%'},
	unit: {color: COLORS.gray500, fontSize: 11, marginTop: 2, textTransform: 'uppercase'},
	name: {fontWeight: '800', fontSize: 14, color: COLORS.dark},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 13},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 16},
	actionBottom: {marginTop: 'auto'},
	addOutline: {
		marginTop: 10,
		height: 34,
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
		marginTop: 10,
		height: 34,
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
