import {useEffect, useState} from 'react';
import http from '../services/http';

export default function useProduct(id) {
	const [data, setData] = useState(null); // product object
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		if (!id) return;
		let ok = true;
		setLoading(true);
		http
			.get(`/products/${id}`)
			.then((r) => ok && setData(r.data))
			.catch((e) => ok && setError(e?.message || 'Failed to load product'))
			.finally(() => ok && setLoading(false));
		return () => {
			ok = false;
		};
	}, [id]);

	return {data, loading, error};
}
