import {Ionicons} from '@expo/vector-icons';
import {useEffect, useMemo, useRef, useState} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

const {width} = Dimensions.get('window');
const CARD_W = width - 24; // matches your slide width

const DEMO_DEALS = [
	{
		id: 'd1',
		name: 'Rupchanda Soyabean Oil Pet 5ltr',
		unit: 'EACH',
		img: 'https://picsum.photos/seed/oil5l/500/500',
		mrp: 907,
		price: 889,
		off: 18,
	},
	{
		id: 'd2',
		name: 'Teer Sugar 1kg',
		unit: 'EACH',
		img: 'https://picsum.photos/seed/sugar/500/500',
		mrp: 120,
		price: 110,
		off: 10,
	},
];

function useCountdown(targetDate) {
	const [left, setLeft] = useState(() => Math.max(0, targetDate - Date.now()));
	useEffect(() => {
		const t = setInterval(() => setLeft(Math.max(0, targetDate - Date.now())), 1000);
		return () => clearInterval(t);
	}, [targetDate]);
	const total = Math.floor(left / 1000);
	const days = Math.floor(total / (3600 * 24));
	const hrs = Math.floor((total % (3600 * 24)) / 3600) + days * 24;
	const mins = Math.floor((total % 3600) / 60);
	const secs = total % 60;
	return {hrs, mins, secs};
}

const Pill = ({value, label}) => (
	<View style={styles.timerPill}>
		<Text style={styles.timerVal}>{String(value).padStart(2, '0')}</Text>
		<Text style={styles.timerLbl}>{label}</Text>
	</View>
);

function ProductSlide({item}) {
	return (
		<View style={{width: CARD_W, padding: 10}}>
			<View style={styles.productRow}>
				<Image source={{uri: item.img}} style={styles.productImg} resizeMode="contain" />
				<View style={styles.infoCol}>
					<Text style={styles.name} numberOfLines={2}>
						{item.name}
					</Text>
					<Text style={styles.unit}>{item.unit}</Text>
					<View style={styles.priceRow}>
						{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
						<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
					</View>
					<TouchableOpacity activeOpacity={0.9} onPress={() => {}} style={styles.addBtn}>
						<Ionicons name="add" size={18} color="#111827" />
						<Text style={styles.addTxt}>ADD</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

export default function DealsOfWeek({deals = DEMO_DEALS, deadline}) {
	// demo: ~111h 31m 40s
	const target = useMemo(() => deadline ?? Date.now() + 111 * 3600 * 1000 + 31 * 60 * 1000 + 40 * 1000, [deadline]);
	const {hrs, mins, secs} = useCountdown(target);
	const [index, setIndex] = useState(0);
	const scrollRef = useRef(null);
	const onScroll = (e) => {
		const x = e.nativeEvent.contentOffset.x;
		const i = Math.round(x / CARD_W);
		if (i !== index) setIndex(i);
	};

	return (
		<View style={{marginTop: 8, marginBottom: 14}}>
			{/* single card (section NOT scrollable) */}
			<View style={styles.card}>
				{/* header */}
				<View style={styles.headerRow}>
					<View>
						<Text style={styles.headerTitle}>Deals of the Week</Text>
						{/* dots BELOW the card */}
						{deals.length > 1 ? (
							<View style={styles.dotsRow}>
								{deals.map((_, i) => (
									<View
										key={`dot-${i}`}
										style={[styles.dot, {backgroundColor: i === index ? COLORS.primary : COLORS.gray300}]}
									/>
								))}
							</View>
						) : null}
					</View>

					<View style={styles.timerRow}>
						<Pill value={hrs} label="Hr" />
						<Pill value={mins} label="Min" />
						<Pill value={secs} label="Sec" />
					</View>
				</View>

				{/* body with INNER horizontal slider */}
				<View style={styles.bodyRow}>
					<ScrollView
						ref={scrollRef}
						horizontal
						pagingEnabled
						showsHorizontalScrollIndicator={false}
						onScroll={onScroll}
						scrollEventThrottle={16}
						snapToInterval={CARD_W}
						decelerationRate="fast"
					>
						{deals.map((d) => (
							<ProductSlide key={d.id} item={d} />
						))}
					</ScrollView>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: CARD_W,
		backgroundColor: COLORS.white,
		borderRadius: 14,
		overflow: 'hidden',
		borderWidth: 3,
		borderColor: COLORS.success,
		alignSelf: 'center',
	},

	headerRow: {
		backgroundColor: COLORS.success,
		paddingHorizontal: 12,
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	headerTitle: {fontWeight: '800', color: '#111827'},
	timerRow: {flexDirection: 'row', alignItems: 'center'},
	timerPill: {
		backgroundColor: COLORS.white,
		borderRadius: 8,
		paddingVertical: 6,
		paddingHorizontal: 8,
		alignItems: 'center',
		marginLeft: 8,
		minWidth: 56,
	},
	timerVal: {fontWeight: '900', fontSize: 16, color: '#111827'},
	timerLbl: {fontSize: 11, color: '#111827'},

	bodyRow: {flexDirection: 'row'},
	productRow: {
		flexDirection: 'row',
		alignItems: 'center',
		borderColor: COLORS.gray100,
		borderWidth: 1,
		borderRadius: 10,
		width: '100%',
		padding: 10,
	},
	productImg: {width: 90, height: 90, borderRadius: 8, backgroundColor: COLORS.gray100},
	infoCol: {flex: 1, marginLeft: 12, justifyContent: 'center'},
	name: {fontSize: 15, fontWeight: '800', color: '#111827'},
	unit: {marginTop: 2, fontSize: 11, color: COLORS.gray500, letterSpacing: 0.5},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 13},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 16},
	addBtn: {
		marginTop: 8,
		borderWidth: 1,
		borderColor: COLORS.gray300,
		paddingVertical: 8,
		paddingHorizontal: 14,
		borderRadius: 10,
		alignSelf: 'flex-start',
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.white,
	},
	addTxt: {marginLeft: 6, fontWeight: '800', color: '#111827'},

	// dots below the section
	dotsRow: {flexDirection: 'row', marginTop: 8},
	dot: {width: 8, height: 8, borderRadius: 999, marginHorizontal: 4},
});
