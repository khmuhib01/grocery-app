// app/orders/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {router, useLocalSearchParams} from 'expo-router';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Image, Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {COLORS} from '../../constants/Colors';

export default function OrderTrackingScreen() {
	const {orderId: orderParam, payment, total, etaMin: eMin, etaMax: eMax} = useLocalSearchParams();
	const cart = useSelector((s) => s.cart);

	// --- derive basics (fallbacks allow opening without params) ---
	const orderId = String(orderParam || `MBZ-${Date.now().toString().slice(-6)}`);
	const orderTotal = Number(total ?? cart.totalAmount ?? 0);
	const etaMin = Number(eMin ?? 35);
	const etaMax = Number(eMax ?? 55);
	const paymentMethod = String(payment || 'Cash on Delivery');

	// --- demo status model (replace with API polling later) ---
	const steps = useMemo(
		() => [
			{id: 'placed', title: 'Order Placed', desc: 'We’ve received your order.'},
			{id: 'confirmed', title: 'Confirmed', desc: 'Store confirmed your order.'},
			{id: 'packed', title: 'Packed', desc: 'Items are being packed.'},
			{id: 'out', title: 'Out for Delivery', desc: 'Rider is on the way.'},
			{id: 'delivered', title: 'Delivered', desc: 'Order delivered. Enjoy!'},
		],
		[]
	);

	// Simulate movement for demo (advance every ~25s)
	const [activeIndex, setActiveIndex] = useState(2); // start at "Packed" for demo
	useEffect(() => {
		const t = setInterval(() => {
			setActiveIndex((i) => (i < steps.length - 1 ? i + 1 : i));
		}, 25000);
		return () => clearInterval(t);
	}, [steps.length]);

	// --- simple progress bar (no reanimated to avoid version issues) ---
	const prog = useRef(new Animated.Value(0)).current;
	useEffect(() => {
		const pct = (activeIndex / (steps.length - 1)) * 100;
		Animated.timing(prog, {toValue: pct, duration: 500, useNativeDriver: false}).start();
	}, [activeIndex, steps.length, prog]);

	const widthInterpolate = prog.interpolate({
		inputRange: [0, 100],
		outputRange: ['0%', '100%'],
	});

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
			<StatusBar barStyle="dark-content" />
			{/* Header / Hero */}
			<LinearGradient
				colors={[COLORS.brandGreenTint, '#ffffff']}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				style={styles.hero}
			>
				<View style={styles.topRow}>
					<Text style={styles.title}>Track your order</Text>
					<TouchableOpacity style={styles.iconBtn} onPress={() => router.replace('/')}>
						<Ionicons name="home-outline" size={18} color={COLORS.primary} />
					</TouchableOpacity>
				</View>

				<View style={styles.idRow}>
					<Text style={styles.idLabel}>Order ID</Text>
					<Text style={styles.idValue}>{orderId}</Text>
				</View>

				<View style={styles.briefRow}>
					<BriefPill icon="time-outline" label={`ETA ${etaMin}-${etaMax} min`} />
					<BriefPill icon="card-outline" label={paymentMethod} />
					<BriefPill icon="cash-outline" label={`৳${Number(orderTotal).toLocaleString()}`} />
				</View>
			</LinearGradient>

			<ScrollView contentContainerStyle={{padding: 16}}>
				{/* Progress */}
				<View style={styles.progressCard}>
					<Text style={styles.sectionTitle}>Status</Text>
					<View style={styles.progressBarWrap}>
						<Animated.View style={[styles.progressBarFill, {width: widthInterpolate}]} />
					</View>
					<Text style={styles.progressHint}>{steps[activeIndex].title}</Text>
				</View>

				{/* Steps timeline */}
				<View style={styles.stepsCard}>
					{steps.map((s, idx) => (
						<StepRow
							key={s.id}
							title={s.title}
							desc={s.desc}
							active={idx <= activeIndex}
							current={idx === activeIndex}
							isLast={idx === steps.length - 1}
						/>
					))}
				</View>

				{/* Rider / delivery block (placeholder visuals) */}
				<View style={styles.riderCard}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Image source={{uri: 'https://picsum.photos/seed/rider/120/120'}} style={styles.riderAvatar} />
						<View style={{marginLeft: 12, flex: 1}}>
							<Text style={styles.riderName}>Rider will be assigned soon</Text>
							<Text style={styles.riderHint}>You’ll get a call or SMS when the rider starts towards you.</Text>
						</View>
					</View>

					<View style={styles.riderBtns}>
						<GhostBtn icon="call-outline" label="Call Support" onPress={() => Linking.openURL('tel:+8801000000000')} />
						<GhostBtn icon="chatbubble-ellipses-outline" label="Live Chat" onPress={() => router.push('/support')} />
					</View>
				</View>

				{/* Delivery address / summary */}
				<View style={styles.infoCard}>
					<InfoRow leftIcon="location-outline" label="Delivery to" value="Kachukhet, Dhaka 1206" />
					<Seperator />
					<InfoRow leftIcon="storefront-outline" label="Store" value="Meena Bazar Kachukhet" />
					<Seperator />
					<InfoRow leftIcon="pricetags-outline" label="Total" value={`৳${Number(orderTotal).toLocaleString()}`} />
					<Seperator />
					<InfoRow leftIcon="wallet-outline" label="Payment" value={paymentMethod} />
				</View>

				{/* Bottom actions */}
				<View style={styles.actionRow}>
					<TouchableOpacity
						style={[styles.btn, styles.btnPrimary]}
						activeOpacity={0.9}
						onPress={() => router.replace('/')}
					>
						<Ionicons name="cart-outline" size={18} color="#fff" />
						<Text style={styles.btnPrimaryTxt}>Browse More</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.btn, styles.btnGhost]} activeOpacity={0.9} onPress={() => router.back()}>
						<Ionicons name="arrow-back" size={18} color={COLORS.primary} />
						<Text style={styles.btnGhostTxt}>Back</Text>
					</TouchableOpacity>
				</View>

				{/* tiny visual map placeholder (optional) */}
				<View style={styles.mapCard}>
					<Image source={{uri: 'https://picsum.photos/seed/map/800/300'}} style={styles.mapImg} resizeMode="cover" />
					<View style={{padding: 10}}>
						<Text style={styles.mapTitle}>Live map</Text>
						<Text style={styles.mapHint}>Integrate your real map and rider location here.</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

