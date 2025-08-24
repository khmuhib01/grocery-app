// app/(drawer)/(tabs)/home/ProductScreen.jsx
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../../store/slices/cartSlice';

// ⬇️ use the central demo data for now (later you’ll swap to API)
import {PRODUCTS} from '../../../../data/homeData';

// Reuse the exact ProductCard used on Home
// If your path differs, adjust the ../../… part.
import {ProductCard} from '../../../../components/home';

export default function ProductScreen() {
	const dispatch = useDispatch();

	// build a quick lookup so ProductCard can be “controlled” with current qty
	const cartItems = useSelector((s) => s.cart.items);
	const qtyById = {};
	for (const it of cartItems) qtyById[it.id] = it.qty;

	return (
		<SafeAreaView style={{flex: 1}}>
			<View style={styles.grid}>
				<FlatList
					data={PRODUCTS.map((p) => ({
						// map demo fields → ProductCard fields
						id: p.id,
						name: p.name,
						img: p.images?.[0] || 'https://picsum.photos/seed/placeholder/600/600',
						mrp: p.mrp,
						price: p.price,
						off: p.mrp ? Math.max(0, Math.round(p.mrp - p.price)) : 0,
						brand_id: p.brand_id,
					}))}
					keyExtractor={(it) => it.id}
					numColumns={2}
					columnWrapperStyle={{gap: 12}}
					contentContainerStyle={{padding: 12, paddingBottom: 100, gap: 12}}
					renderItem={({item}) => (
						<ProductCard
							item={item}
							width={styles.cardW.width}
							qty={qtyById[item.id] ?? 0}
							onChangeQty={(next) => {
								// Optional: if next goes 0→1 we already handle in onAdd.
								// If you want + and – to update Redux too, wire actions here.
							}}
							onAdd={(prod) => dispatch(addToCart(prod))}
							onPressCard={(prod) => {
								// If you have a detail page, navigate:
								// router.push(`/product/${prod.id}`);
							}}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	grid: {flex: 1, backgroundColor: '#fff'},
	cardW: {width: /* will be read directly above */ 172}, // fallback width for 2-col grid
});
