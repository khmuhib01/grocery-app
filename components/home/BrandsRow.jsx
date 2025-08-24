// components/home/BrandsRow.jsx
import {FlatList} from 'react-native';
import BrandChip from './BrandChip';

export default function BrandsRow({data, onPressItem}) {
	return (
		<FlatList
			data={data}
			keyExtractor={(b) => b.id}
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={{paddingVertical: 6}}
			renderItem={({item}) => <BrandChip item={item} onPress={() => onPressItem?.(item)} />}
			style={{marginBottom: 12}}
		/>
	);
}
