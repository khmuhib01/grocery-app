import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {useMemo, useRef, useState} from 'react';
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
				{/* 0: header without search */}
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
				<ScrollView style={{flex: 1}} contentContainerStyle={{padding: 12, paddingBottom: 80}}>
					{/* top tabs */}
					<ScrollView
						horizontal
						showsHorizontalScrollIndicator={false}
						style={{marginBottom: 12}}
						contentContainerStyle={{paddingVertical: 2}}
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

					{/* ✅ DEALS OF THE WEEK */}
					<DealsOfWeek />

					{/* brands */}
					<FlatList
						data={BRANDS}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(b) => b.id}
						contentContainerStyle={{paddingVertical: 6}}
						renderItem={({item}) => (
							<TouchableOpacity
								onPress={() => {}}
								style={[styles.brandCard, {backgroundColor: item.color}]}
								activeOpacity={0.9}
							>
								<Text style={styles.brandText}>{item.name}</Text>
							</TouchableOpacity>
						)}
						style={{marginBottom: 12}}
					/>

					{/* favourite categories */}
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

					{/* product strips */}
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

					{/* offers & help */}
					<OffersSection offers={OFFERS} onViewAll={() => goViewAll('Offers')} />
					<HelpSection />
				</ScrollView>
			</ScrollView>
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

	// brands
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
});