/* ========== small components ========== */
function BriefPill({icon, label}) {
	return (
		<View style={styles.pill}>
			<Ionicons name={icon} size={14} color={COLORS.dark} />
			<Text style={styles.pillTxt}>{label}</Text>
		</View>
	);
}

function StepRow({title, desc, active, current, isLast}) {
	return (
		<View style={[styles.stepRow, !isLast && styles.stepRowGap]}>
			{/* timeline guide */}
			<View style={styles.timelineCol}>
				<View style={[styles.dot, active ? styles.dotActive : styles.dotInactive]}>
					{active ? <Ionicons name="checkmark" size={12} color="#fff" /> : null}
				</View>
				{!isLast && <View style={[styles.line, active ? styles.lineActive : styles.lineInactive]} />}
			</View>

			{/* text */}
			<View style={{flex: 1}}>
				<Text style={[styles.stepTitle, current && styles.stepTitleCurrent]}>{title}</Text>
				<Text style={styles.stepDesc}>{desc}</Text>
			</View>
		</View>
	);
}

function InfoRow({leftIcon, label, value}) {
	return (
		<View style={styles.infoRow}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<View style={styles.leftIconWrap}>
					<Ionicons name={leftIcon} size={16} color={COLORS.primary} />
				</View>
				<Text style={styles.infoLabel}>{label}</Text>
			</View>
			<Text style={styles.infoValue} numberOfLines={1}>
				{value}
			</Text>
		</View>
	);
}

function GhostBtn({icon, label, onPress}) {
	return (
		<TouchableOpacity style={styles.ghostBtn} onPress={onPress} activeOpacity={0.9}>
			<Ionicons name={icon} size={16} color={COLORS.primary} />
			<Text style={styles.ghostBtnTxt}>{label}</Text>
		</TouchableOpacity>
	);
}

function Seperator() {
	return <View style={styles.sep} />;
}

