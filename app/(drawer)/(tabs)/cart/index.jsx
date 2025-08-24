// app/(drawer)/(tabs)/cart/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../constants/Colors';
import {clearCart, decreaseQty, increaseQty} from '../../../../store/slices/cartSlice';

const FREE_DELIVERY_THRESHOLD = 1500; // ৳ — change to your target

export default function CartScreen() {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();
	const {items, totalAmount, totalQty} = useSelector((s) => s.cart);

	// Compute MRP total & savings (if products have mrp)
	const mrpTotal = items.reduce((sum, it) => sum + (Number(it.mrp) || Number(it.price) || 0) * (it.qty || 0), 0);
	const savings = Math.max(0, mrpTotal - totalAmount);

	const remainingForFree = Math.max(0, FREE_DELIVERY_THRESHOLD - totalAmount);
	const progress = Math.min(1, totalAmount / FREE_DELIVERY_THRESHOLD);

	const renderItem = ({item}) => (
		<View style={styles.row}>
			<Image source={{uri: item.img}} style={styles.img} />
			<View style={{flex: 1, marginHorizontal: 10}}>
				<Text style={styles.itemName} numberOfLines={2}>
					{item.name}
				</Text>
				<Text style={styles.unit}>EACH</Text>

				<View style={styles.priceRow}>
					{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
					<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
				</View>
			</View>

			{/* Stepper */}
			<View style={styles.stepper}>
				<TouchableOpacity onPress={() => dispatch(decreaseQty(item.id))} style={styles.stepBtn} activeOpacity={0.8}>
					<Ionicons name="remove" size={16} color="#fff" />
				</TouchableOpacity>
				<Text style={styles.qtyText}>{item.qty}</Text>
				<TouchableOpacity onPress={() => dispatch(increaseQty(item.id))} style={styles.stepBtn} activeOpacity={0.8}>
					<Ionicons name="add" size={16} color="#fff" />
				</TouchableOpacity>
			</View>
		</View>
	);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#f7f8fa'}} edges={['top', 'left', 'right']}>
			{/* Summary header card */}
			<View style={styles.summaryCard}>
				<View style={styles.summaryTopRow}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<View style={styles.dot} />
						<Text style={styles.eta}>Delivery in 59 minutes</Text>
					</View>
					<Text style={styles.summaryRight}> </Text>
				</View>

				<Text style={styles.subMeta}>
					{totalQty} {totalQty === 1 ? 'Item' : 'Items'}
					{mrpTotal ? (
						<>
							<Text> • </Text>
							<Text style={styles.mrpSmall}>৳{mrpTotal.toLocaleString()}</Text>
							<Text> </Text>
							<Text style={styles.totalNow}>৳{Number(totalAmount).toLocaleString()}</Text>
						</>
					) : (
						<>
							<Text> • </Text>
							<Text style={styles.totalNow}>৳{Number(totalAmount).toLocaleString()}</Text>
						</>
					)}
				</Text>
			</View>

			<FlatList
				data={items}
				keyExtractor={(it) => it.id}
				renderItem={renderItem}
				ListEmptyComponent={
					<Text style={{textAlign: 'center', marginTop: 40, color: COLORS.gray500}}>Your cart is empty</Text>
				}
				contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 12}}
			/>

			{/* Add Product quick row */}
			<TouchableOpacity activeOpacity={0.9} onPress={() => router.push('/products')} style={styles.addProductRow}>
				<Ionicons name="add-circle" size={18} color={COLORS.primary} />
				<Text style={styles.addProductText}>Add Product</Text>
			</TouchableOpacity>

			{/* Free delivery progress */}
			<View style={styles.progressWrap}>
				<Text style={styles.progressText}>
					{remainingForFree > 0
						? `Shop ৳${remainingForFree.toLocaleString()} more to get FREE delivery`
						: 'You unlocked FREE delivery 🎉'}
				</Text>
				<View style={styles.progressBarBg}>
					<View style={[styles.progressBarFill, {width: `${progress * 100}%`}]} />
				</View>
			</View>

			{/* Sticky bottom CTA */}
			<SafeAreaView edges={['bottom']} style={[styles.bottomBar, {paddingBottom: Math.max(10, insets.bottom)}]}>
				<TouchableOpacity
					onPress={() => dispatch(clearCart())}
					style={[styles.ghostBtn, {opacity: items.length ? 1 : 0.5}]}
					disabled={!items.length}
				>
					<Ionicons name="trash-outline" size={16} color={COLORS.dark} />
					<Text style={styles.ghostTxt}>Clear</Text>
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => router.push('/checkout')}
					style={[styles.ctaBtn, {opacity: items.length ? 1 : 0.5}]}
					activeOpacity={0.9}
					disabled={!items.length}
				>
					<Text style={styles.ctaTxt}>Continue Checkout</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	summaryCard: {
		margin: 12,
		padding: 14,
		borderRadius: 14,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: '#eef0f4',
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 10,
		elevation: 2,
	},
	summaryTopRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
	dot: {width: 8, height: 8, borderRadius: 4, backgroundColor: COLORS.success, marginRight: 8},
	eta: {fontWeight: '800', color: COLORS.dark},
	summaryRight: {color: COLORS.gray500, fontWeight: '600'},
	subMeta: {marginTop: 4, color: COLORS.gray600, fontWeight: '700'},
	mrpSmall: {color: COLORS.gray400, textDecorationLine: 'line-through', fontWeight: '700'},
	totalNow: {color: COLORS.success, fontWeight: '900'},

	row: {
		position: 'relative',
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: '#eef0f4',
		backgroundColor: '#fff',
		borderRadius: 14,
		marginBottom: 10,
	},
	img: {width: 48, height: 48, borderRadius: 10, backgroundColor: '#f6fff4'},
	itemName: {fontWeight: '800', color: COLORS.dark},
	unit: {color: COLORS.gray400, fontSize: 11, marginTop: 2, textTransform: 'uppercase'},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 13, fontWeight: '700'},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 15},

	/* green pill stepper on the right */
	stepper: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.primary,
		borderRadius: 12,
		paddingHorizontal: 8,
		height: 34,
	},
	stepBtn: {
		width: 28,
		height: 28,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	qtyText: {color: '#fff', fontWeight: '900', fontSize: 14, minWidth: 22, textAlign: 'center'},

	removeBtn: {
		position: 'absolute',
		top: 8,
		right: 8,
		width: 22,
		height: 22,
		borderRadius: 6,
		backgroundColor: COLORS.danger,
		alignItems: 'center',
		justifyContent: 'center',
	},

	addProductRow: {
		marginHorizontal: 12,
		marginTop: 6,
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
	},
	addProductText: {color: COLORS.primary, fontWeight: '800'},

	progressWrap: {marginHorizontal: 12, marginBottom: 10},
	progressText: {fontSize: 12, color: COLORS.gray600, fontWeight: '700', marginBottom: 6, textAlign: 'center'},
	progressBarBg: {
		height: 8,
		borderRadius: 999,
		backgroundColor: '#e9edf3',
		overflow: 'hidden',
	},
	progressBarFill: {
		height: '100%',
		backgroundColor: COLORS.primary,
		borderRadius: 999,
	},

	bottomBar: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		paddingHorizontal: 12,
		paddingTop: 10,
		backgroundColor: '#f7f8fa',
		borderTopWidth: 1,
		borderColor: '#eef0f4',
	},
	ghostBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#eef2f7',
		paddingHorizontal: 14,
		height: 44,
		borderRadius: 12,
	},
	ghostTxt: {fontWeight: '800', color: COLORS.dark},

	ctaBtn: {
		flex: 1,
		backgroundColor: COLORS.primary,
		height: 48,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: COLORS.primary,
		shadowOpacity: 0.25,
		shadowOffset: {width: 0, height: 8},
		shadowRadius: 12,
		elevation: 3,
	},
	ctaTxt: {color: '#fff', fontWeight: '900', fontSize: 16},
});
