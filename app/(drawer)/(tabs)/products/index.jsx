// app/(drawer)/(tabs)/home/ProductScreen.jsx
import {StatusBar} from 'expo-status-bar';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../../../../store/slices/cartSlice';

// Demo data (swap to API later)
import {PRODUCTS} from '../../../../data/homeData';

// Reuse your card
import {ProductCard} from '../../../../components/home';

export default function ProductScreen() {
	const dispatch = useDispatch();
	const insets = useSafeAreaInsets();

	// build a quick lookup so ProductCard can be “controlled” with current qty
	const cartItems = useSelector((s) => s.cart.items);
	const qtyById = {};
	for (const it of cartItems) qtyById[it.id] = it.qty;

	return (
		<SafeAreaView
			style={styles.safe}
			edges={['top', 'left', 'right']} // we’ll handle bottom padding ourselves for the tab bar
		>
			<StatusBar style="dark" />
			<View style={[styles.grid, {paddingTop: insets.top}]}>
				<FlatList
					data={PRODUCTS.map((p) => ({
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
					// Add bottom padding = safe‑area bottom + room for any floating bars
					contentContainerStyle={{
						padding: 12,
						paddingBottom: insets.bottom + 100,
						gap: 12,
					}}
					// Make iOS honor safe-area inset adjustments automatically
					contentInsetAdjustmentBehavior="automatic"
					renderItem={({item}) => (
						<ProductCard
							item={item}
							width={styles.cardW.width}
							qty={qtyById[item.id] ?? 0}
							onAdd={(prod) => dispatch(addToCart(prod))}
							onChangeQty={() => {
								// If you later wire direct +/– to Redux, handle here.
							}}
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: {flex: 1, backgroundColor: '#fff'},
	grid: {flex: 1, backgroundColor: '#fff'},
	cardW: {width: 172},
});
