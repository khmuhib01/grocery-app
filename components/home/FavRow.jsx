import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

export default function FavRow({item, active, onPress}) {
	return (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[styles.favRow, active && styles.favRowActive]}>
			<Image source={{uri: item.img}} style={styles.favRowImg} resizeMode="cover" />
			<View style={{flex: 1}}>
				<Text style={styles.bold} numberOfLines={2}>
					{item.name}
				</Text>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
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
});
