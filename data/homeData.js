// src/data/homeData.js

// Top category tabs
export const tabs = [
	{id: 'grocery', label: 'Grocery', icon: 'basket'},
	{id: 'pharmacy', label: 'Pharmacy', icon: 'medkit'},
	{id: 'cookups', label: 'Cookups', icon: 'fast-food'},
];

// Hero slider
export const SLIDES = [
	{id: 's1', img: 'https://picsum.photos/seed/slide1/1200/500', title: '10% Discount!'},
	{id: 's2', img: 'https://picsum.photos/seed/slide2/1200/500', title: 'Weekend Combo Deals'},
	{id: 's3', img: 'https://picsum.photos/seed/slide3/1200/500', title: 'Bank Offer'},
];

// Brand chips
export const BRANDS = [
	{id: 'b0', name: 'All Offers', color: '#d1fae5'},
	{id: 'b1', name: 'Unilever', color: '#e0e7ff'},
	{id: 'b2', name: 'Big Save', color: '#ffe4e6'},
	{id: 'b3', name: 'All Brands', color: '#fde68a'},
	{id: 'b4', name: 'Household', color: '#e9d5ff'},
];

// Category list
export const CATEGORIES = [
	{id: 'c1', name: 'Eggs', img: 'https://picsum.photos/seed/eggs/200/200'},
	{id: 'c2', name: 'Frozen', img: 'https://picsum.photos/seed/frozen/200/200'},
	{id: 'c3', name: 'Noodles', img: 'https://picsum.photos/seed/noodles/200/200'},
	{id: 'c4', name: 'Tea', img: 'https://picsum.photos/seed/tea/200/200'},
	{id: 'c5', name: 'Coffee', img: 'https://picsum.photos/seed/coffee/200/200'},
	{id: 'c6', name: 'Biscuits', img: 'https://picsum.photos/seed/biscuits/200/200'},
	{id: 'c7', name: 'Soft Drinks', img: 'https://picsum.photos/seed/soft/200/200'},
	{id: 'c8', name: 'Ice Cream', img: 'https://picsum.photos/seed/ice/200/200'},
	{id: 'c9', name: 'Candy & Chocolate', img: 'https://picsum.photos/seed/candy/200/200'},
];

// Products
export const HOT_FAST_MOVERS = [
	{
		id: 'p1',
		name: 'Alu Regular Loose Kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p1/300/300',
		mrp: 125,
		price: 119,
		off: 6,
	},
	{
		id: 'p2',
		name: 'Fresh Atta 2kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p2/300/300',
		mrp: 140,
		price: 120,
		off: 20,
	},
	{
		id: 'p3',
		name: 'Teer Sugar 1kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p3/300/300',
		mrp: 120,
		price: 110,
		off: 10,
	},
];

export const TRENDING = [
	{
		id: 'p4',
		name: 'Marks Full Cream Milk Powder 1000g',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p4/300/300',
		mrp: 945,
		price: 870,
		off: 75,
	},
	{
		id: 'p5',
		name: 'Seylon Family Blend Tea 400gm',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p5/300/300',
		mrp: 225,
		price: 185,
		off: 40,
	},
	{
		id: 'p6',
		name: 'Surf Excel 1kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p6/300/300',
		mrp: 235,
		price: 210,
		off: 25,
	},
];

export const RECOMMENDED = [
	{
		id: 'p7',
		name: 'Radhuni Haleem Mix 200gm',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p7/300/300',
		mrp: 80,
		price: 70,
		off: 10,
	},
	{
		id: 'p8',
		name: 'Gorur Mangsho–Alu Mix Combo (Small)',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p8/300/300',
		mrp: 180,
		price: 160,
		off: 20,
	},
	{
		id: 'p9',
		name: 'Egg Loose',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p9/300/300',
		mrp: 14,
		price: 12.5,
		off: 1.5,
	},
];

// Offers
export const OFFERS = [
	{id: 'o1', img: 'https://picsum.photos/seed/offer1/800/400', title: 'Oil Mega Offer'},
	{id: 'o2', img: 'https://picsum.photos/seed/offer2/800/400', title: 'Dettol Germ Defence'},
	{id: 'o3', img: 'https://picsum.photos/seed/offer3/800/400', title: 'Rice Festival'},
];

// helper: split any array into chunks of 3 (used by category columns)
export const chunk3 = (arr) => {
	const out = [];
	for (let i = 0; i < arr.length; i += 3) out.push(arr.slice(i, i + 3));
	return out;
};
