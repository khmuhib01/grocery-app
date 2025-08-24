// app/(drawer)/(tabs)/home/ProductScreen.jsx
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {useMemo, useRef, useState} from 'react';
import {Animated, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../constants/Colors';
import {addToCart} from '../../../../store/slices/cartSlice';

// Demo data (swap to API later)
import {BRANDS, PRODUCTS} from '../../../../data/homeData';

// Reuse your card
import {ProductCard} from '../../../../components/home';

const SORTS = [
	{id: 'default', label: 'Default'},
	{id: 'priceAsc', label: 'Price: Low to High'},
	{id: 'priceDesc', label: 'Price: High to Low'},
];

export default function ProductScreen() {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	// cart qty for controlled cards
	const cartItems = useSelector((s) => s.cart.items);
	const qtyById = {};
	for (const it of cartItems) qtyById[it.id] = it.qty;

	// ---- Filters state ----
	const [sheetOpen, setSheetOpen] = useState(false);
	const [sortBy, setSortBy] = useState('default');
	const [selectedBrands, setSelectedBrands] = useState(new Set());

	// derived: badge shown when any filter is active (non-default sort or brands selected)
	const hasActiveFilters = sortBy !== 'default' || selectedBrands.size > 0;

	// ---- Bottom sheet animation ----
	const sheetY = useRef(new Animated.Value(0)).current; // 0 = hidden, 1 = visible

	const openSheet = () => {
		setSheetOpen(true);
		Animated.timing(sheetY, {toValue: 1, duration: 220, useNativeDriver: true}).start();
	};
	const closeSheet = () => {
		Animated.timing(sheetY, {toValue: 0, duration: 220, useNativeDriver: true}).start(({finished}) => {
			if (finished) setSheetOpen(false);
		});
	};

	// Calculate translateY from sheetY
	const translateY = sheetY.interpolate({
		inputRange: [0, 1],
		outputRange: [420, 0], // sheet height ≈ 420
	});
	const backdropOpacity = sheetY.interpolate({
		inputRange: [0, 1],
		outputRange: [0, 0.45],
	});

	// ---- Data mapping ----
	const brandMap = useMemo(() => {
		const m = new Map();
		BRANDS.forEach((b) => m.set(b.id, b.name));
		return m;
	}, []);

	const baseProducts = useMemo(
		() =>
			PRODUCTS.map((p) => ({
				id: p.id,
				name: p.name,
				img: p.images?.[0] || 'https://picsum.photos/seed/placeholder/600/600',
				mrp: p.mrp,
				price: p.price,
				off: p.mrp ? Math.max(0, Math.round(p.mrp - p.price)) : 0,
				brand_id: p.brand_id,
				brand_name: brandMap.get(p.brand_id) || 'Unknown',
			})),
		[brandMap]
	);

	// Apply filters & sort
	const filtered = useMemo(() => {
		let arr = baseProducts;

		if (selectedBrands.size > 0) {
			arr = arr.filter((p) => selectedBrands.has(p.brand_id));
		}

		if (sortBy === 'priceAsc') {
			arr = [...arr].sort((a, b) => Number(a.price) - Number(b.price));
		} else if (sortBy === 'priceDesc') {
			arr = [...arr].sort((a, b) => Number(b.price) - Number(a.price));
		}
		return arr;
	}, [baseProducts, selectedBrands, sortBy]);

	// Helpers to toggle brand chips
	const toggleBrand = (id) => {
		setSelectedBrands((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const resetFilters = () => {
		setSortBy('default');
		setSelectedBrands(new Set());
	};

	return (
		<SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
			<StatusBar style="dark" />

			{/* Header */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Products</Text>

				<View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
					{/* Filter icon with tiny badge when active */}
					<TouchableOpacity style={styles.circleBtn} onPress={openSheet} activeOpacity={0.9}>
						<Ionicons name="filter-outline" size={18} color={COLORS.dark} />
						{hasActiveFilters ? <View style={styles.badge} /> : null}
					</TouchableOpacity>

					<TouchableOpacity style={styles.circleBtn} onPress={() => router.push('/settings')} activeOpacity={0.9}>
						<Ionicons name="settings-outline" size={18} color={COLORS.dark} />
					</TouchableOpacity>
				</View>
			</View>

			{/* Grid */}
			<View style={styles.grid}>
				<FlatList
					data={filtered}
					keyExtractor={(it) => it.id}
					numColumns={2}
					columnWrapperStyle={{gap: 12}}
					contentContainerStyle={{
						padding: 12,
						paddingBottom: insets.bottom + 100,
						gap: 12,
					}}
					contentInsetAdjustmentBehavior="automatic"
					renderItem={({item}) => (
						<ProductCard
							item={item}
							width={styles.cardW.width}
							qty={qtyById[item.id] ?? 0}
							onAdd={(prod) => dispatch(addToCart(prod))}
						/>
					)}
					ListEmptyComponent={
						<View style={{alignItems: 'center', marginTop: 40}}>
							<Text style={{color: COLORS.gray500, fontWeight: '700'}}>No products match your filters</Text>
						</View>
					}
				/>
			</View>

			{/* Bottom Sheet */}
			{sheetOpen && (
				<View style={StyleSheet.absoluteFill} pointerEvents="box-none">
					{/* Backdrop */}
					<Animated.View style={[styles.backdrop, {opacity: backdropOpacity}]}>
						<Pressable style={{flex: 1}} onPress={closeSheet} />
					</Animated.View>

					{/* Sheet */}
					<Animated.View style={[styles.sheet, {transform: [{translateY}]}]}>
						<View style={styles.sheetHandle} />

						<Text style={styles.sheetTitle}>Filters</Text>

						{/* Sort */}
						<Text style={styles.groupTitle}>Sort by</Text>
						<View style={styles.sortRow}>
							{SORTS.map((s) => {
								const active = s.id === sortBy;
								return (
									<TouchableOpacity
										key={s.id}
										onPress={() => setSortBy(s.id)}
										activeOpacity={0.9}
										style={[
											styles.sortPill,
											active ? {backgroundColor: COLORS.brandGreenTint, borderColor: COLORS.primary} : null,
										]}
									>
										<Text style={[styles.sortTxt, {color: active ? COLORS.primary : COLORS.dark}]}>{s.label}</Text>
									</TouchableOpacity>
								);
							})}
						</View>

						{/* Brands */}
						<Text style={[styles.groupTitle, {marginTop: 10}]}>Brands</Text>
						<View style={styles.chipsWrap}>
							{BRANDS.map((b) => {
								const active = selectedBrands.has(b.id);
								return (
									<TouchableOpacity
										key={b.id}
										onPress={() => toggleBrand(b.id)}
										activeOpacity={0.9}
										style={[
											styles.chip,
											active ? {backgroundColor: COLORS.brandGreenTint, borderColor: COLORS.primary} : null,
										]}
									>
										<Text style={[styles.chipTxt, {color: active ? COLORS.primary : COLORS.dark}]}>{b.name}</Text>
									</TouchableOpacity>
								);
							})}
						</View>

						{/* Actions */}
						<View style={styles.sheetActions}>
							<TouchableOpacity onPress={resetFilters} style={styles.ghostBtn} activeOpacity={0.9}>
								<Text style={styles.ghostTxt}>Reset</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={closeSheet} style={styles.applyBtn} activeOpacity={0.9}>
								<Text style={styles.applyTxt}>Apply Filters</Text>
							</TouchableOpacity>
						</View>
					</Animated.View>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {flex: 1, backgroundColor: '#fff'},

	// Header skeleton (matches your pattern)
	header: {
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#fff',
	},
	headerTitle: {fontSize: 20, fontWeight: '900', color: COLORS.dark},
	circleBtn: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		right: 6,
		top: 6,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: COLORS.primary,
	},

	grid: {flex: 1, backgroundColor: '#fff'},
	cardW: {width: 172}, // 2‑col card width

	// Bottom sheet
	backdrop: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: '#000',
	},
	sheet: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		padding: 14,
		paddingBottom: 16,
		backgroundColor: '#fff',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		borderTopWidth: 1,
		borderColor: '#E7EAF0',
		shadowColor: '#000',
		shadowOpacity: 0.15,
		shadowOffset: {width: 0, height: -6},
		shadowRadius: 16,
		elevation: 12,
	},
	sheetHandle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: COLORS.gray300,
		alignSelf: 'center',
		marginBottom: 10,
	},
	sheetTitle: {fontWeight: '900', color: COLORS.dark, fontSize: 16, marginBottom: 8},

	groupTitle: {fontWeight: '800', color: COLORS.gray600, marginBottom: 8},
	sortRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
	sortPill: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	sortTxt: {fontWeight: '800'},

	chipsWrap: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
	chip: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
		borderWidth: 1,
		borderColor: 'transparent',
	},
	chipTxt: {fontWeight: '800'},

	sheetActions: {
		marginTop: 14,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	ghostBtn: {
		flex: 1,
		height: 44,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	ghostTxt: {fontWeight: '900', color: COLORS.dark},
	applyBtn: {
		flex: 2,
		height: 44,
		borderRadius: 12,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	applyTxt: {color: '#fff', fontWeight: '900'},
});
