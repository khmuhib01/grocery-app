// app/(drawer)/(tabs)/checkout/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useMemo, useState} from 'react';
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/Colors';
import {applyCartDiscounts, applyDiscounts, calcShippingFee} from '../../data/homeData';

const formatBDT = (n) => `৳${Number(n || 0).toLocaleString()}`;

export default function CheckoutScreen() {
	const {items, totalAmount, totalQty} = useSelector((s) => s.cart);

	// UI state (skeleton)
	const [orderMode, setOrderMode] = useState('delivery'); // 'delivery' | 'pickup'
	const [voucher, setVoucher] = useState('');
	const [note, setNote] = useState('');
	const [payment, setPayment] = useState('cash'); // 'cash' | 'card' | 'bkash' | 'nagad'

	// ---- pricing math (kept from your helpers) ----
	const {discountItems, cartLevelDiscount, shipping, grandTotal} = useMemo(() => {
		const dItems = applyDiscounts(items); // item-level
		const dCart = applyCartDiscounts(totalAmount); // cart-level
		const ship = orderMode === 'delivery' ? calcShippingFee(totalAmount - dItems - dCart) : 0;
		const gt = Math.max(0, totalAmount - dItems - dCart + ship);
		return {
			discountItems: dItems,
			cartLevelDiscount: dCart,
			shipping: ship,
			grandTotal: gt,
		};
	}, [items, totalAmount, orderMode]);

	const disabled = totalQty === 0;

	const handleConfirm = () => {
		// Build a lightweight payload (you can still POST this to your API if needed)
		const payload = {
			order_mode: orderMode,
			payment_method: payment,
			note,
			voucher_code: voucher || null,
			items, // your cart items from Redux
			totals: {
				subtotal: totalAmount,
				discountItems,
				cartLevelDiscount,
				shipping,
				grandTotal,
			},
		};

		// TODO: call your confirmOrder API with `payload` if you want
		// await confirmOrder(payload)

		// After success → navigate to success screen with details
		router.replace({
			pathname: '/checkout/order-success', // because your file is app/checkout/order-success.jsx
			params: {
				orderId: `KHM-${Date.now().toString().slice(-6)}`, // or response.orderId
				total: grandTotal,
				etaMin: 35,
				etaMax: 55,
				payment:
					payment === 'cash'
						? 'Cash on Delivery'
						: payment === 'card'
						? 'Card'
						: payment === 'bkash'
						? 'bKash'
						: payment === 'nagad'
						? 'Nagad'
						: String(payment),
			},
		});
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
			<KeyboardAvoidingView behavior={Platform.select({ios: 'padding', android: undefined})} style={{flex: 1}}>
				{/* CONTENT */}
				<ScrollView contentContainerStyle={{padding: 12, paddingBottom: 120}}>
					<Header />

					{/* Order mode */}
					<Section title="Order Type">
						<PillToggle
							value={orderMode}
							onChange={setOrderMode}
							options={[
								{id: 'delivery', label: 'Delivery', icon: 'bicycle-outline'},
								{id: 'pickup', label: 'Pickup', icon: 'bag-handle-outline'},
							]}
						/>
						{orderMode === 'delivery' ? (
							<MiniRow
								icon="location-outline"
								label="Deliver to"
								value="Set your address"
								cta="Change"
								onPress={() => {}}
							/>
						) : (
							<MiniRow
								icon="storefront-outline"
								label="Pickup from"
								value="Select a store"
								cta="Change"
								onPress={() => {}}
							/>
						)}
					</Section>

					{/* Payment */}
					<Section title="Payment Method">
						<RadioRow
							icon="cash-outline"
							label="Cash on Delivery"
							value="cash"
							active={payment === 'cash'}
							onPress={() => setPayment('cash')}
						/>
						<RadioRow
							icon="card-outline"
							label="Card"
							value="card"
							active={payment === 'card'}
							onPress={() => setPayment('card')}
						/>
						<RadioRow
							icon="wallet-outline"
							label="bKash"
							value="bkash"
							active={payment === 'bkash'}
							onPress={() => setPayment('bkash')}
						/>
						<RadioRow
							icon="wallet-outline"
							label="Nagad"
							value="nagad"
							active={payment === 'nagad'}
							onPress={() => setPayment('nagad')}
						/>
					</Section>

					{/* Voucher */}
					<Section title="Voucher">
						<View style={styles.inputRow}>
							<Ionicons name="pricetag-outline" size={18} color={COLORS.dark} style={{marginRight: 8}} />
							<TextInput
								placeholder="Enter voucher code"
								placeholderTextColor={COLORS.gray400}
								value={voucher}
								onChangeText={setVoucher}
								style={styles.input}
								autoCapitalize="characters"
							/>
							<TouchableOpacity onPress={() => {}} style={styles.applyBtn} activeOpacity={0.9}>
								<Text style={styles.applyTxt}>Apply</Text>
							</TouchableOpacity>
						</View>
					</Section>

					{/* Note */}
					<Section title="Order Note">
						<TextInput
							placeholder="Add any special instructions (optional)"
							placeholderTextColor={COLORS.gray400}
							value={note}
							onChangeText={setNote}
							style={styles.textarea}
							multiline
						/>
					</Section>

					{/* Summary */}
					<TotalsCard
						subtotal={totalAmount}
						itemDiscount={discountItems}
						cartDiscount={cartLevelDiscount}
						shipping={shipping}
						grandTotal={grandTotal}
					/>
				</ScrollView>

				{/* STICKY BOTTOM BAR */}
				<View style={styles.bottomBarWrap}>
					<View style={styles.bottomBar}>
						<View>
							<Text style={styles.bottomLabel}>Grand Total</Text>
							<Text style={styles.bottomTotal}>{formatBDT(grandTotal)}</Text>
						</View>
						<TouchableOpacity
							onPress={handleConfirm}
							activeOpacity={0.9}
							style={[styles.confirmBtn, disabled && {opacity: 0.5}]}
							disabled={disabled}
						>
							<Ionicons name="lock-closed-outline" size={18} color="#fff" />
							<Text style={styles.confirmTxt}>Confirm Order</Text>
						</TouchableOpacity>
					</View>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}

/* ---------- UI Bits ---------- */

function Header() {
	return (
		<View style={styles.headerRow}>
			<Text style={styles.headerTitle}>Checkout</Text>
			<View style={styles.tag}>
				<Ionicons name="shield-checkmark-outline" size={14} color={COLORS.primary} />
				<Text style={styles.tagTxt}>Secure</Text>
			</View>
		</View>
	);
}

function Section({title, children}) {
	return (
		<View style={styles.section}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.card}>{children}</View>
		</View>
	);
}

