// app/order-success.jsx
import {Ionicons} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {LinearGradient} from 'expo-linear-gradient';
import {router, useLocalSearchParams} from 'expo-router';
import {Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from './../../constants/Colors';
import {clearCart} from './../../store/slices/cartSlice';

import {useEffect} from 'react';
import Animated, {Easing, useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

export default function OrderSuccessScreen() {
	const dispatch = useDispatch();
	const cart = useSelector((s) => s.cart);
	const params = useLocalSearchParams();

	// read params (fallbacks for demo)
	const orderId = String(params.orderId || `MBZ-${Date.now().toString().slice(-6)}`);
	const payment = String(params.payment || 'Cash on Delivery');
	const etaMin = Number(params.etaMin || 35);
	const etaMax = Number(params.etaMax || 55);
	const totalFromParams = params.total ? Number(params.total) : null;

	// totals (use param if passed, else from store)
	const total = totalFromParams ?? cart.totalAmount;

	// small entrance animation for the check circle
	const scale = useSharedValue(0.6);
	const opacity = useSharedValue(0);

	useEffect(() => {
		opacity.value = withTiming(1, {duration: 450, easing: Easing.out(Easing.cubic)});
		scale.value = withTiming(1, {duration: 600, easing: Easing.out(Easing.back(1.5))});
		Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
		// we usually want to clear cart after success:
		dispatch(clearCart());
	}, []);

	const aStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{scale: scale.value}],
	}));

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
			<StatusBar barStyle="dark-content" />
			<LinearGradient
				colors={[COLORS.brandGreenTint, '#ffffff']}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 1}}
				style={styles.hero}
			>
				<Animated.View style={[styles.checkWrap, aStyle]}>
					<View style={styles.checkCircle}>
						<Ionicons name="checkmark" size={40} color="#fff" />
					</View>
				</Animated.View>

				<Text style={styles.title}>Order Placed 🎉</Text>
				<Text style={styles.subtitle}>Thanks for shopping with us!</Text>

				<View style={styles.briefRow}>
					<BriefPill icon="time-outline" label={`ETA ${etaMin}-${etaMax} min`} />
					<BriefPill icon="card-outline" label={payment} />
					<BriefPill icon="cash-outline" label={`৳${Number(total).toLocaleString()}`} />
				</View>
			</LinearGradient>

			<ScrollView contentContainerStyle={{padding: 16}}>
				<View style={styles.card}>
					<InfoRow label="Order ID" value={orderId} copyable />
					<Separator />
					<InfoRow label="Status" value="Confirmed" leftIcon="checkmark-circle" leftColor={COLORS.primary} />
					<Separator />
					<InfoRow label="Delivery Window" value={`${etaMin}-${etaMax} minutes`} leftIcon="bicycle" />
					<Separator />
					<InfoRow label="Payment Method" value={payment} leftIcon="wallet-outline" />
					<Separator />
					<InfoRow label="Total Paid" value={`৳${Number(total).toLocaleString()}`} leftIcon="pricetags-outline" />
				</View>

				<View style={styles.routeCard}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Ionicons name="navigate-outline" size={18} color={COLORS.dark} />
						<Text style={styles.routeTitle}>Rider assigned soon</Text>
					</View>
					<Text style={styles.routeHint}>We’ll ping you when the rider starts towards you.</Text>
				</View>

				<View style={{height: 12}} />

				<View style={styles.btnRow}>
					<TouchableOpacity
						style={[styles.btn, styles.btnPrimary]}
						activeOpacity={0.9}
						onPress={() => router.replace('/checkout/order-tracking')}
					>
						<Ionicons name="map-outline" size={18} color="#fff" />
						<Text style={styles.btnPrimaryTxt}>Track Order</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={[styles.btn, styles.btnGhost]}
						activeOpacity={0.9}
						onPress={() => router.replace('/(drawer)/(tabs)/home')}
					>
						<Ionicons name="home-outline" size={18} color={COLORS.primary} />
						<Text style={styles.btnGhostTxt}>Back to Home</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.tipCard}>
					<Image
						source={{uri: 'https://picsum.photos/seed/grocerythank/400/200'}}
						style={styles.tipImg}
						resizeMode="cover"
					/>
					<View style={{padding: 12}}>
						<Text style={styles.tipTitle}>You saved time today!</Text>
						<Text style={styles.tipText}>
							Order again from your last items in just two taps. Check “Hot & Fast Movers” for quick reorders.
						</Text>
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

