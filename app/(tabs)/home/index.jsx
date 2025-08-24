import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import HomeHeader from '../../../components/HomeHeader';
import {COLORS} from '../../../constants/Colors';
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
} from '../../../data/homeData';

const {width} = Dimensions.get('window');

export default function HomeScreen({navigation}) {
	const [slideIndex, setSlideIndex] = useState(0);
	const [activeCat, setActiveCat] = useState(null);
	const [activeTab, setActiveTab] = useState('grocery');
	const slideRef = useRef(null);

	const onSlideScroll = (e) => {
		const x = e.nativeEvent.contentOffset.x;
		const index = Math.round(x / (width - 24));
		setSlideIndex(index);
	};

	const goViewAll = (section) => navigation.navigate('Search', {section});
	const categoryColumns = useMemo(() => chunk3(CATEGORIES), []);

	// Sticky search (outside header, green)
	const StickySearch = () => (
		<View style={styles.stickyWrap}>
			<TouchableOpacity style={styles.searchBar} activeOpacity={0.9} onPress={() => router.push('/search')}>
				<Ionicons name="search" size={18} color={COLORS.white} />
				<Text style={styles.searchPlaceholder}>Search by product name or brand</Text>
			</TouchableOpacity>
		</View>
	);

	// ------- Cards/Sections -------
	const FavRow = ({item}) => (
		<TouchableOpacity
			activeOpacity={0.9}
			onPress={() => setActiveCat(item.id)}
			style={[styles.favRow, activeCat === item.id && styles.favRowActive]}
		>
			<Image source={{uri: item.img}} style={styles.favRowImg} resizeMode="cover" />
			<View style={styles.flex1}>
				<Text style={styles.bold} numberOfLines={2}>
					{item.name}
				</Text>
			</View>
		</TouchableOpacity>
	);

	const ProductCard = ({item}) => (
		<View style={styles.productCard}>
			{item.off ? (
				<View style={styles.offBadge}>
					<Text style={styles.offBadgeText}>-{item.off}%</Text>
				</View>
			) : null}
			<Image source={{uri: item.img}} style={styles.productImg} resizeMode="cover" />
			<Text style={styles.unitText}>{item.unit}</Text>
			<Text style={styles.productName} numberOfLines={2}>
				{item.name}
			</Text>
			<View style={styles.priceRow}>
				{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
				<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
			</View>
			<TouchableOpacity onPress={() => {}} style={styles.addBtn} activeOpacity={0.9}>
				<Ionicons name="add" size={20} color="#fff" />
			</TouchableOpacity>
		</View>
	);

	const ProductStrip = ({title, data, emoji}) => (
		<View style={styles.stripWrap}>
			<View style={styles.stripHeader}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>
					{title} {emoji ? emoji : ''}
				</Text>
				<TouchableOpacity onPress={() => goViewAll(title)} activeOpacity={0.9} style={styles.viewAllBtn}>
					<Text style={styles.viewAllText}>View All</Text>
					<Ionicons name="chevron-forward" size={16} color={COLORS.primary} style={styles.ml4} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={data}
				keyExtractor={(it) => it.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({item}) => <ProductCard item={item} />}
				contentContainerStyle={styles.py2}
			/>
		</View>
	);

	const OfferCard = ({img}) => (
		<View style={styles.offerCard}>
			<Image source={{uri: img}} style={styles.offerImg} resizeMode="cover" />
		</View>
	);

	const OffersSection = () => (
		<View style={styles.offersWrap}>
			<View style={styles.stripHeader}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>Offers</Text>
				<TouchableOpacity onPress={() => goViewAll('Offers')} activeOpacity={0.9} style={styles.viewAllBtn}>
					<Text style={styles.viewAllText}>View All</Text>
					<Ionicons name="chevron-forward" size={16} color={COLORS.primary} style={styles.ml4} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={OFFERS}
				keyExtractor={(o) => o.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({item}) => <OfferCard img={item.img} />}
				contentContainerStyle={styles.py2}
			/>
		</View>
	);

	const HelpPill = ({name, type = 'ionicon', label, onPress}) => (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.helpPill}>
			{type === 'ionicon' ? (
				<Ionicons name={name} size={18} color="#7c3aed" />
			) : (
				<MaterialCommunityIcons name={name} size={18} color="#7c3aed" />
			)}
			<Text style={styles.helpPillText}>{label}</Text>
		</TouchableOpacity>
	);

	const HelpSection = () => (
		<View style={styles.helpWrap}>
			<View style={styles.helpHeaderRow}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>Need help?</Text>
			</View>
			<View style={styles.helpPillRow}>
				<HelpPill name="chatbubble-ellipses-outline" label="Live Chat" onPress={() => {}} />
				<HelpPill name="call-outline" label="Call" onPress={() => {}} />
				<HelpPill name="help-circle-outline" label="FAQ" onPress={() => {}} />
				<HelpPill name="logo-whatsapp" label="WhatsApp" onPress={() => {}} />
				<HelpPill name="facebook-messenger" type="material-community" label="Messenger" onPress={() => {}} />
			</View>
		</View>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			{/* 2nd child sticky */}
			<ScrollView style={styles.flex1} contentContainerStyle={styles.pb80} stickyHeaderIndices={[1]}>
				{/* 0: header with NO search */}
				<HomeHeader
					showSearch={false}
					etaText="Delivery in 59 minutes"
					area="Kachukhet"
					onPressLocation={() => {}}
					onPressSearch={() => router.push('/search')}
				/>

				{/* 1: sticky search (green) */}
				<StickySearch />

				{/* 2+: page content */}
				<ScrollView style={styles.flex1} contentContainerStyle={styles.innerContent}>
					{/* top tabs */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={styles.mb12}
						contentContainerStyle={styles.py2}
					>
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

					{/* slider */}
					<ScrollView
						ref={slideRef}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={onSlideScroll}
						scrollEventThrottle={16}
						style={styles.mb10}
					>
						{SLIDES.map((s) => (
							<View key={s.id} style={styles.slideCard}>
								<Image source={{uri: s.img}} style={styles.slideImg} resizeMode="cover" />
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

					{/* brands */}
					<FlatList
						data={BRANDS}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(b) => b.id}
						contentContainerStyle={styles.py6}
						renderItem={({item}) => (
							<TouchableOpacity
								onPress={() => {}}
								style={[styles.brandCard, {backgroundColor: item.color}]}
								activeOpacity={0.9}
							>
								<Text style={styles.brandText}>{item.name}</Text>
							</TouchableOpacity>
						)}
						style={styles.mb12}
					/>

					{/* favourite categories */}
					<Text style={styles.centerMb8}>FAVOURITE CATEGORIES</Text>
					<FlatList
						data={categoryColumns}
						keyExtractor={(_, idx) => `col-${idx}`}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({item}) => (
							<View style={styles.mr12}>
								{item.map((it) => (
									<FavRow key={it.id} item={it} />
								))}
							</View>
						)}
						ItemSeparatorComponent={() => <View style={styles.w6} />}
						contentContainerStyle={styles.py2}
						style={styles.mb12}
					/>

					{/* product strips */}
					<ProductStrip title="Hot & Fast Movers" data={HOT_FAST_MOVERS} />
					<ProductStrip title="Trending This Week" emoji="🔥" data={TRENDING} />
					<ProductStrip title="Recommended for you" data={RECOMMENDED} />

					{/* offers & help */}
					<OffersSection />
					<HelpSection />
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	/* layout helpers */
	flex1: {flex: 1},
	pb80: {paddingBottom: 80},
	py2: {paddingVertical: 2},
	py6: {paddingVertical: 6},
	mb12: {marginBottom: 12},
	mb10: {marginBottom: 10},
	mr12: {marginRight: 12},
	w6: {width: 6},
	centerMb8: {marginBottom: 8, textAlign: 'center', fontSize: 18, fontWeight: '800'},
	ml4: {marginLeft: 4},
	safeArea: {flex: 1},
	innerContent: {padding: 12, paddingBottom: 80},

	/* sticky search */
	stickyWrap: {
		backgroundColor: COLORS.success, // make section green to blend with pill
		paddingHorizontal: 12,
		paddingTop: 8,
		paddingBottom: 8,
		zIndex: 20,
		shadowOffset: {width: 0, height: 3},
		shadowRadius: 6,
	},
	searchBar: {
		backgroundColor: COLORS.success, // ✅ green pill
		borderRadius: 12,
		paddingHorizontal: 12,
		height: 44,
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255,255,255,0.25)',
	},
	searchPlaceholder: {marginLeft: 8, color: COLORS.white, fontWeight: '600'},

	/* fav row */
	favRow: {
		width: 220,
		height: 72,
		borderRadius: 12,
		backgroundColor: COLORS.brandBlue,
		padding: 8,
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
		shadowColor: COLORS.black,
		shadowOpacity: 0.1,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 6,
		elevation: 3,
		borderWidth: 0,
		borderColor: 'transparent',
	},
	favRowActive: {borderWidth: 1, borderColor: COLORS.primary},
	favRowImg: {width: 50, height: 50, borderRadius: 10, marginRight: 10},
	bold: {fontWeight: '800'},

	/* product card */
	productCard: {
		width: 180,
		borderRadius: 18,
		backgroundColor: COLORS.white,
		padding: 12,
		marginRight: 14,
		shadowColor: COLORS.black,
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 3,
	},
	offBadge: {
		position: 'absolute',
		left: 10,
		top: 10,
		backgroundColor: COLORS.danger,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 12,
		zIndex: 1,
	},
	offBadgeText: {color: COLORS.white, fontWeight: '700', fontSize: 12},
	productImg: {width: '100%', height: 120, borderRadius: 14, marginBottom: 10},
	unitText: {color: COLORS.gray500, fontSize: 12, textAlign: 'center'},
	productName: {fontWeight: '700', textAlign: 'center', marginTop: 4, fontSize: 14},
	priceRow: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 6, fontSize: 13},
	price: {color: COLORS.primary, fontWeight: '800', fontSize: 15},
	addBtn: {
		position: 'absolute',
		right: 12,
		bottom: 12,
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: COLORS.primary,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: COLORS.primary,
		shadowOpacity: 0.3,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 4,
	},

	/* strip */
	stripWrap: {marginTop: 6, marginBottom: 14},
	stripHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
	viewAllBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.brandGreenTint,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
		shadowColor: COLORS.black,
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 2,
	},
	viewAllText: {color: COLORS.primary, fontWeight: '700', fontSize: 13},

	/* slider */
	slideCard: {
		width: width - 24,
		height: 140,
		borderRadius: 14,
		overflow: 'hidden',
		marginRight: 12,
		backgroundColor: COLORS.white,
		elevation: 4,
	},
	slideImg: {width: '100%', height: '100%'},
	dotsRow: {flexDirection: 'row', alignSelf: 'center', marginBottom: 14},
	dot: {width: 8, height: 8, borderRadius: 999, marginHorizontal: 4},

	/* brands */
	brandCard: {
		paddingVertical: 14,
		paddingHorizontal: 16,
		borderRadius: 14,
		marginRight: 10,
		minWidth: 120,
		alignItems: 'center',
		justifyContent: 'center',
	},
	brandText: {fontWeight: '800', color: COLORS.dark},

	/* offers */
	offersWrap: {marginTop: 6, marginBottom: 16},
	offerCard: {
		width: width * 0.7,
		height: 140,
		borderRadius: 16,
		overflow: 'hidden',
		backgroundColor: COLORS.white,
		marginRight: 12,
		shadowColor: COLORS.black,
		shadowOpacity: 0.08,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 3,
	},
	offerImg: {width: '100%', height: '100%'},

	/* help */
	helpWrap: {marginTop: 6, marginBottom: 20},
	helpHeaderRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12},
	helpPillRow: {flexDirection: 'row', flexWrap: 'wrap'},
	helpPill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 20,
		backgroundColor: COLORS.brandPurple,
		marginRight: 10,
		marginBottom: 10,
		shadowColor: COLORS.black,
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 2,
	},
	helpPillText: {marginLeft: 8, fontWeight: '700', color: COLORS.dark},

	/* tabs */
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
});
