// components/home/BrandChip.jsx
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient'; // if missing: npx expo install expo-linear-gradient
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

const PRESETS = {
	'All Offers': {
		colors: ['#9AE6B4', '#B7F3D9'], // mint → soft green
		icon: 'gift-outline',
	},
	Unilever: {
		colors: ['#BFD3FF', '#E6EAFE'], // blue → lilac
		// no Unilever icon in Ionicons — show a styled “U”
		textIcon: 'U',
	},
	'Big Save': {
		colors: ['#E7C1FF', '#FAD0E5'], // purple → pink
		icon: 'basket-outline',
	},
	'All Brands': {
		colors: ['#FEC6A1', '#FFD7B8'], // peach → apricot
		icon: 'bookmark-outline',
	},
};

export default function BrandChip({item, onPress}) {
	const preset = PRESETS[item.name] ?? {
		colors: [item.color || '#E5E7EB', '#F5F6F7'],
		icon: 'albums-outline',
	};

	return (
		<Pressable onPress={onPress} style={styles.wrap}>
			<LinearGradient colors={preset.colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.card}>
				<View style={styles.iconBubble}>
					{preset.textIcon ? (
						<Text style={styles.textIcon}>{preset.textIcon}</Text>
					) : (
						<Ionicons name={preset.icon} size={22} color="#fff" />
					)}
				</View>
				<Text style={styles.label} numberOfLines={1}>
					{item.name}
				</Text>
			</LinearGradient>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	wrap: {marginRight: 10},
	card: {
		width: 120,
		height: 100,
		borderRadius: 18,
		padding: 12,
		alignItems: 'center',
		justifyContent: 'center',
		// soft shadow
		shadowColor: '#000',
		shadowOpacity: 0.08,
		shadowOffset: {width: 0, height: 6},
		shadowRadius: 10,
		elevation: 3,
	},
	iconBubble: {
		width: 42,
		height: 42,
		borderRadius: 12,
		backgroundColor: 'rgba(255,255,255,0.35)',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 8,
	},
	textIcon: {fontWeight: '900', color: '#fff', fontSize: 20},
	label: {fontWeight: '800', color: COLORS.dark, opacity: 0.9},
});