function InfoRow({label, value, leftIcon, leftColor = COLORS.dark, copyable}) {
	return (
		<View style={styles.infoRow}>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				{leftIcon ? (
					<View style={[styles.leftIconWrap, {backgroundColor: `${COLORS.brandGreenTint}`}]}>
						<Ionicons name={leftIcon} size={16} color={leftColor} />
					</View>
				) : null}
				<Text style={styles.infoLabel}>{label}</Text>
			</View>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>
				<Text style={styles.infoValue} numberOfLines={1}>
					{value}
				</Text>
				{copyable ? (
					<TouchableOpacity
						onPress={async () => {
							// lazy import to avoid top-level import for rare case
							const {setStringAsync} = await import('expo-clipboard');
							await setStringAsync(String(value));
							Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
						}}
						style={styles.copyBtn}
						activeOpacity={0.7}
					>
						<Ionicons name="copy-outline" size={16} color={COLORS.primary} />
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
}

function Separator() {
	return <View style={styles.sep} />;
}

/* ========== styles ========== */
const styles = StyleSheet.create({
	hero: {
		paddingTop: 24,
		paddingBottom: 18,
		paddingHorizontal: 16,
		borderBottomLeftRadius: 18,
		borderBottomRightRadius: 18,
	},
	checkWrap: {alignItems: 'center', justifyContent: 'center', marginTop: 6, marginBottom: 10},
	checkCircle: {
		width: 88,
		height: 88,
		borderRadius: 44,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
		shadowColor: COLORS.black,
		shadowOpacity: 0.25,
		shadowOffset: {width: 0, height: 8},
		shadowRadius: 16,
		elevation: 8,
	},
	title: {textAlign: 'center', fontSize: 22, fontWeight: '900', color: COLORS.dark},
	subtitle: {textAlign: 'center', marginTop: 6, color: COLORS.gray500, fontWeight: '600'},
	briefRow: {marginTop: 12, flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', gap: 8},

	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 6,
		paddingHorizontal: 10,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
		marginHorizontal: 4,
	},
	pillTxt: {marginLeft: 6, fontWeight: '700', color: COLORS.dark, fontSize: 12},

	card: {
		borderRadius: 16,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray200,
		padding: 12,
		shadowColor: COLORS.black,
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 10,
		elevation: 2,
	},

	infoRow: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 8,
	},
	leftIconWrap: {
		width: 26,
		height: 26,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 8,
	},
	infoLabel: {fontWeight: '800', color: COLORS.dark},
	infoValue: {fontWeight: '900', color: COLORS.dark, maxWidth: 230},
	copyBtn: {marginLeft: 8, padding: 4, borderRadius: 6, backgroundColor: COLORS.brandGreenTint},

	sep: {height: 1, backgroundColor: COLORS.gray200, marginVertical: 4},

	routeCard: {
		marginTop: 12,
		borderRadius: 16,
		backgroundColor: COLORS.brandBlue,
		padding: 12,
		borderWidth: 0,
	},
	routeTitle: {marginLeft: 6, fontWeight: '800', color: COLORS.dark},
	routeHint: {marginTop: 6, color: COLORS.gray600 ?? COLORS.gray500},

	btnRow: {flexDirection: 'row', alignItems: 'center', gap: 10},
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

	tipCard: {
		marginTop: 14,
		borderRadius: 16,
		backgroundColor: COLORS.white,
		borderWidth: 1,
		borderColor: COLORS.gray200,
		overflow: 'hidden',
	},
	tipImg: {width: '100%', height: 120, backgroundColor: COLORS.gray100},
	tipTitle: {fontWeight: '900', color: COLORS.dark},
	tipText: {marginTop: 4, color: COLORS.gray500, lineHeight: 18},
});
