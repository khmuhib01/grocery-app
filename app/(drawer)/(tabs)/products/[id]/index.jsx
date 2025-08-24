import {useLocalSearchParams} from 'expo-router';
import {useEffect} from 'react';
import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../../constants/Colors';
import {addToCart} from '../../../../../store/slices/cartSlice';
import {loadProductById} from '../../../../../store/slices/productSlice';

export default function ProductDetail() {
	const {id} = useLocalSearchParams();
	const dispatch = useDispatch();
	const product = useSelector((s) => s.products.byId[id]);

	useEffect(() => {
		if (!product && id) dispatch(loadProductById(String(id)));
	}, [dispatch, id, product]);

	if (!product)
		return (
			<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
				<Text>Loading…</Text>
			</View>
		);

	const add = () => {
		dispatch(
			addToCart({id: product.id, name: product.name, price: product.price, img: product.images?.[0] || product.img})
		);
	};

	return (
		<ScrollView style={{flex: 1, backgroundColor: '#fff'}} contentContainerStyle={{padding: 12}}>
			<Image source={{uri: product.images?.[0] || product.img}} style={styles.img} resizeMode="contain" />
			<Text style={styles.title}>{product.name}</Text>
			<Text style={styles.unit}>{product.unit || 'EACH'}</Text>
			<View style={styles.priceRow}>
				{product.mrp ? <Text style={styles.mrp}>৳{Number(product.mrp).toLocaleString()}</Text> : null}
				<Text style={styles.price}>৳{Number(product.price).toLocaleString()}</Text>
			</View>

			{product?.variants?.length ? (
				<View style={{marginTop: 8}}>
					<Text style={{fontWeight: '800', marginBottom: 6}}>Variants</Text>
					{product.variants.map((v) => (
						<View key={v.id} style={styles.variantRow}>
							<Text>{v.label}</Text>
							<Text>+৳{v.priceDelta}</Text>
						</View>
					))}
				</View>
			) : null}

			<TouchableOpacity onPress={add} style={styles.addBtn} activeOpacity={0.9}>
				<Text style={styles.addTxt}>ADD TO CART</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	img: {width: '100%', height: 280, backgroundColor: '#f6fff4', borderRadius: 12},
	title: {fontSize: 18, fontWeight: '900', marginTop: 12, color: COLORS.dark},
	unit: {color: COLORS.gray500, marginTop: 2},
	priceRow: {flexDirection: 'row', alignItems: 'center', marginTop: 8},
	mrp: {color: COLORS.gray400, textDecorationLine: 'line-through', marginRight: 8, fontSize: 14},
	price: {color: COLORS.dark, fontWeight: '900', fontSize: 18},
	variantRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderColor: '#eee',
	},
	addBtn: {
		marginTop: 14,
		backgroundColor: COLORS.primary,
		height: 48,
		borderRadius: 12,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addTxt: {color: '#fff', fontWeight: '900'},
});
