// app/(drawer)/(tabs)/orders/[id].jsx
import {Ionicons} from '@expo/vector-icons';
import {router, useLocalSearchParams} from 'expo-router';
import {useMemo} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {COLORS} from '../../../../constants/Colors';
import {addToCart} from '../../../../store/slices/cartSlice';

// --- Demo: you can fetch by id later ---
const MOCK_ORDERS = {
	'MBZ-240001': {
		id: 'MBZ-240001',
		placedAt: '2025-08-21 10:22',
		status: 'ongoing', // ongoing | completed | cancelled
		etaText: 'Arriving in 42–59 min',
		address: {
			name: 'John Doe',
			phone: '+8801XXXXXXX',
			line: 'House 12, Road 3, Kachukhet',
			city: 'Dhaka 1206',
		},
		payment: {method: 'Cash on Delivery', last4: null},
		deliveryFee: 50,
		items: [
			{
				id: 'p1',
				name: 'ACI Aerosol Insect Spray 800ml',
				img: 'https://picsum.photos/seed/aci/120',
				mrp: 620,
				price: 550,
				qty: 1,
			},
			{
				id: 'p2',
				name: 'Aci Pure Coriander Powder 200gm',
				img: 'https://picsum.photos/seed/coriander/120',
				mrp: 110,
				price: 90,
				qty: 1,
			},
			{
				id: 'p3',
				name: 'Aci Pure Mustard Oil 500ml',
				img: 'https://picsum.photos/seed/mustard/120',
				mrp: 165,
				price: 140,
				qty: 1,
			},
			{
				id: 'p4',
				name: 'Aci Pure Shahi Roast Masala 35gm',
				img: 'https://picsum.photos/seed/roast/120',
				mrp: 65,
				price: 60,
				qty: 1,
			},
			{
				id: 'p5',
				name: 'Acnol Antibac Hw Berry Blast Pump 200ml',
				img: 'https://picsum.photos/seed/berry/120',
				mrp: 120,
				price: 100,
				qty: 1,
			},
			{
				id: 'p6',
				name: 'ACNOL FOAMING HW FRUIT SPLASH PUMP 250ml',
				img: 'https://picsum.photos/seed/fruit/120',
				mrp: 220,
				price: 200,
				qty: 1,
			},
		],
	},
};

const statusMeta = (status) => {
	switch (status) {
		case 'ongoing':
			return {label: 'On the way', bg: COLORS.brandGreenTint, fg: COLORS.primary, icon: 'bicycle'};
		case 'completed':
			return {label: 'Delivered', bg: '#e8f7ff', fg: '#0284c7', icon: 'checkmark-done-outline'};
		case 'cancelled':
			return {label: 'Cancelled', bg: '#fee2e2', fg: COLORS.danger, icon: 'close-circle-outline'};
		default:
			return {label: 'Processing', bg: COLORS.gray100, fg: COLORS.dark, icon: 'time-outline'};
	}
};

const Timeline = ({status}) => {
	const steps = [
		{id: 'confirmed', label: 'Confirmed', icon: 'checkmark-circle'},
		{id: 'packed', label: 'Packed', icon: 'cube'},
		{id: 'out', label: 'Out for delivery', icon: 'bicycle'},
		{
			id: status === 'cancelled' ? 'cancelled' : 'delivered',
			label: status === 'cancelled' ? 'Cancelled' : 'Delivered',
			icon: status === 'cancelled' ? 'close-circle' : 'home',
		},
	];
	const activeIndex = status === 'ongoing' ? 2 : status === 'completed' ? 3 : status === 'cancelled' ? 3 : 1;

	return (
		<View style={styles.timeline}>
			{steps.map((s, i) => {
				const active = i <= activeIndex;
				return (
					<View key={s.id} style={styles.timeStep}>
						<View style={[styles.timeDot, {backgroundColor: active ? COLORS.primary : COLORS.gray300}]}>
							<Ionicons name={s.icon} size={12} color="#fff" />
						</View>
						<Text style={[styles.timeLabel, {color: active ? COLORS.dark : COLORS.gray400}]}>{s.label}</Text>
						{i < steps.length - 1 && (
							<View style={[styles.timeBar, {backgroundColor: i < activeIndex ? COLORS.primary : COLORS.gray200}]} />
						)}
					</View>
				);
			})}
		</View>
	);
};

