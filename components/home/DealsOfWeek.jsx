import {Ionicons} from '@expo/vector-icons';
import {useEffect, useMemo, useState} from 'react';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
const {width} = Dimensions.get('window');

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

function Card({item, hrs, mins, secs}) {
	return (
		<View style={styles.card}>
			{/* header */}
			<View style={styles.headerRow}>
				<Text style={styles.headerTitle}>Deals of the Week</Text>
				<View style={styles.timerRow}>
					<Pill value={hrs} label="Hr" />
					<Pill value={mins} label="Min" />
					<Pill value={secs} label="Sec" />
				</View>
			</View>

			{/* body */}
			{item.off ? (
				<View style={styles.offBadge}>
					<Text style={styles.offText}>৳{item.off} OFF</Text>
				</View>
			) : null}

			<View style={styles.bodyRow}>
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
	// demo fallback: ~111h 31m 40s
	const target = useMemo(() => deadline ?? Date.now() + 111 * 3600 * 1000 + 31 * 60 * 1000 + 40 * 1000, [deadline]);
	const {hrs, mins, secs} = useCountdown(target);

	return (
		<View style={{marginTop: 8, marginBottom: 14}}>
			<FlatList
				data={deals}
				keyExtractor={(d) => d.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({item}) => <Card item={item} hrs={hrs} mins={mins} secs={secs} />}
				contentContainerStyle={{paddingVertical: 4}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		width: width - 24,
		backgroundColor: COLORS.white,
		borderRadius: 14,
		marginRight: 12,
		overflow: 'hidden',
		shadowColor: COLORS.black,
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 3,
		borderWidth: 1,
		borderColor: COLORS.gray200,
	},
	headerRow: {
		backgroundColor: '#facc15',
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
	offBadge: {
		position: 'absolute',
		left: 10,
		top: 44,
		backgroundColor: COLORS.danger,
		paddingVertical: 4,
		paddingHorizontal: 6,
		borderRadius: 6,
		zIndex: 2,
	},
	offText: {color: COLORS.white, fontWeight: '800', fontSize: 11},
	bodyRow: {flexDirection: 'row', padding: 12},
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
});