function PillToggle({value, onChange, options}) {
	return (
		<View style={styles.pillWrap}>
			{options.map((o) => {
				const active = o.id === value;
				return (
					<TouchableOpacity
						key={o.id}
						onPress={() => onChange(o.id)}
						activeOpacity={0.9}
						style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
					>
						<Ionicons name={o.icon} size={16} color={active ? COLORS.primary : COLORS.dark} />
						<Text style={[styles.pillTxt, {color: active ? COLORS.primary : COLORS.dark}]}>{o.label}</Text>
					</TouchableOpacity>
				);
			})}
		</View>
	);
}

function MiniRow({icon, label, value, cta, onPress}) {
	return (
		<View style={styles.miniRow}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Ionicons name={icon} size={18} color={COLORS.dark} />
				<Text style={styles.miniLabel}>{label}</Text>
			</View>
			<TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.miniRight}>
				<Text style={styles.miniValue} numberOfLines={1}>
					{value}
				</Text>
				<Text style={styles.miniCta}>{cta}</Text>
			</TouchableOpacity>
		</View>
	);
}

function RadioRow({icon, label, active, onPress}) {
	return (
		<TouchableOpacity onPress={onPress} style={styles.radioRow} activeOpacity={0.9}>
			<View style={styles.radioLeft}>
				<Ionicons name={icon} size={18} color={COLORS.dark} style={{marginRight: 8}} />
				<Text style={styles.radioLabel}>{label}</Text>
			</View>
			<View style={[styles.radioDot, active && styles.radioDotActive]}>
				{active ? <View style={styles.radioDotInner} /> : null}
			</View>
		</TouchableOpacity>
	);
}

