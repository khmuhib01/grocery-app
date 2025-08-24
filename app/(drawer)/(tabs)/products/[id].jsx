// app/(drawer)/(tabs)/products/[id].jsx
import {Ionicons} from '@expo/vector-icons';
import {router, useLocalSearchParams} from 'expo-router';
import {useMemo, useRef, useState} from 'react';
import {Animated, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {ProductStrip} from '../../../../components/home';
import {COLORS} from '../../../../constants/Colors';
import {PRODUCTS, PRODUCTS_BY_ID, RECOMMENDED} from '../../../../data/homeData';
import {addToCart} from '../../../../store/slices/cartSlice';

const HEADER_MAX = 320; // hero height
const HEADER_MIN = 64; // collapsed header visible height
const TITLE_FADE_START = 120;
const TITLE_FADE_END = 220;

export default function ProductDetailScreen() {
	const {id} = useLocalSearchParams();
	const insets = useSafeAreaInsets();
	const dispatch = useDispatch();

	const product = useMemo(() => PRODUCTS_BY_ID?.[String(id)], [id]);
	const scrollY = useRef(new Animated.Value(0)).current;

	// Local wishlist (UI only). If you want persistence, wire a Redux slice later.
	const [inWishlist, setInWishlist] = useState(false);

	// ---- Similar products (brand/category overlap) ----
	const similar = useMemo(() => {
		if (!product) return [];
		const brand = product.brand_id;
		const cats = new Set(product.category_ids || []);
		return PRODUCTS.filter(
			(p) => p.id !== product.id && (p.brand_id === brand || (p.category_ids || []).some((c) => cats.has(c)))
		).slice(0, 10);
	}, [product]);

	if (!product) {
		return (
			<SafeAreaView style={{flex: 1, backgroundColor: COLORS.gray100}} edges={['top', 'left', 'right']}>
				<View style={styles.headerBar}>
					<TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
						<Ionicons name="chevron-back" size={20} color={COLORS.dark} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Product</Text>
					<View style={styles.iconBtn} />
				</View>
				<View style={styles.center}>
					<Text>Product not found.</Text>
				</View>
			</SafeAreaView>
		);
	}

	// ---- Parallax/Collapse anims (native-driver safe) ----
	const headerTranslate = scrollY.interpolate({
		inputRange: [0, HEADER_MAX - HEADER_MIN],
		outputRange: [0, -(HEADER_MAX - HEADER_MIN)],
		extrapolate: 'clamp',
	});
	const heroTranslateY = scrollY.interpolate({
		inputRange: [-200, 0, HEADER_MAX],
		outputRange: [-50, 0, HEADER_MAX * 0.5],
	});
	const heroScale = scrollY.interpolate({
		inputRange: [-200, 0],
		outputRange: [1.25, 1],
		extrapolateRight: 'clamp',
	});
	const titleOpacity = scrollY.interpolate({
		inputRange: [TITLE_FADE_START, TITLE_FADE_END],
		outputRange: [0, 1],
		extrapolate: 'clamp',
	});
	const shadowOpacity = scrollY.interpolate({
		inputRange: [0, 40],
		outputRange: [0, 0.12],
		extrapolate: 'clamp',
	});

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: '#fff'}} edges={['top', 'left', 'right']}>
			<StatusBar barStyle="dark-content" />

			{/* Collapsing header */}
			<Animated.View style={[styles.headerWrap, {transform: [{translateY: headerTranslate}]}]}>
				{/* Parallax hero image */}
				<Animated.Image
					source={{uri: product.images?.[0] ?? product.img}}
					style={[styles.heroImg, {transform: [{translateY: heroTranslateY}, {scale: heroScale}]}]}
					resizeMode="cover"
				/>

				{/* contrast fades */}
				<View style={styles.heroFadeTop} />
				<View style={styles.heroFadeBottom} />

				{/* Top controls + wishlist */}
				<View style={[styles.topControls, {paddingTop: insets.top || 6}]}>
					<TouchableOpacity onPress={() => router.back()} style={styles.topIconBtn}>
						<Ionicons name="chevron-back" size={20} color={COLORS.dark} />
					</TouchableOpacity>

					<Animated.Text numberOfLines={1} style={[styles.collapsedTitle, {opacity: titleOpacity}]}>
						{product.name}
					</Animated.Text>

					<TouchableOpacity onPress={() => setInWishlist((w) => !w)} style={styles.topIconBtn} activeOpacity={0.9}>
						<Ionicons
							name={inWishlist ? 'heart' : 'heart-outline'}
							size={22}
							color={inWishlist ? COLORS.danger : COLORS.dark}
						/>
					</TouchableOpacity>
				</View>

				{/* Price / Off chips pinned on hero */}
				<View style={styles.heroBottomRow}>
					{product.off ? (
						<View style={styles.offChip}>
							<Ionicons name="pricetag-outline" size={14} color={COLORS.primary} />
							<Text style={styles.offTxt}>৳{product.off} OFF</Text>
						</View>
					) : (
						<View />
					)}

					<View style={styles.priceChip}>
						{product.mrp ? <Text style={styles.mrpSmall}>৳{Number(product.mrp).toLocaleString()}</Text> : null}
						<Text style={styles.priceBig}>৳{Number(product.price).toLocaleString()}</Text>
					</View>
				</View>
			</Animated.View>

			{/* Main content (pad top = HEADER_MAX) */}
			<Animated.ScrollView
				contentContainerStyle={{paddingTop: HEADER_MAX, paddingBottom: insets.bottom + 160}}
				scrollEventThrottle={16}
				onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
			>
				{/* Primary card: name, unit, meta, desc */}
				<View style={styles.card}>
					<Text style={styles.name}>{product.name}</Text>
					<Text style={styles.unit}>EACH</Text>

					{/* Meta row */}
					<View style={styles.metaRow}>
						<View style={styles.metaPill}>
							<Ionicons name="star" size={14} color="#fff" />
							<Text style={styles.metaTxt}>{product.rating ?? '4.5'}</Text>
						</View>
						<View style={styles.metaThin}>
							<Ionicons name="cube-outline" size={16} color={COLORS.dark} />
							<Text style={styles.metaThinTxt}>{product.stock ?? 20} in stock</Text>
						</View>
						<View style={styles.metaThin}>
							<Ionicons name="time-outline" size={16} color={COLORS.dark} />
							<Text style={styles.metaThinTxt}>Delivery 30–60 min</Text>
						</View>
					</View>

					{/* Description */}
					{product.desc ? (
						<Text style={styles.desc}>{product.desc}</Text>
					) : (
						<Text style={styles.descMuted}>
							Premium quality product. Freshly sourced and delivered fast from Meena Bazar Kachukhet.
						</Text>
					)}
				</View>

				{/* Variants */}
				{Array.isArray(product.variants) && product.variants.length > 0 ? (
					<View style={styles.card}>
						<Text style={styles.sectionTitle}>Available Sizes</Text>
						<View style={styles.variantsRow}>
							{product.variants.map((v) => (
								<View key={v.id} style={styles.variantPill}>
									<Text style={styles.variantTxt}>{v.label}</Text>
								</View>
							))}
						</View>
					</View>
				) : null}

				{/* Details */}
				<View style={styles.card}>
					<Text style={styles.sectionTitle}>Details</Text>
					<View style={styles.kvRow}>
						<Text style={styles.kvKey}>Brand</Text>
						<Text style={styles.kvVal}>{product.brand_id?.toUpperCase?.() || '—'}</Text>
					</View>
					<View style={styles.kvRow}>
						<Text style={styles.kvKey}>Unit</Text>
						<Text style={styles.kvVal}>{product.unit?.toUpperCase?.() || 'EACH'}</Text>
					</View>
					<View style={styles.kvRow}>
						<Text style={styles.kvKey}>SKU</Text>
						<Text style={styles.kvVal}>{product.sku || '—'}</Text>
					</View>
				</View>

				{/* Similar Products */}
				{similar.length > 0 && (
					<View style={{marginHorizontal: 12}}>
						<ProductStrip
							title="Similar Products"
							emoji="🔁"
							data={similar}
							productCardProps={{
								onAdd: (p) => dispatch(addToCart(p)),
								onPressCard: (p) => router.push(`/product/${p.id}`),
								width: 180,
							}}
						/>
					</View>
				)}

				{/* Recommended for You */}
				<View style={{marginHorizontal: 12}}>
					<ProductStrip
						title="Recommended for You"
						emoji="✨"
						data={RECOMMENDED}
						productCardProps={{
							onAdd: (p) => dispatch(addToCart(p)),
							onPressCard: (p) => router.push(`/product/${p.id}`),
							width: 180,
						}}
					/>
				</View>
			</Animated.ScrollView>

			{/* Subtle top shadow when collapsed */}
			<Animated.View style={[styles.headerShadow, {opacity: shadowOpacity}]} />

			{/* Sticky bottom bar */}
			<SafeAreaView edges={['bottom']} style={styles.bottomBar}>
				<View style={styles.bottomPrice}>
					{product.mrp ? <Text style={styles.mrpSmall}>৳{Number(product.mrp).toLocaleString()}</Text> : null}
					<Text style={styles.priceBig}>৳{Number(product.price).toLocaleString()}</Text>
				</View>

				{/* quick wishlist */}
				<TouchableOpacity
					onPress={() => setInWishlist((w) => !w)}
					style={[styles.ctaIconBtn, {borderColor: inWishlist ? COLORS.danger : '#E7EAF0'}]}
					activeOpacity={0.9}
				>
					<Ionicons
						name={inWishlist ? 'heart' : 'heart-outline'}
						size={20}
						color={inWishlist ? COLORS.danger : COLORS.dark}
					/>
				</TouchableOpacity>

				<TouchableOpacity
					activeOpacity={0.9}
					style={styles.ctaBtn}
					onPress={() => {
						dispatch(addToCart(product));
						router.push('/cart');
					}}
				>
					<Ionicons name="cart" size={18} color="#fff" />
					<Text style={styles.ctaTxt}>Add to Cart</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	// Collapsing header
	headerWrap: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: HEADER_MAX,
		overflow: 'hidden',
		backgroundColor: '#fff',
		zIndex: 5,
	},
	heroImg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		backgroundColor: COLORS.gray100,
	},
	heroFadeTop: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		backgroundColor: 'rgba(255,255,255,0.75)',
	},
	heroFadeBottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		height: 140,
		backgroundColor: 'rgba(0,0,0,0.08)',
	},

	topControls: {
		paddingHorizontal: 12,
		paddingBottom: 8,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	topIconBtn: {
		width: 38,
		height: 38,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255,255,255,0.9)',
	},
	collapsedTitle: {
		flex: 1,
		marginHorizontal: 12,
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '900',
		color: COLORS.dark,
		paddingHorizontal: 6,
	},

	heroBottomRow: {
		position: 'absolute',
		bottom: 12,
		left: 12,
		right: 12,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
	},
	offChip: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: COLORS.brandGreenTint,
		borderWidth: 1,
		borderColor: COLORS.primary,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
	},
	offTxt: {color: COLORS.primary, fontWeight: '900', fontSize: 12},

	priceChip: {
		alignItems: 'flex-end',
		backgroundColor: 'rgba(255,255,255,0.95)',
		paddingHorizontal: 12,
		paddingVertical: 8,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
	},
	mrpSmall: {color: COLORS.gray400, textDecorationLine: 'line-through', fontWeight: '700', fontSize: 12},
	priceBig: {color: COLORS.dark, fontWeight: '900', fontSize: 18},

	headerBar: {
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

	// Cards
	card: {
		borderRadius: 14,
		backgroundColor: '#fff',
		padding: 12,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		marginHorizontal: 12,
		marginBottom: 12,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 1,
	},

	name: {fontSize: 20, fontWeight: '900', color: COLORS.dark},
	unit: {color: COLORS.gray500, fontSize: 11, marginTop: 4, textTransform: 'uppercase'},

	metaRow: {marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 10},
	metaPill: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
		backgroundColor: COLORS.primary,
		paddingHorizontal: 10,
		paddingVertical: 6,
		borderRadius: 999,
	},
	metaTxt: {color: '#fff', fontWeight: '900', fontSize: 12},
	metaThin: {flexDirection: 'row', alignItems: 'center', gap: 6},
	metaThinTxt: {color: COLORS.dark, fontWeight: '700'},

	desc: {marginTop: 12, color: COLORS.dark, lineHeight: 20, fontWeight: '500'},
	descMuted: {marginTop: 12, color: COLORS.gray500},

	sectionTitle: {fontWeight: '900', color: COLORS.dark, marginBottom: 10, fontSize: 16},
	variantsRow: {flexDirection: 'row', flexWrap: 'wrap', gap: 8},
	variantPill: {
		borderWidth: 1,
		borderColor: '#E7EAF0',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 999,
		backgroundColor: COLORS.gray100,
	},
	variantTxt: {fontWeight: '800', color: COLORS.dark},

	kvRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 6},
	kvKey: {color: COLORS.gray600, fontWeight: '800'},
	kvVal: {color: COLORS.dark, fontWeight: '800'},

	// Subtle top shadow when collapsed
	headerShadow: {
		position: 'absolute',
		top: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
		left: 0,
		right: 0,
		height: 12,
		backgroundColor: '#000',
		opacity: 0,
		zIndex: 4,
	},

	// Sticky bottom bar
	bottomBar: {
		position: 'absolute',
		left: 0,
		right: 0,
		bottom: 0,
		paddingHorizontal: 12,
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: '#fff',
		borderTopWidth: 1,
		borderColor: '#eef0f4',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	bottomPrice: {flex: 1},

	ctaIconBtn: {
		height: 48,
		width: 54,
		borderRadius: 12,
		borderWidth: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	ctaBtn: {
		height: 48,
		minWidth: 160,
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

	center: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
