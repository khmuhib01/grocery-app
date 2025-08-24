// components/home/ProductStrip.jsx
import {Ionicons} from '@expo/vector-icons';
import {Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
import ProductCard from './ProductCard';

const {width: SCREEN_W} = Dimensions.get('window');

export default function ProductStrip({
	title,
	emoji,
	data = [],
	onViewAll,
	productCardProps = {},
	columns = 3, // show 3 cards per viewport
	gap = 10,
	sidePadding = 0,
	snap = false, // set true if you want snapping per card
}) {
	const itemW = Math.floor((SCREEN_W - sidePadding * 2 - gap * (columns - 1)) / columns);

	return (
		<View style={styles.wrap}>
			<View style={styles.header}>
				<Text style={styles.title}>
					{title} {emoji ? emoji : ''}
				</Text>
				{onViewAll ? (
					<TouchableOpacity onPress={onViewAll} activeOpacity={0.9} style={styles.viewAllBtn}>
						<Text style={styles.viewAllText}>View All</Text>
						<Ionicons name="chevron-forward" size={16} color={COLORS.primary} style={{marginLeft: 4}} />
					</TouchableOpacity>
				) : null}
			</View>

			<FlatList
				data={data}
				horizontal
				keyExtractor={(it) => it.id}
				showsHorizontalScrollIndicator={false}
				ItemSeparatorComponent={() => <View style={{width: gap}} />}
				contentContainerStyle={{paddingHorizontal: sidePadding, paddingVertical: 2}}
				decelerationRate="fast"
				snapToInterval={snap ? itemW + gap : undefined}
				snapToAlignment={snap ? 'start' : undefined}
				disableIntervalMomentum={snap || undefined}
				renderItem={({item}) => (
					<ProductCard
						item={item}
						width={itemW}
						variant="grid" // compact spacing in the card
						{...productCardProps}
					/>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {marginTop: 6, marginBottom: 14},
	header: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8},
	title: {fontSize: 18, fontWeight: '800'},
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
