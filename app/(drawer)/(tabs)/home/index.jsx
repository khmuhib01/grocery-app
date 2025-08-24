// app/(drawer)/(tabs)/home/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {router} from 'expo-router';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
import {
	DealsOfWeek,
	FavRow,
	HelpSection,
	OffersSection,
	ProductStrip,
	StickySearch,
} from './../../../../components/home';

const {width} = Dimensions.get('window');

export default function HomeScreen({navigation}) {
	const [slideIndex, setSlideIndex] = useState(0);
	const [activeCat, setActiveCat] = useState(null);
	const [activeTab, setActiveTab] = useState('grocery');

	const slideRef = useRef(null);
	const indexRef = useRef(0);
	const cardWidth = width - 24;

	useEffect(() => {
		indexRef.current = slideIndex;
	}, [slideIndex]);

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

	const goViewAll = (section) => navigation.navigate('Search', {section});
	const categoryColumns = useMemo(() => chunk3(CATEGORIES), []);

	return (
		<SafeAreaView style={{flex: 1}}>
			<ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 80}} stickyHeaderIndices={[1]}>
				<HomeHeader
					showSearch={false}
					etaText="Delivery in 59 minutes"
					area="Kachukhet"
					onPressLocation={() => {}}
					onPressSearch={() => router.push('/search')}
				/>

				<StickySearch />

				<ScrollView style={{flex: 1}} contentContainerStyle={{padding: 12}}>
					{/* Tabs */}
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

					<DealsOfWeek />

					{/* Hero slider */}
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

					{/* Brands */}
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
												<Ionicons name={preset.icon} size={22} color="#fff" />
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

					{/* Favourite categories */}
					<Text style={{marginBottom: 8, textAlign: 'center', fontSize: 18, fontWeight: '800'}}>
						FAVOURITE CATEGORIES
					</Text>
					<FlatList
						data={categoryColumns}
						keyExtractor={(_, idx) => `col-${idx}`}
						horizontal
						showsHorizontalScrollIndicator={false}
						renderItem={({item}) => (
							<View style={{marginRight: 12}}>
								{item.map((it) => (
									<FavRow key={it.id} item={it} active={it.id === activeCat} onPress={() => setActiveCat(it.id)} />
								))}
							</View>
						)}
						ItemSeparatorComponent={() => <View style={{width: 6}} />}
						contentContainerStyle={{paddingVertical: 2}}
						style={{marginBottom: 12}}
					/>

					{/* Products */}
					<ProductStrip
						title="Hot & Fast Movers"
						data={HOT_FAST_MOVERS}
						onViewAll={() => goViewAll('Hot & Fast Movers')}
					/>
					<ProductStrip
						title="Trending This Week"
						emoji="🔥"
						data={TRENDING}
						onViewAll={() => goViewAll('Trending This Week')}
					/>
					<ProductStrip
						title="Recommended for you"
						data={RECOMMENDED}
						onViewAll={() => goViewAll('Recommended for you')}
					/>

					<OffersSection offers={OFFERS} onViewAll={() => goViewAll('Offers')} />
					<HelpSection />
				</ScrollView>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
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

	brandCardGrad: {
		width: 120,
		height: 100,
		borderRadius: 18,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowOffset: {width: 0, height: 6},
		shadowRadius: 10,
		elevation: 3,
	},
	brandIconBubble: {
		width: 42,
		height: 42,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.35)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
	},
	brandTextIcon: {fontWeight: '900', color: '#fff', fontSize: 20},
	brandGradLabel: {fontWeight: '800', color: COLORS.dark, opacity: 0.9},

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