export default function OrderDetailScreen() {
	const {id} = useLocalSearchParams();
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	const order = MOCK_ORDERS[id] || Object.values(MOCK_ORDERS)[0];

	const totals = useMemo(() => {
		const mrp = order.items.reduce((s, it) => s + (Number(it.mrp) || Number(it.price) || 0) * it.qty, 0);
		const sub = order.items.reduce((s, it) => s + Number(it.price) * it.qty, 0);
		const save = Math.max(0, mrp - sub);
		const delivery = Number(order.deliveryFee) || 0;
		const grand = sub + delivery;
		return {mrp, sub, save, delivery, grand};
	}, [order]);

	const meta = statusMeta(order.status);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#f7f8fa'}} edges={['top', 'left', 'right']}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
					<Ionicons name="chevron-back" size={20} color={COLORS.dark} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Order {order.id}</Text>
				<View style={styles.iconBtn} />
			</View>

			<ScrollView contentContainerStyle={{padding: 12, paddingBottom: insets.bottom + 90}}>
				{/* Status Card */}
				<View style={styles.card}>
					<View style={styles.statusRow}>
						<View style={[styles.statusChip, {backgroundColor: meta.bg}]}>
							<Ionicons name={meta.icon} size={14} color={meta.fg} />
							<Text style={[styles.statusTxt, {color: meta.fg}]}>{meta.label}</Text>
						</View>
						<Text style={styles.placedAt}>{order.placedAt}</Text>
					</View>
					<Text style={styles.etaText}>{order.etaText}</Text>
					<Timeline status={order.status} />
				</View>

				{/* Address & Payment */}
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Delivery</Text>
					<View style={styles.rowLine}>
						<Ionicons name="location-outline" size={16} color={COLORS.dark} />
						<View style={{marginLeft: 8, flex: 1}}>
							<Text style={styles.bold}>
								{order.address.name} • {order.address.phone}
							</Text>
							<Text style={styles.gray}>{order.address.line}</Text>
							<Text style={styles.gray}>{order.address.city}</Text>
						</View>
					</View>

					<View style={[styles.rowLine, {marginTop: 12}]}>
						<Ionicons name="card-outline" size={16} color={COLORS.dark} />
						<View style={{marginLeft: 8, flex: 1}}>
							<Text style={styles.bold}>{order.payment.method}</Text>
							{order.payment.last4 ? <Text style={styles.gray}>•••• {order.payment.last4}</Text> : null}
						</View>
					</View>
				</View>

				{/* Items */}
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
					{order.items.map((it) => (
						<View key={it.id} style={styles.itemRow}>
							<Image source={{uri: it.img}} style={styles.itemImg} />
							<View style={{flex: 1, marginHorizontal: 10}}>
								<Text style={styles.itemName} numberOfLines={2}>
									{it.name}
								</Text>
								<Text style={styles.unit}>EACH</Text>
								<View style={styles.priceRow}>
									{it.mrp ? <Text style={styles.mrp}>৳{Number(it.mrp).toLocaleString()}</Text> : null}
									<Text style={styles.price}>৳{Number(it.price).toLocaleString()}</Text>
								</View>
							</View>
							<Text style={styles.qtyPill}>× {it.qty}</Text>
						</View>
					))}
				</View>

				{/* Totals */}
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Summary</Text>
					<RowKV k="MRP" v={`৳${totals.mrp.toLocaleString()}`} muted strikethrough />
					<RowKV k="Subtotal" v={`৳${totals.sub.toLocaleString()}`} bold />
					<RowKV k="Savings" v={`- ৳${totals.save.toLocaleString()}`} green />
					<RowKV k="Delivery Fee" v={`৳${totals.delivery.toLocaleString()}`} />
					<View style={styles.hr} />
					<RowKV k="Total" v={`৳${totals.grand.toLocaleString()}`} bold big />
				</View>

				{/* Actions */}
				<View style={styles.actionsRow}>
					<TouchableOpacity style={styles.ghostBtn}>
						<Ionicons name="download-outline" size={16} color={COLORS.dark} />
						<Text style={styles.ghostTxt}>Invoice</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.ghostBtn}>
						<Ionicons name="chatbubble-ellipses-outline" size={16} color={COLORS.dark} />
						<Text style={styles.ghostTxt}>Support</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{/* Sticky Reorder */}
			<SafeAreaView edges={['bottom']} style={styles.bottomBar}>
				<TouchableOpacity
					activeOpacity={0.9}
					style={styles.ctaBtn}
					onPress={() => {
						// simple "reorder": put all items back to cart
						order.items.forEach((it) => {
							for (let i = 0; i < it.qty; i++) dispatch(addToCart(it));
						});
						router.push('/cart');
					}}
				>
					<Ionicons name="repeat-outline" size={18} color="#fff" />
					<Text style={styles.ctaTxt}>Reorder Items</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaView>
	);
}

