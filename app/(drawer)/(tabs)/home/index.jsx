// app/(drawer)/(tabs)/home/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// redux
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../../store/slices/cartSlice';

// ui + constants + data
import HomeHeader from '../../../../components/home/HomeHeader';
import {COLORS} from '../../../../constants/Colors';
import {
	BRANDS,
	CATEGORIES,
	HOT_FAST_MOVERS,
	OFFERS,
	RECOMMENDED,
	SLIDES,
	TRENDING,
	chunk3,
	tabs,
} from '../../../../data/homeData';

// shared home components
import {DealsOfWeek, HelpSection, OffersSection, ProductStrip, StickySearch} from './../../../../components/home';

// product sheet & cart bar
import CartBar from '../../../../components/cart/CartBar';

const {width} = Dimensions.get('window');

export default function HomeScreen() {
	const dispatch = useDispatch();

	// cart from redux
	const totalQty = useSelector((state) => state.cart.totalQty);
	const totalAmount = useSelector((state) => state.cart.totalAmount);
	const cartItems = useSelector((state) => state.cart.items.length);

	// console.log('cartItems', cartItems);

	const [slideIndex, setSlideIndex] = useState(0);
	const [activeCat, setActiveCat] = useState(null);
	const [activeTab, setActiveTab] = useState('grocery');

	// hero slider refs
	const slideRef = useRef(null);
	const indexRef = useRef(0);
	const cardWidth = width - 24;

	// const storeProduct = useSelector((state) => state.products);

	// console.log('storeProduct', storeProduct);

	useEffect(() => {
		indexRef.current = slideIndex;
	}, [slideIndex]);

	// auto-advance hero slider
	useEffect(() => {
		const id = setInterval(() => {
			const next = (indexRef.current + 1) % SLIDES.length;
			slideRef.current?.scrollTo({x: next * cardWidth, animated: true});
		}, 3500);
		return () => clearInterval(id);
	}, [cardWidth]);

	const onSlideScroll = (e) => {
		const x = e.nativeEvent.contentOffset.x;
		const index = Math.round(x / (width - 24));
		setSlideIndex(index);
	};

	const goViewAll = (section) => router.push(`/search?section=${encodeURIComponent(section)}`);
	const categoryColumns = useMemo(() => chunk3(CATEGORIES), []);

	// ---- actions ----
	const handleAddToCart = (item) => {
		// item should at least have: { id, name, price, img, ... }
		dispatch(addToCart(item));
	};

	// polished category tile
	const CategoryTile = ({item, active, onPress}) => (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.catTile, active && styles.catTileActive]}>
			<Image source={{uri: item.img}} style={styles.catThumb} resizeMode="cover" />
			<View style={{flex: 1}}>
				<Text numberOfLines={1} style={styles.catLabel}>
					{item.name}
				</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 120}} stickyHeaderIndices={[1]}>
				{/* 0: header */}
				<HomeHeader
					showSearch={false}
					etaText="Delivery in 59 minutes"
					area="Kachukhet"
					onPressLocation={() => {}}
					onPressSearch={() => router.push('/search')}
				/>

				{/* 1: sticky search */}
				<StickySearch />

				{/* 2+: page content */}
				<ScrollView style={{flex: 1}} contentContainerStyle={{padding: 12}}>
					{/* top tabs */}
					<ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingVertical: 2}}>
						{tabs.map((t) => {
							const active = t.id === activeTab;
							return (
								<TouchableOpacity
									key={t.id}
									onPress={() => setActiveTab(t.id)}
									activeOpacity={0.9}
									style={[styles.tabPill, active ? styles.tabPillActive : styles.tabPillInactive]}
								>
									<Ionicons name={t.icon} size={18} color={active ? COLORS.primary : COLORS.dark} />
									<Text style={[styles.tabLabel, {color: active ? COLORS.primary : COLORS.dark}]}>{t.label}</Text>
								</TouchableOpacity>
							);
						})}
					</ScrollView>

					{/* deals of week */}
					<DealsOfWeek />

					{/* hero slider */}
					<ScrollView
						ref={slideRef}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={onSlideScroll}
						scrollEventThrottle={16}
						style={{marginBottom: 10}}
					>
						{SLIDES.map((s) => (
							<View key={s.id} style={styles.slideCard}>
								<Image source={{uri: s.img}} style={{width: '100%', height: '100%'}} resizeMode="cover" />
							</View>
						))}
					</ScrollView>

					{/* dots */}
					<View style={styles.dotsRow}>
						{SLIDES.map((_, i) => (
							<View
								key={`dot-${i}`}
								style={[styles.dot, {backgroundColor: i === slideIndex ? COLORS.primary : COLORS.gray300}]}
							/>
						))}
					</View>

					{/* brands (gradient) */}
					<FlatList
						data={BRANDS}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(b) => b.id}
						contentContainerStyle={{paddingVertical: 6}}
						renderItem={({item}) => {
							const preset = {
								'All Offers': {colors: ['#9AE6B4', '#B7F3D9'], icon: 'gift-outline'},
								Unilever: {colors: ['#BFD3FF', '#E6EAFE'], textIcon: 'U'},
								'Big Save': {colors: ['#E7C1FF', '#FAD0E5'], icon: 'basket-outline'},
								'All Brands': {colors: ['#FEC6A1', '#FFD7B8'], icon: 'bookmark-outline'},
							}[item.name] || {colors: [item.color || '#E5E7EB', '#F5F6F7'], icon: 'albums-outline'};

							return (
								<TouchableOpacity onPress={() => {}} activeOpacity={0.9} style={{marginRight: 10}}>
									<LinearGradient
										colors={preset.colors}
										start={{x: 0, y: 0}}
										end={{x: 1, y: 1}}
										style={styles.brandCardGrad}
									>
										<View style={styles.brandIconBubble}>
											{'textIcon' in preset ? (
												<Text style={styles.brandTextIcon}>{preset.textIcon}</Text>
											) : (
												<Ionicons name={preset.icon} size={18} color="#fff" />
											)}
										</View>
										<Text style={styles.brandGradLabel} numberOfLines={1}>
											{item.name}
										</Text>
									</LinearGradient>
								</TouchableOpacity>
							);
						}}
						style={{marginBottom: 12}}
					/>

					{/* favourite categories */}
					<View style={styles.favCategories}>
						<Text style={styles.favHeader}>FAVOURITE CATEGORIES</Text>

						<FlatList
							data={categoryColumns}
							keyExtractor={(_, idx) => `col-${idx}`}
							horizontal
							showsHorizontalScrollIndicator={false}
							// smoother horizontal scroll behavior
							decelerationRate="fast"
							disableIntervalMomentum
							snapToAlignment="start"
							ItemSeparatorComponent={() => <View style={{width: 8}} />}
							contentContainerStyle={{paddingVertical: 6, paddingHorizontal: 2}}
							style={{marginBottom: 10}}
							renderItem={({item}) => (
								<View style={{marginRight: 6}}>
									{item.map((it) => (
										<CategoryTile
											key={it.id}
											item={it}
											active={it.id === activeCat}
											onPress={() => setActiveCat(it.id)}
										/>
									))}
								</View>
							)}
						/>
					</View>

					{/* product strips with wired add + sheet */}
					<ProductStrip
						title="Hot & Fast Movers"
						data={HOT_FAST_MOVERS}
						onViewAll={() => goViewAll('Hot & Fast Movers')}
						productCardProps={{
							onAdd: handleAddToCart,
							onPressCard: (it) => router.push(`/products/${encodeURIComponent(it.id)}`),
						}}
					/>
					<ProductStrip
						title="Trending This Week"
						emoji="🔥"
						data={TRENDING}
						onViewAll={() => goViewAll('Trending This Week')}
						productCardProps={{
							onAdd: handleAddToCart,
							onPressCard: (it) => router.push(`/product/${encodeURIComponent(it.id)}`),
						}}
					/>
					<ProductStrip
						title="Recommended for you"
						data={RECOMMENDED}
						onViewAll={() => goViewAll('Recommended for you')}
						productCardProps={{
							onAdd: handleAddToCart,
							onPressCard: (it) => router.push(`/product/${encodeURIComponent(it.id)}`),
						}}
					/>

					<OffersSection offers={OFFERS} onViewAll={() => goViewAll('Offers')} />
					<HelpSection />
				</ScrollView>
			</ScrollView>

			{/* cart bar (redux totals) */}
			{totalQty > 0 ? (
				<CartBar items={cartItems} count={totalQty} total={totalAmount} onPress={() => router.push('/cart')} />
			) : null}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// slider
	slideCard: {
		width: width - 24,
		height: 140,
		borderRadius: 14,
		overflow: 'hidden',
		marginRight: 12,
		backgroundColor: COLORS.white,
		elevation: 4,
	},
	dotsRow: {flexDirection: 'row', alignSelf: 'center', marginBottom: 14},
	dot: {width: 8, height: 8, borderRadius: 999, marginHorizontal: 4},

	// brand tiles (compact)
	brandCardGrad: {
		width: 70,
		height: 70,
		borderRadius: 14,
		padding: 8,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 6,
		elevation: 2,
	},
	brandIconBubble: {
		width: 32,
		height: 32,
		borderRadius: 10,
		backgroundColor: 'rgba(255,255,255,0.35)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 6,
	},
	brandTextIcon: {fontWeight: '900', color: '#fff', fontSize: 14},
	brandGradLabel: {
		fontWeight: '700',
		color: COLORS.dark,
		opacity: 0.9,
		fontSize: 11,
		textAlign: 'center',
	},

	// tabs
	tabPill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 24,
		marginRight: 10,
	},
	tabPillActive: {backgroundColor: COLORS.brandGreenTint, borderWidth: 1, borderColor: COLORS.primary},
	tabPillInactive: {backgroundColor: COLORS.gray100, borderWidth: 0, borderColor: 'transparent'},
	tabLabel: {marginLeft: 8, fontWeight: '800'},

	// favourite categories container (tightened padding/spacing)
	favCategories: {
		backgroundColor: '#EAF6FF',
		borderRadius: 16,
		paddingTop: 12,
		paddingHorizontal: 10,
		marginBottom: 10,
	},
	favHeader: {
		textAlign: 'center',
		fontSize: 16, // ↓ from 18
		fontWeight: '800',
		marginBottom: 8, // ↓ from 10
		color: COLORS.dark,
		letterSpacing: 0.4,
	},

	// category tile (more compact)
	catTile: {
		width: 130, // ↓ from 150
		height: 54, // ↓ from 60
		borderRadius: 12, // ↓ from 14
		backgroundColor: COLORS.white,
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		marginBottom: 8, // ↓ from 10
		borderWidth: 1,
		borderColor: COLORS.gray200,
		shadowColor: '#000',
		shadowOpacity: 0.04,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 1,
	},
	catTileActive: {borderColor: COLORS.primary},

	catThumb: {
		width: 34, // ↓ from 40
		height: 34, // ↓ from 40
		borderRadius: 8, // ↓ from 10
		marginRight: 10,
		backgroundColor: COLORS.gray100,
	},
	catLabel: {
		fontSize: 12, // ↓ from 16
		fontWeight: '700',
		color: COLORS.dark,
	},
});
