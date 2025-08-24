// app/(drawer)/(tabs)/orders/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {useMemo, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../../constants/Colors';

// --- demo orders (replace with API later) ---
const ORDERS = [
	{
		id: 'MBZ-240001',
		placedAt: '2025-08-21 10:22',
		etaText: 'Arriving in 42–59 min',
		items: 6,
		mrp: 1300,
		total: 1140,
		status: 'ongoing', // ongoing | completed | cancelled
		address: 'Kachukhet, Dhaka 1206',
	},
	{
		id: 'MBZ-239912',
		placedAt: '2025-08-20 18:15',
		etaText: 'Delivered',
		items: 3,
		mrp: 520,
		total: 480,
		status: 'completed',
		address: 'Kachukhet, Dhaka 1206',
	},
	{
		id: 'MBZ-239811',
		placedAt: '2025-08-18 09:05',
		etaText: 'Cancelled',
		items: 2,
		mrp: 420,
		total: 0,
		status: 'cancelled',
		address: 'Kachukhet, Dhaka 1206',
	},
	{
		id: 'MBZ-239710',
		placedAt: '2025-08-16 13:48',
		etaText: 'Delivered',
		items: 8,
		mrp: 1750,
		total: 1595,
		status: 'completed',
		address: 'Banani, Dhaka 1213',
	},
];

const FILTERS = [
	{id: 'all', label: 'All'},
	{id: 'ongoing', label: 'Ongoing'},
	{id: 'completed', label: 'Completed'},
	{id: 'cancelled', label: 'Cancelled'},
];

const statusChip = (status) => {
	switch (status) {
		case 'ongoing':
			return {bg: COLORS.brandGreenTint, fg: COLORS.primary, icon: 'bicycle'};
		case 'completed':
			return {bg: '#e8f7ff', fg: '#0284c7', icon: 'checkmark-done-outline'};
		case 'cancelled':
			return {bg: '#fee2e2', fg: COLORS.danger, icon: 'close-circle-outline'};
		default:
			return {bg: COLORS.gray100, fg: COLORS.dark, icon: 'time-outline'};
	}
};

function Pill({active, label, onPress}) {
	return (
		<TouchableOpacity
			onPress={onPress}
			activeOpacity={0.9}
			style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}
		>
			<Text style={[styles.pillText, {color: active ? COLORS.primary : COLORS.dark}]}>{label}</Text>
		</TouchableOpacity>
	);
}