function TotalsCard({subtotal, itemDiscount, cartDiscount, shipping, grandTotal}) {
	return (
		<View style={[styles.card, {paddingVertical: 12}]}>
			<Row label="Subtotal" value={formatBDT(subtotal)} bold />
			<Row label="Item Discounts" value={`-${formatBDT(itemDiscount).slice(1)}`} />
			<Row label="Cart Discount" value={`-${formatBDT(cartDiscount).slice(1)}`} />
			<Row label="Shipping" value={formatBDT(shipping)} />
			<View style={styles.sep} />
			<Row label="Grand Total" value={formatBDT(grandTotal)} big bold />
		</View>
	);
}

function Row({label, value, bold, big}) {
	return (
		<View style={styles.row}>
			<Text style={[styles.lbl, bold && styles.bold, big && styles.big]}>{label}</Text>
			<Text style={[styles.val, bold && styles.bold, big && styles.big]}>{value}</Text>
		</View>
	);
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 12,
	},
	headerTitle: {fontSize: 22, fontWeight: '900', color: COLORS.dark},
	tag: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.brandGreenTint,
		borderWidth: 1,
		borderColor: COLORS.primary,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
		gap: 6,
	},
	tagTxt: {fontWeight: '800', color: COLORS.primary, fontSize: 12},

	section: {marginBottom: 14},
	sectionTitle: {fontSize: 16, fontWeight: '900', marginBottom: 8, color: COLORS.dark},

	card: {
		backgroundColor: COLORS.white,
		borderRadius: 14,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		padding: 12,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 1,
	},

	pillWrap: {flexDirection: 'row', gap: 10, marginBottom: 8},
	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 999,
	},
	pillActive: {backgroundColor: COLORS.brandGreenTint, borderWidth: 1, borderColor: COLORS.primary},
	pillInactive: {backgroundColor: COLORS.gray100},
	pillTxt: {fontWeight: '800'},

	miniRow: {
		marginTop: 6,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: 10,
	},
	miniLabel: {marginLeft: 8, fontWeight: '800', color: COLORS.dark},
	miniRight: {flexDirection: 'row', alignItems: 'center', gap: 10},
	miniValue: {color: COLORS.gray600, maxWidth: 160},
	miniCta: {fontWeight: '800', color: COLORS.primary},

	radioRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 10,
	},
	radioLeft: {flexDirection: 'row', alignItems: 'center'},
	radioLabel: {fontWeight: '700', color: COLORS.dark},
	radioDot: {
		width: 22,
		height: 22,
		borderRadius: 11,
		borderWidth: 2,
		borderColor: COLORS.gray400,
		alignItems: 'center',
		justifyContent: 'center',
	},
	radioDotActive: {borderColor: COLORS.primary},
	radioDotInner: {width: 12, height: 12, borderRadius: 6, backgroundColor: COLORS.primary},

	inputRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		paddingHorizontal: 10,
		height: 46,
		backgroundColor: COLORS.white,
	},
	input: {flex: 1, color: COLORS.dark, fontWeight: '700'},
	applyBtn: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: COLORS.brandGreenTint,
		borderWidth: 1,
		borderColor: COLORS.primary,
		borderRadius: 10,
	},
	applyTxt: {color: COLORS.primary, fontWeight: '800', fontSize: 12},

	textarea: {
		minHeight: 90,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		padding: 10,
		color: COLORS.dark,
		textAlignVertical: 'top',
	},

	row: {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6},
	lbl: {color: COLORS.dark},
	val: {color: COLORS.dark},
	bold: {fontWeight: '900'},
	big: {fontSize: 18},
	sep: {height: 1, backgroundColor: '#EDF1F7', marginVertical: 8},

	bottomBarWrap: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: 12,
		backgroundColor: 'rgba(255,255,255,0.9)',
	},
	bottomBar: {
		backgroundColor: COLORS.white,
		borderRadius: 16,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',

		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 6},
		shadowRadius: 10,
		elevation: 3,
	},
	bottomLabel: {color: COLORS.gray600, fontWeight: '700', fontSize: 12},
	bottomTotal: {color: COLORS.dark, fontWeight: '900', fontSize: 18},
	confirmBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 8,
		backgroundColor: COLORS.primary,
		paddingHorizontal: 16,
		height: 46,
		borderRadius: 12,
	},
	confirmTxt: {color: '#fff', fontWeight: '900', fontSize: 14},
});
