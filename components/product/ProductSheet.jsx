// components/product/ProductSheet.jsx
import {Ionicons} from '@expo/vector-icons';
import {Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function ProductSheet({item, onClose, onAdd}) {
	if (!item) return null;
	return (
		<Modal transparent animationType="slide" onRequestClose={onClose}>
			<View style={styles.backdrop}>
				<View style={styles.sheet}>
					<TouchableOpacity style={styles.close} onPress={onClose}>
						<Ionicons name="close" size={22} color={COLORS.dark} />
					</TouchableOpacity>

					<Image source={{uri: item.img}} style={styles.hero} resizeMode="contain" />

					<ScrollView contentContainerStyle={{padding: 16}}>
						<Text style={styles.title}>{item.name}</Text>
						<Text style={styles.unit}>EACH</Text>
						<View style={styles.priceRow}>
							{item.mrp ? <Text style={styles.mrp}>৳{Number(item.mrp).toLocaleString()}</Text> : null}
							<Text style={styles.price}>৳{Number(item.price).toLocaleString()}</Text>
						</View>

						<TouchableOpacity onPress={() => onAdd?.(item)} activeOpacity={0.9} style={styles.add}>
							<Ionicons name="add" size={18} color="#fff" />
							<Text style={styles.addTxt}>Add to Cart</Text>
						</TouchableOpacity>

						{/* placeholder details */}
						<Text style={styles.sectionTitle}>Product Details</Text>
						<Text style={styles.bodyText}>
							This is a sample description. Replace with your real product details coming from your backend.
						</Text>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end'},
	sheet: {
		backgroundColor: '#fff',
		borderTopLeftRadius: 16,
		borderTopRightRadius: 16,
		maxHeight: '88%',
		overflow: 'hidden',
	},
	close: {position: 'absolute', right: 12, top: 12, zIndex: 2, padding: 8},
	hero: {width: '100%', height: 200, backgroundColor: '#f7f7f7'},
	title: {fontSize: 18, fontWeight: '800', color: COLORS.dark},
	unit: {marginTop: 2, fontSize: 12, color: COLORS.gray500},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 6, marginBottom: 12},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 14},
	price: {color: COLORS.primary, fontWeight: '900', fontSize: 18},
	add: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 8,
		backgroundColor: COLORS.primary,
		paddingVertical: 12,
		borderRadius: 10,
		marginBottom: 16,
	},
	addTxt: {color: '#fff', fontWeight: '800'},
	sectionTitle: {fontWeight: '800', marginBottom: 6, marginTop: 8},
	bodyText: {color: COLORS.dark, opacity: 0.8, lineHeight: 20},
});
