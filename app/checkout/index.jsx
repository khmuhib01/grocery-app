import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/Colors';
import {applyCartDiscounts, applyDiscounts, calcShippingFee} from '../../data/homeData';

export default function CheckoutScreen() {
	const {items, totalAmount} = useSelector((s) => s.cart);

	// demo calculations using helpers
	const discountItems = applyDiscounts(items);
	const cartLevelDiscount = applyCartDiscounts(totalAmount);
	const shipping = calcShippingFee(totalAmount - discountItems - cartLevelDiscount);
	const grandTotal = Math.max(0, totalAmount - discountItems - cartLevelDiscount + shipping);

	return (
		<View style={{flex: 1, backgroundColor: '#fff', padding: 12}}>
			<Text style={{fontSize: 18, fontWeight: '900', marginBottom: 10}}>Order Summary</Text>

			<Row label="Subtotal" value={totalAmount} bold />
			<Row label="Item Discounts" value={-discountItems} />
			<Row label="Cart Discount" value={-cartLevelDiscount} />
			<Row label="Shipping" value={shipping} />
			<View style={{height: 8}} />
			<Row label="Grand Total" value={grandTotal} big bold />

			<TouchableOpacity
				style={styles.btn}
				activeOpacity={0.9}
				onPress={() => alert('Confirm Order → Integrate your API')}
			>
				<Text style={styles.btnTxt}>Confirm Order</Text>
			</TouchableOpacity>
		</View>
	);
}

function Row({label, value, bold, big}) {
	return (
		<View style={styles.row}>
			<Text style={[styles.lbl, bold && styles.bold, big && styles.big]}>{label}</Text>
			<Text style={[styles.val, bold && styles.bold, big && styles.big]}>৳{Number(value).toLocaleString()}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6},
	lbl: {color: COLORS.dark},
	val: {color: COLORS.dark},
	bold: {fontWeight: '900'},
	big: {fontSize: 18},
	btn: {
		marginTop: 16,
		backgroundColor: COLORS.primary,
		height: 50,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {color: '#fff', fontWeight: '900', fontSize: 16},
});