function OrderCard({order, onPress}) {
	const chip = statusChip(order.status);
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.card}>
			{/* top row: id + status chip */}
			<View style={styles.cardTopRow}>
				<Text style={styles.orderId}>{order.id}</Text>
				<View style={[styles.statusChip, {backgroundColor: chip.bg}]}>
					<Ionicons name={chip.icon} size={14} color={chip.fg} />
					<Text style={[styles.statusTxt, {color: chip.fg}]}>
						{order.status === 'ongoing' ? 'On the way' : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
					</Text>
				</View>
			</View>

			{/* meta */}
			<View style={styles.metaRow}>
				<Ionicons name="time-outline" size={14} color={COLORS.gray500} />
				<Text style={styles.metaTxt}>{order.placedAt}</Text>
			</View>
			<View style={styles.metaRow}>
				<Ionicons name="location-outline" size={14} color={COLORS.gray500} />
				<Text style={styles.metaTxt} numberOfLines={1}>
					{order.address}
				</Text>
			</View>

			{/* totals */}
			<View style={styles.totalsRow}>
				<View style={{flexDirection: 'row', alignItems: 'center'}}>
					<Ionicons name="cube-outline" size={16} color={COLORS.gray500} />
					<Text style={styles.itemsTxt}>
						{order.items} {order.items > 1 ? 'items' : 'item'}
					</Text>
				</View>

				<View style={styles.amountCol}>
					<Text style={styles.mrp}>৳{Number(order.mrp).toLocaleString()}</Text>
					<Text style={styles.total}>৳{Number(order.total).toLocaleString()}</Text>
				</View>
			</View>

			{/* bottom CTA row */}
			<View style={styles.ctaRow}>
				<View style={styles.etaPill}>
					<Ionicons name="time" size={14} color={COLORS.dark} />
					<Text style={styles.etaTxt}>{order.etaText}</Text>
				</View>

				<View style={{flexDirection: 'row', gap: 8}}>
					<TouchableOpacity activeOpacity={0.9} style={[styles.ghostBtn, {borderColor: COLORS.gray300}]}>
						<Ionicons name="receipt-outline" size={16} color={COLORS.dark} />
						<Text style={styles.ghostTxt}>Details</Text>
					</TouchableOpacity>
					{order.status !== 'cancelled' && (
						<TouchableOpacity activeOpacity={0.9} style={styles.primaryBtn}>
							<Ionicons name="repeat-outline" size={16} color="#fff" />
							<Text style={styles.primaryTxt}>Reorder</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default function OrdersScreen() {
	const [active, setActive] = useState('all');

	const filtered = useMemo(() => {
		if (active === 'all') return ORDERS;
		return ORDERS.filter((o) => o.status === active);
	}, [active]);

	return (
		<SafeAreaView style={styles.safe}>
			{/* header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>My Orders</Text>
				<TouchableOpacity activeOpacity={0.8} style={styles.headerBtn}>
					<Ionicons name="help-circle-outline" size={18} color={COLORS.dark} />
				</TouchableOpacity>
			</View>

			{/* filter pills */}
			<View style={styles.pillsRow}>
				{FILTERS.map((f) => (
					<Pill key={f.id} label={f.label} active={active === f.id} onPress={() => setActive(f.id)} />
				))}
			</View>

			{/* list */}
			<FlatList
				data={filtered}
				keyExtractor={(o) => o.id}
				contentContainerStyle={{padding: 12, paddingBottom: 24}}
				ItemSeparatorComponent={() => <View style={{height: 10}} />}
				renderItem={({item}) => <OrderCard order={item} onPress={() => {}} />}
				ListEmptyComponent={
					<View style={styles.emptyBox}>
						<Ionicons name="file-tray-outline" size={26} color={COLORS.gray400} />
						<Text style={styles.emptyTxt}>No orders here yet</Text>
					</View>
				}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {flex: 1, backgroundColor: '#fff'},

	// header
	header: {
		paddingHorizontal: 12,
		paddingTop: 6,
		paddingBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerTitle: {fontSize: 22, fontWeight: '900', color: COLORS.dark},
	headerBtn: {
		width: 36,
		height: 36,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.gray100,
	},

	// filter pills
	pillsRow: {flexDirection: 'row', paddingHorizontal: 12, marginBottom: 6},
	pill: {paddingVertical: 8, paddingHorizontal: 12, borderRadius: 18, marginRight: 8},
	pillActive: {backgroundColor: COLORS.brandGreenTint, borderWidth: 1, borderColor: COLORS.primary},
	pillInactive: {backgroundColor: COLORS.gray100},
	pillText: {fontWeight: '800', fontSize: 13},

	// card
	card: {
		backgroundColor: '#fff',
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
	cardTopRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
	orderId: {fontWeight: '900', color: COLORS.dark, fontSize: 15},
	statusChip: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 999,
		gap: 6,
	},
	statusTxt: {fontWeight: '800', fontSize: 12},

	metaRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
	metaTxt: {marginLeft: 6, color: COLORS.gray500, fontSize: 12},

	totalsRow: {
		marginTop: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	itemsTxt: {marginLeft: 6, color: COLORS.gray600, fontWeight: '700'},
	amountCol: {alignItems: 'flex-end'},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', fontSize: 13},
	total: {color: COLORS.dark, fontWeight: '900', fontSize: 18, marginTop: 2},

	ctaRow: {
		marginTop: 12,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	etaPill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderRadius: 10,
		backgroundColor: COLORS.gray100,
		gap: 6,
	},
	etaTxt: {fontWeight: '800', color: COLORS.dark, fontSize: 12},

	ghostBtn: {
		borderWidth: 1,
		borderRadius: 10,
		paddingHorizontal: 12,
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: '#fff',
	},
	ghostTxt: {fontWeight: '800', color: COLORS.dark},

	primaryBtn: {
		backgroundColor: COLORS.primary,
		borderRadius: 10,
		paddingHorizontal: 12,
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	primaryTxt: {color: '#fff', fontWeight: '900'},

	emptyBox: {alignItems: 'center', marginTop: 60, gap: 8},
	emptyTxt: {color: COLORS.gray400, fontWeight: '700'},
});
