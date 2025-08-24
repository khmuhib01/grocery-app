import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';

function HelpPill({name, type = 'ionicon', label, onPress}) {
	return (
		<TouchableOpacity onPress={onPress} activeOpacity={0.9} style={styles.helpPill}>
			{type === 'ionicon' ? (
				<Ionicons name={name} size={18} color="#7c3aed" />
			) : (
				<MaterialCommunityIcons name={name} size={18} color="#7c3aed" />
			)}
			<Text style={styles.helpPillText}>{label}</Text>
		</TouchableOpacity>
	);
}

export default function HelpSection() {
	return (
		<View style={styles.helpWrap}>
			<View style={styles.helpHeaderRow}>
				<Text style={{fontSize: 18, fontWeight: '800'}}>Need help?</Text>
			</View>
			<View style={styles.helpPillRow}>
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
	helpWrap: {marginTop: 6, marginBottom: 20},
	helpHeaderRow: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12},
	helpPillRow: {flexDirection: 'row', flexWrap: 'wrap'},
	helpPill: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 10,
		paddingHorizontal: 14,
		borderRadius: 20,
		backgroundColor: COLORS.brandPurple,
		marginRight: 10,
		marginBottom: 10,
		shadowColor: COLORS.black,
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 2},
		shadowRadius: 4,
		elevation: 2,
	},
	helpPillText: {marginLeft: 8, fontWeight: '700', color: COLORS.dark},
});
