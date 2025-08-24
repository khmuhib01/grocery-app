// app/(drawer)/(tabs)/profile/index.jsx
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../constants/Colors';
import {clearAuth} from '../../../../store/slices/userSlice';

export default function ProfileScreen() {
	const dispatch = useDispatch();
	// Pull user info if you have it in redux, else fallback
	const user = useSelector((s) => s.user?.user) ?? {
		name: 'John Doe',
		phone: '+8801XXXXXXX',
		email: 'john@example.com',
		avatar: 'https://i.pravatar.cc/300?img=12',
	};

	const Stat = ({label, value}) => (
		<View style={styles.stat}>
			<Text style={styles.statValue}>{value}</Text>
			<Text style={styles.statLabel}>{label}</Text>
		</View>
	);

	const Row = ({icon, label, right, onPress, danger}) => (
		<TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.row}>
			<View style={styles.rowLeft}>
				<View style={[styles.rowIcon, danger && {backgroundColor: '#FEE2E2'}]}>
					<Ionicons name={icon} size={18} color={danger ? COLORS.danger : COLORS.dark} />
				</View>
				<Text style={[styles.rowLabel, danger && {color: COLORS.danger}]}>{label}</Text>
			</View>
			<View style={styles.rowRight}>
				{right ? <Text style={styles.rowRightText}>{right}</Text> : null}
				<Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: COLORS.gray50}} edges={['top', 'left', 'right']}>
			<ScrollView contentContainerStyle={{padding: 12, paddingBottom: 32}}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Profile</Text>
					<TouchableOpacity style={styles.circleBtn} onPress={() => router.push('/settings')}>
						<Ionicons name="settings-outline" size={18} color={COLORS.dark} />
					</TouchableOpacity>
				</View>

				{/* User card */}
				<View style={styles.card}>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<Image source={{uri: user.avatar}} style={styles.avatar} />
						<View style={{marginLeft: 12, flex: 1}}>
							<Text style={styles.name} numberOfLines={1}>
								{user.name}
							</Text>
							<Text style={styles.meta} numberOfLines={1}>
								{user.phone} • {user.email}
							</Text>
						</View>
						<TouchableOpacity style={styles.editBtn} onPress={() => router.push('/profile/edit')}>
							<Ionicons name="create-outline" size={16} color={COLORS.primary} />
							<Text style={styles.editTxt}>Edit</Text>
						</TouchableOpacity>
					</View>

					{/* quick stats */}
					<View style={styles.statsRow}>
						<Stat label="Orders" value="12" />
						<Stat label="Vouchers" value="3" />
						<Stat label="Wishlist" value="27" />
					</View>
				</View>

				{/* Quick actions */}
				<View style={styles.pillsRow}>
					<TouchableOpacity
						activeOpacity={0.9}
						style={[styles.pill, {backgroundColor: COLORS.brandGreenTint}]}
						onPress={() => router.push('/(drawer)/(tabs)/orders/index')}
					>
						<Ionicons name="receipt-outline" size={18} color={COLORS.primary} />
						<Text style={styles.pillTxt}>My Orders</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.9}
						style={[styles.pill, {backgroundColor: COLORS.brandBlue}]}
						onPress={() => router.push('/addresses')}
					>
						<Ionicons name="location-outline" size={18} color={COLORS.dark} />
						<Text style={styles.pillTxt}>Addresses</Text>
					</TouchableOpacity>
					<TouchableOpacity
						activeOpacity={0.9}
						style={[styles.pill, {backgroundColor: COLORS.brandPurple}]}
						onPress={() => router.push('/payments')}
					>
						<Ionicons name="card-outline" size={18} color="#7c3aed" />
						<Text style={styles.pillTxt}>Payments</Text>
					</TouchableOpacity>
				</View>

				{/* Settings list */}
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Account</Text>
					<View style={styles.list}>
						<Row icon="people-outline" label="Edit Profile" onPress={() => router.push('/profile/edit')} />
						<Row icon="home-outline" label="Manage Addresses" onPress={() => router.push('/addresses')} />
						<Row icon="card-outline" label="Payment Methods" onPress={() => router.push('/payments')} />
						<Row
							icon="pricetag-outline"
							label="Vouchers & Offers"
							right="3 active"
							onPress={() => router.push('/vouchers')}
						/>
						<Row icon="notifications-outline" label="Notifications" onPress={() => router.push('/notifications')} />
					</View>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Support</Text>
					<View style={styles.list}>
						<Row icon="chatbubble-ellipses-outline" label="Live Chat" onPress={() => {}} />
						<Row icon="help-circle-outline" label="Help & FAQ" onPress={() => router.push('/help')} />
						<Row icon="document-text-outline" label="Terms & Privacy" onPress={() => router.push('/legal')} />
					</View>
				</View>

				{/* Danger / logout */}
				<View style={styles.section}>
					<View style={styles.list}>
						<Row icon="log-out-outline" label="Sign Out" onPress={() => dispatch(clearAuth())} danger />
					</View>
				</View>

				{/* App meta */}
				<Text style={styles.versionText}>grocery • v1.0.0</Text>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		marginBottom: 10,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	headerTitle: {fontSize: 22, fontWeight: '900', color: COLORS.dark},
	circleBtn: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
	},

	card: {
		borderRadius: 16,
		backgroundColor: COLORS.white,
		padding: 14,
		borderWidth: 1,
		borderColor: '#E7EAF0',
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: {width: 0, height: 4},
		shadowRadius: 8,
		elevation: 2,
	},
	avatar: {width: 56, height: 56, borderRadius: 12, backgroundColor: COLORS.gray100},
	name: {fontWeight: '900', fontSize: 16, color: COLORS.dark},
	meta: {marginTop: 2, color: COLORS.gray500, fontSize: 12},
	editBtn: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: COLORS.primary,
		borderRadius: 10,
		paddingVertical: 6,
		paddingHorizontal: 10,
		backgroundColor: '#f6fff4',
	},
	editTxt: {marginLeft: 6, color: COLORS.primary, fontWeight: '800'},

	statsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 12,
		borderTopWidth: 1,
		borderColor: COLORS.gray100,
		paddingTop: 12,
	},
	stat: {alignItems: 'center', flex: 1},
	statValue: {fontWeight: '900', fontSize: 16, color: COLORS.dark},
	statLabel: {marginTop: 2, fontSize: 11, color: COLORS.gray500},

	pillsRow: {flexDirection: 'row', gap: 10, marginTop: 12, marginBottom: 16},
	pill: {
		flex: 1,
		height: 48,
		borderRadius: 12,
		borderWidth: 0,
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		gap: 8,
	},
	pillTxt: {fontWeight: '800', color: COLORS.dark},

	section: {marginTop: 16},
	sectionTitle: {fontWeight: '800', color: COLORS.gray500, marginBottom: 8, marginLeft: 2, letterSpacing: 0.3},

	list: {
		borderRadius: 14,
		backgroundColor: COLORS.white,
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: '#E7EAF0',
	},
	row: {
		paddingHorizontal: 12,
		paddingVertical: 14,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1,
		borderColor: COLORS.gray100,
	},
	rowLeft: {flexDirection: 'row', alignItems: 'center', gap: 10},
	rowIcon: {
		width: 34,
		height: 34,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.gray100,
	},
	rowLabel: {fontWeight: '800', color: COLORS.dark},
	rowRight: {flexDirection: 'row', alignItems: 'center', gap: 6},
	rowRightText: {color: COLORS.gray400, fontWeight: '700', fontSize: 12},

	versionText: {textAlign: 'center', color: COLORS.gray400, marginTop: 14},
});
