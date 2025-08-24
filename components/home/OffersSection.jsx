import {Ionicons} from '@expo/vector-icons';
import {Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
const {width} = Dimensions.get('window');

function OfferCard({img}) {
	return (
		<View style={styles.offerCard}>
			<Image source={{uri: img}} style={styles.offerImg} resizeMode="cover" />
		</View>
	);
}

export default function OffersSection({offers, onViewAll}) {
	return (
		<View style={styles.wrap}>
			<View style={styles.header}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>Offers</Text>
				<TouchableOpacity onPress={onViewAll} activeOpacity={0.9} style={styles.viewAllBtn}>
					<Text style={styles.viewAllText}>View All</Text>
					<Ionicons name="chevron-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
				</TouchableOpacity>
			</View>
			<FlatList
				data={offers}
				keyExtractor={(o) => o.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({item}) => <OfferCard img={item.img} />}
				contentContainerStyle={{paddingVertical: 2}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {marginTop: 6, marginBottom: 16},
	header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
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
	viewAllBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: COLORS.brandGreenTint,
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 20,
	},
	viewAllText: {color: COLORS.primary, fontWeight: '700', fontSize: 13},
});