function RowKV({k, v, muted, strikethrough, green, bold, big}) {
	return (
		<View style={styles.kvRow}>
			<Text style={[styles.kvKey, muted && {color: COLORS.gray500}, big && {fontSize: 16}]}>{k}</Text>
			<Text
				style={[
					styles.kvVal,
					strikethrough && {textDecorationLine: 'line-through', color: COLORS.gray400},
					green && {color: COLORS.primary, fontWeight: '900'},
					bold && {fontWeight: '900'},
					big && {fontSize: 18},
				]}
			>
				{v}
			</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		paddingHorizontal: 12,
		paddingTop: 6,
		paddingBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#f7f8fa',
	},
	iconBtn: {
		width: 36,
		height: 36,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.gray100,
	},
	headerTitle: {fontSize: 18, fontWeight: '900', color: COLORS.dark},

	card: {
		borderRadius: 14,
		backgroundColor: '#fff',
		padding: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		marginBottom: 10,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 1,
	},

	statusRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
	statusChip: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 999,
		gap: 6,
	},
	statusTxt: {fontWeight: '800', fontSize: 12},
	placedAt: {color: COLORS.gray500, fontWeight: '700'},
	etaText: {marginTop: 8, fontWeight: '900', color: COLORS.dark},

	timeline: {marginTop: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
	timeStep: {flex: 1, alignItems: 'center'},
	timeDot: {width: 26, height: 26, borderRadius: 13, alignItems: 'center', justifyContent: 'center'},
	timeLabel: {marginTop: 6, fontSize: 11, fontWeight: '800'},
	timeBar: {position: 'absolute', right: -12, top: 13, width: 24, height: 3, borderRadius: 2},

	rowLine: {flexDirection: 'row', alignItems: 'center'},
	sectionTitle: {fontWeight: '900', color: COLORS.dark, marginBottom: 10, fontSize: 16},

	itemRow: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#f1f3f6',
	},
	itemImg: {width: 48, height: 48, borderRadius: 10, backgroundColor: '#f6fff4'},
	itemName: {fontWeight: '800', color: COLORS.dark},
	unit: {color: COLORS.gray400, fontSize: 11, marginTop: 2, textTransform: 'uppercase'},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 12, fontWeight: '700'},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 14},
	qtyPill: {fontWeight: '900', color: COLORS.dark},

	kvRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6},
	kvKey: {color: COLORS.gray600, fontWeight: '800'},
	kvVal: {color: COLORS.dark, fontWeight: '800'},
	hr: {height: 1, backgroundColor: '#eef0f4', marginVertical: 8},

	actionsRow: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'space-between',
		marginBottom: 4,
	},
	ghostBtn: {
		flex: 1,
		height: 44,
		borderRadius: 12,
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 6,
		backgroundColor: '#fff',
		borderColor: '#E7EAF0',
	},
	ghostTxt: {fontWeight: '900', color: COLORS.dark},

	bottomBar: {
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#f7f8fa',
		borderTopWidth: 1,
		borderColor: '#eef0f4',
	},
	ctaBtn: {
		height: 48,
		borderRadius: 12,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 8,
		shadowColor: COLORS.primary,
		shadowOpacity: 0.25,
		shadowOffset: {width: 0, height: 8},
		shadowRadius: 12,
		elevation: 3,
	},
	ctaTxt: {color: '#fff', fontWeight: '900', fontSize: 16},
});
