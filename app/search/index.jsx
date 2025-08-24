// app/search/index.jsx
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../constants/Colors';
// import {searchProducts} from '../../lib/api/apiService'; // when ready

export default function SearchScreen() {
	const router = useRouter();
	const {q: initialQ = ''} = useLocalSearchParams(); // read ?q=...
	const [query, setQuery] = useState(String(initialQ));
	const [results, setResults] = useState([]);

	// Example: debounce + fetch (replace with your real API)
	useEffect(() => {
		const t = setTimeout(async () => {
			if (!query.trim()) {
				setResults([]);
				return;
			}
			// const data = await searchProducts(query);
			// setResults(data);
		}, 300);
		return () => clearTimeout(t);
	}, [query]);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search groceries, e.g. rice, oil..."
				placeholderTextColor={COLORS.gray400}
				value={query}
				onChangeText={setQuery}
				autoFocus
				returnKeyType="search"
				onSubmitEditing={() => {
					/* trigger fetch explicitly if you want */
				}}
			/>

			{/* demo list */}
			{results.length === 0 ? (
				<Text style={styles.hint}>Type to search…</Text>
			) : (
				<FlatList
					data={results}
					keyExtractor={(item) => String(item.id)}
					renderItem={({item}) => (
						<TouchableOpacity style={styles.row} onPress={() => router.push(`/products/${item.id}`)}>
							<Text style={styles.rowText}>{item.name}</Text>
						</TouchableOpacity>
					)}
					ItemSeparatorComponent={() => <View style={{height: 8}} />}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {flex: 1, padding: 12, backgroundColor: COLORS.white},
	input: {
		height: 48,
		borderWidth: 1,
		borderColor: COLORS.gray300,
		borderRadius: 12,
		paddingHorizontal: 12,
		marginBottom: 12,
		fontSize: 16,
		backgroundColor: COLORS.gray50,
		color: COLORS.dark,
	},
	hint: {color: COLORS.gray500},
	row: {padding: 12, borderRadius: 10, backgroundColor: COLORS.gray100},
	rowText: {color: COLORS.dark, fontWeight: '700'},
});
