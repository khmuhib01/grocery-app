// components/CategoriesDrawer.jsx
import {Ionicons} from '@expo/vector-icons';
import {router} from 'expo-router';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/Colors';
import {CATEGORIES} from '../data/homeData';

export default function CategoriesDrawer({navigation}) {
	const onSelect = (cat) => {
		// go to the Products tab and pass category info
		router.push({pathname: '/(tabs)/products', params: {categoryId: cat.id, categoryName: cat.name}});
		navigation?.closeDrawer?.();
	};

	const renderItem = ({item}) => (
		<TouchableOpacity style={styles.row} onPress={() => onSelect(item)} activeOpacity={0.9}>
			<View style={styles.left}>
				<Image source={{uri: item.img}} style={styles.icon} />
				<Text style={styles.label} numberOfLines={1}>
					{item.name}
				</Text>
			</View>
			<Ionicons name="chevron-forward" size={18} color={COLORS.gray400} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.wrap}>
			<View style={styles.header}>
				<Text style={styles.title}>Categories</Text>
				<TouchableOpacity style={styles.closeBtn} onPress={() => navigation?.closeDrawer?.()}>
					<Ionicons name="close" size={20} color={COLORS.dark} />
				</TouchableOpacity>
			</View>

			<FlatList
				data={CATEGORIES}
				keyExtractor={(it) => it.id}
				renderItem={renderItem}
				ItemSeparatorComponent={() => <View style={styles.divider} />}
				contentContainerStyle={{paddingBottom: 24}}
				showsVerticalScrollIndicator={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	wrap: {flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 12},
	header: {flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 12},
	title: {fontSize: 16, fontWeight: '800', color: COLORS.dark},
	closeBtn: {
		width: 34,
		height: 34,
		borderRadius: 17,
		backgroundColor: COLORS.gray100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	row: {
		height: 52,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 6,
	},
	left: {flexDirection: 'row', alignItems: 'center', flex: 1},
	icon: {width: 28, height: 28, borderRadius: 6, marginRight: 10},
	label: {fontSize: 15, fontWeight: '700', color: COLORS.dark, flexShrink: 1},
	divider: {height: 1, backgroundColor: COLORS.gray100},
});
