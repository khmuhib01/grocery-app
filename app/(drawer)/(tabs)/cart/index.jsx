import {router} from 'expo-router';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../constants/Colors';
import {clearCart, decreaseQty, increaseQty, removeFromCart} from '../../../../store/slices/cartSlice';

export default function CartScreen() {
	const dispatch = useDispatch();
	const {items, totalAmount, totalQty} = useSelector((s) => s.cart);

	const renderItem = ({item}) => (
		<View style={styles.row}>
			<Image source={{uri: item.img}} style={styles.img} />
			<View style={{flex: 1, marginHorizontal: 10}}>
				<Text style={{fontWeight: '800'}} numberOfLines={2}>
					{item.name}
				</Text>
				<Text style={{color: COLORS.gray500}}>৳{Number(item.price).toLocaleString()}</Text>
				<View style={styles.stepper}>
					<TouchableOpacity onPress={() => dispatch(decreaseQty(item.id))} style={styles.stepBtn}>
						<Text style={styles.stepTxt}>-</Text>
					</TouchableOpacity>
					<Text style={styles.qty}>{item.qty}</Text>
					<TouchableOpacity onPress={() => dispatch(increaseQty(item.id))} style={styles.stepBtn}>
						<Text style={styles.stepTxt}>+</Text>
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))} style={styles.remove}>
				<Text style={{color: '#fff'}}>X</Text>
			</TouchableOpacity>
		</View>
	);

	return (
		<View style={{flex: 1, backgroundColor: '#fff'}}>
			<FlatList
				data={items}
				keyExtractor={(it) => it.id}
				renderItem={renderItem}
				contentContainerStyle={{padding: 12}}
				ListEmptyComponent={<Text style={{textAlign: 'center', marginTop: 40}}>Your cart is empty</Text>}
			/>

			<View style={styles.bottom}>
				<View>
					<Text style={{fontWeight: '800'}}>Items: {totalQty}</Text>
					<Text style={{fontSize: 18, fontWeight: '900'}}>Total: ৳{Number(totalAmount).toLocaleString()}</Text>
				</View>
				<View style={{flexDirection: 'row', gap: 10}}>
					<TouchableOpacity
						onPress={() => dispatch(clearCart())}
						style={[styles.btn, {backgroundColor: COLORS.gray200}]}
					>
						<Text style={[styles.btnTxt, {color: COLORS.dark}]}>Clear</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => router.push('/checkout')} style={styles.btn}>
						<Text style={styles.btnTxt}>Proceed</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 10,
		borderWidth: 1,
		borderColor: '#eee',
		borderRadius: 12,
		marginBottom: 10,
	},
	img: {width: 64, height: 64, borderRadius: 10, backgroundColor: '#f6fff4'},
	stepper: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
	stepBtn: {
		width: 28,
		height: 28,
		borderRadius: 6,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.primary,
	},
	stepTxt: {color: '#fff', fontWeight: '900', fontSize: 16, lineHeight: 20},
	qty: {minWidth: 30, textAlign: 'center', fontWeight: '800'},
	remove: {
		width: 32,
		height: 32,
		borderRadius: 8,
		backgroundColor: COLORS.danger,
		alignItems: 'center',
		justifyContent: 'center',
	},
	bottom: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		padding: 12,
		borderTopWidth: 1,
		borderColor: '#eee',
	},
	btn: {
		backgroundColor: COLORS.primary,
		height: 44,
		paddingHorizontal: 18,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnTxt: {color: '#fff', fontWeight: '900'},
});
