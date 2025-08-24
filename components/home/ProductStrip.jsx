import {Ionicons} from '@expo/vector-icons';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import ProductCard from './ProductCard';

export default function ProductStrip({title, data, emoji, onViewAll}) {
	return (
		<View style={styles.stripWrap}>
			<View style={styles.stripHeader}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>
					{title} {emoji || ''}
				</Text>
				<TouchableOpacity onPress={onViewAll} activeOpacity={0.9} style={styles.viewAllBtn}>
					<Text style={styles.viewAllText}>View All</Text>
					<Ionicons name="chevron-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
				</TouchableOpacity>
			</View>

			<FlatList
				data={data}
				keyExtractor={(it) => it.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({item}) => <ProductCard item={item} onAdd={() => {}} />}
				contentContainerStyle={{paddingVertical: 2}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
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
});