/* ========== styles ========== */
const styles = StyleSheet.create({
	hero: {
		paddingTop: 16,
		paddingBottom: 12,
		paddingHorizontal: 16,
		borderBottomLeftRadius: 18,
		borderBottomRightRadius: 18,
	},
	topRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'},
	title: {fontSize: 20, fontWeight: '900', color: COLORS.dark},
	iconBtn: {
		height: 36,
		paddingHorizontal: 12,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: COLORS.brandGreenTint,
	},
	idRow: {marginTop: 8, flexDirection: 'row', alignItems: 'center', gap: 8},
	idLabel: {color: COLORS.gray500, fontWeight: '700'},
	idValue: {color: COLORS.dark, fontWeight: '900'},

	briefRow: {marginTop: 10, flexDirection: 'row', flexWrap: 'wrap', gap: 8},
	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
	},
	pillTxt: {marginLeft: 6, fontWeight: '700', color: COLORS.dark, fontSize: 12},

	progressCard: {
		borderRadius: 16,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: COLORS.gray200,
		padding: 12,
		marginTop: 12,
	},
	sectionTitle: {fontWeight: '900', color: COLORS.dark},
	progressBarWrap: {
		height: 10,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
		marginTop: 10,
		overflow: 'hidden',
	},
	progressBarFill: {height: '100%', backgroundColor: COLORS.primary},
	progressHint: {marginTop: 8, fontWeight: '800', color: COLORS.dark},

	stepsCard: {
		marginTop: 12,
		borderRadius: 16,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: COLORS.gray200,
		padding: 12,
	},
	stepRow: {flexDirection: 'row', alignItems: 'flex-start'},
	stepRowGap: {marginBottom: 10},
	timelineCol: {width: 28, alignItems: 'center'},
	dot: {width: 18, height: 18, borderRadius: 9, alignItems: 'center', justifyContent: 'center'},
	dotActive: {backgroundColor: COLORS.primary},
	dotInactive: {backgroundColor: COLORS.gray300},
	line: {width: 3, flex: 1, marginTop: 2, borderRadius: 999},
	lineActive: {backgroundColor: COLORS.primary},
	lineInactive: {backgroundColor: COLORS.gray200},
	stepTitle: {fontWeight: '800', color: COLORS.dark},
	stepTitleCurrent: {textDecorationLine: 'underline'},
	stepDesc: {color: COLORS.gray500, marginTop: 2},

	riderCard: {
		marginTop: 12,
		borderRadius: 16,
		backgroundColor: COLORS.brandBlue,
		padding: 12,
		borderWidth: 0,
	},
	riderAvatar: {width: 52, height: 52, borderRadius: 14, backgroundColor: COLORS.gray100},
	riderName: {fontWeight: '900', color: COLORS.dark},
	riderHint: {marginTop: 4, color: COLORS.gray500},
	riderBtns: {flexDirection: 'row', gap: 10, marginTop: 10},
	ghostBtn: {
		flex: 1,
		height: 44,
		borderRadius: 12,
		borderWidth: 1.5,
		borderColor: COLORS.primary,
		backgroundColor: COLORS.brandGreenTint,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	ghostBtnTxt: {fontWeight: '900', color: COLORS.primary},

	infoCard: {
		marginTop: 12,
		borderRadius: 16,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: COLORS.gray200,
		padding: 12,
	},
	infoRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 8},
	leftIconWrap: {
		width: 26,
		height: 26,
		borderRadius: 8,
		backgroundColor: COLORS.brandGreenTint,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	infoLabel: {fontWeight: '800', color: COLORS.dark},
	infoValue: {fontWeight: '900', color: COLORS.dark, maxWidth: 220},
	sep: {height: 1, backgroundColor: COLORS.gray200},

	actionRow: {flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 14},
	btn: {
		flex: 1,
		height: 50,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	btnPrimary: {backgroundColor: COLORS.primary},
	btnPrimaryTxt: {color: '#fff', fontWeight: '900', fontSize: 15},
	btnGhost: {borderWidth: 1.5, borderColor: COLORS.primary, backgroundColor: COLORS.brandGreenTint},
	btnGhostTxt: {color: COLORS.primary, fontWeight: '900', fontSize: 15},

	mapCard: {
		marginTop: 14,
		borderRadius: 16,
		backgroundColor: '#fff',
		borderWidth: 1,
		borderColor: COLORS.gray200,
		overflow: 'hidden',
	},
	mapImg: {width: '100%', height: 140, backgroundColor: COLORS.gray100},
	mapTitle: {fontWeight: '900', color: COLORS.dark},
	mapHint: {marginTop: 4, color: COLORS.gray500},
});
