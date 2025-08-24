import {useEffect, useState} from 'react';
import http from '../services/http';

const flattenHome = (raw) => ({
	tabs: raw?.tabs ?? [],
	slides: raw?.slides ?? [],
	brands: raw?.brands ?? [],
	categories: raw?.categories ?? [],
	hot: raw?.sections?.hot ?? [],
	trending: raw?.sections?.trending ?? [],
	recommended: raw?.sections?.recommended ?? [],
	offers: raw?.sections?.offers ?? [],
	deals: raw?.sections?.deals ?? [],
});

export default function useHome() {
	const [data, setData] = useState(null); // {tabs, slides, brands, ...}
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		let ok = true;
		setLoading(true);
		http
			.get('/home')
			.then((r) => ok && setData(flattenHome(r.data)))
			.catch((e) => ok && setError(e?.message || 'Failed to load'))
			.finally(() => ok && setLoading(false));
		return () => {
			ok = false;
		};
	}, []);

	return {
		data,
		loading,
		error,
		reload: () => {
			setLoading(true);
			http
				.get('/home')
				.then((r) => setData(flattenHome(r.data)))
				.catch((e) => setError(e?.message || 'Failed to load'))
				.finally(() => setLoading(false));
		},
	};
}
