// components/home/HelpSection.jsx
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {useRef} from 'react';
import {Animated, Easing, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

function HelpPill({name, type = 'ionicon', label, onPress}) {
	// tiny scale animation on press
	const scale = useRef(new Animated.Value(1)).current;

	const animateTo = (to) =>
		Animated.timing(scale, {
			toValue: to,
			duration: 120,
			easing: Easing.out(Easing.quad),
			useNativeDriver: true,
		}).start();

	return (
		<Animated.View style={{transform: [{scale}]}}>
			<TouchableOpacity
				activeOpacity={0.92}
				onPressIn={() => {
					animateTo(0.97);
					Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
				}}
				onPressOut={() => animateTo(1)}
				onPress={onPress}
				style={styles.pill}
			>
				<View style={styles.pillIconWrap}>
					{type === 'ionicon' ? (
						<Ionicons name={name} size={18} color="#7c3aed" />
					) : (
						<MaterialCommunityIcons name={name} size={18} color="#7c3aed" />
					)}
				</View>
				<Text style={styles.pillText}>{label}</Text>
				<Ionicons name="chevron-forward" size={16} color="#7c3aed" />
			</TouchableOpacity>
		</Animated.View>
	);
}

export default function HelpSection() {
	return (
		<View style={styles.wrap}>
			{/* Header */}
			<View style={styles.headerRow}>
				<View>
					<Text style={styles.title}>Need help?</Text>
					<Text style={styles.subtitle}>We’re here 9:00–22:00, every day</Text>
				</View>
				<TouchableOpacity activeOpacity={0.9} style={styles.smallBtn}>
					<Ionicons name="information-circle-outline" size={18} color={COLORS.dark} />
				</TouchableOpacity>
			</View>

			{/* Pills */}
			<View style={styles.pillsRow}>
				<HelpPill name="chatbubble-ellipses-outline" label="Live Chat" onPress={() => {}} />
				<HelpPill name="call-outline" label="Call" onPress={() => {}} />
				<HelpPill name="help-circle-outline" label="FAQ" onPress={() => {}} />
				<HelpPill name="logo-whatsapp" label="WhatsApp" onPress={() => {}} />
				<HelpPill name="facebook-messenger" type="material-community" label="Messenger" onPress={() => {}} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrap: {
		marginTop: 8,
		marginBottom: 20,
	},

	// header
	headerRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 12,
	},
	title: {fontSize: 18, fontWeight: '900', color: COLORS.dark},
	subtitle: {marginTop: 2, color: COLORS.gray500, fontSize: 12},

	smallBtn: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
	},

	// pills
	pillsRow: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	pill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 16,
		marginRight: 10,
		marginBottom: 10,

		// modern “soft” look
		backgroundColor: COLORS.brandPurple, // subtle lilac
		borderWidth: 1,
		borderColor: 'rgba(124, 58, 237, 0.12)',

		shadowColor: COLORS.black,
		shadowOpacity: 0.06,
		shadowOffset: {width: 0, height: 3},
		shadowRadius: 6,
		elevation: 2,
	},
	pillIconWrap: {
		width: 24,
		height: 24,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(124,58,237,0.08)',
		marginRight: 8,
	},
	pillText: {fontWeight: '800', color: COLORS.dark, marginRight: 6},
});
