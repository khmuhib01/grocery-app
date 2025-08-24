// src/data/homeData.js

/* =========================
 *   TOP-LEVEL NAV / HERO
 * ========================= */

// Top category tabs (Ionicons names)
export const tabs = [
	{id: 'grocery', label: 'Grocery', icon: 'basket'},
	{id: 'pharmacy', label: 'Pharmacy', icon: 'medkit'},
	{id: 'clothes', label: 'Clothes', icon: 'shirt'},
	{id: 'cookups', label: 'Cookups', icon: 'fast-food'},
];

// Hero slider
export const SLIDES = [
	{id: 's1', img: 'https://picsum.photos/seed/slide1/1200/500', title: '10% Discount!'},
	{id: 's2', img: 'https://picsum.photos/seed/slide2/1200/500', title: 'Weekend Combo Deals'},
	{id: 's3', img: 'https://picsum.photos/seed/slide3/1200/500', title: 'Bank Offer'},
];

// Brand chips (simple UI row)
export const BRANDS = [
	{id: 'b0', name: 'All Offers', color: '#d1fae5'},
	{id: 'b1', name: 'Unilever', color: '#e0e7ff'},
	{id: 'b2', name: 'Pran-RFL', color: '#ffe4e6'},
	{id: 'b3', name: 'ACI', color: '#fde68a'},
	{id: 'b4', name: 'Teer', color: '#e9d5ff'},
	{id: 'b5', name: 'Square', color: '#cffafe'},
	{id: 'b6', name: 'Kazi Farmas', color: '#fef3c7'},
];

// Category tiles (home favorite)
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

/* =========================
 *  HOME PRODUCT STRIPS
 * ========================= */

export const HOT_FAST_MOVERS = [
	{
		id: 'p1',
		name: 'Alu Regular Loose Kg',
		unit: 'Per Kg',
		img: 'https://picsum.photos/seed/p1/300/300',
		mrp: 125,
		price: 119,
		off: 6,
		brand_id: 'b2',
		category_id: 'c1',
	},
	{
		id: 'p2',
		name: 'Fresh Atta 2kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p2/300/300',
		mrp: 140,
		price: 120,
		off: 20,
		brand_id: 'b2',
		category_id: 'c3',
	},
	{
		id: 'p3',
		name: 'Teer Sugar 1kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p3/300/300',
		mrp: 120,
		price: 110,
		off: 10,
		brand_id: 'b4',
		category_id: 'c9',
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
		brand_id: 'b5',
		category_id: 'c5',
	},
	{
		id: 'p5',
		name: 'Seylon Family Blend Tea 400gm',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p5/300/300',
		mrp: 225,
		price: 185,
		off: 40,
		brand_id: 'b5',
		category_id: 'c4',
	},
	{
		id: 'p6',
		name: 'Surf Excel 1kg',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p6/300/300',
		mrp: 235,
		price: 210,
		off: 25,
		brand_id: 'b5',
		category_id: 'c6',
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
		brand_id: 'b3',
		category_id: 'c3',
	},
	{
		id: 'p8',
		name: 'Gorur Mangsho–Alu Mix Combo (Small)',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p8/300/300',
		mrp: 180,
		price: 160,
		off: 20,
		brand_id: 'b2',
		category_id: 'c2',
	},
	{
		id: 'p9',
		name: 'Egg Loose',
		unit: 'Per Piece',
		img: 'https://picsum.photos/seed/p9/300/300',
		mrp: 14,
		price: 12.5,
		off: 1.5,
		brand_id: 'b6',
		category_id: 'c1',
	},
];

// Offers (simple banner)
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

// Deals grid cards
export const DEALS = [
	{
		id: 'd1',
		name: 'Rupchanda Soyabean Oil 5L',
		unit: 'EACH',
		img: 'https://picsum.photos/seed/oil5l/500/500',
		mrp: 907,
		price: 889,
		off: 18,
	},
	{
		id: 'd2',
		name: 'Kazi Farmas Egg 12pcs',
		unit: 'EACH',
		img: 'https://picsum.photos/seed/egg12/500/500',
		mrp: 175,
		price: 165,
		off: 10,
	},
	{
		id: 'd3',
		name: 'Pran Miniket Rice 5kg',
		unit: 'EACH',
		img: 'https://picsum.photos/seed/miniket/500/500',
		mrp: 650,
		price: 615,
		off: 35,
	},
];

/* =========================
 *   CATALOG / STORES / ZONES
 * ========================= */

// Stores (single-vendor ready → multi-store later)
export const STORES = [
	{
		id: 's_meenabazar',
		name: 'Meena Bazar Kachukhet',
		phone: '+8801XXXXXXXXX',
		address: 'Kachukhet, Dhaka 1206',
		lat: 23.8284,
		lng: 90.387,
		currency: 'BDT',
		min_order: 200, // cart minimum
		pickup_enabled: true,
		delivery_enabled: true,
		delivery_eta_min: 30,
		delivery_eta_max: 60,
		service_hours: '09:00-22:00',
		accepts: ['CASH', 'CARD', 'COD', 'bKash', 'Nagad'],
		logo: 'https://picsum.photos/seed/meena/200/200',
		cover: 'https://picsum.photos/seed/meenacover/1200/400',
	},
];

// Opening hours (per weekday; 0=Sun)
export const STORE_SCHEDULES = [
	{
		store_id: 's_meenabazar',
		timezone: 'Asia/Dhaka',
		days: {
			0: [{open: '09:00', close: '22:00'}],
			1: [{open: '09:00', close: '22:00'}],
			2: [{open: '09:00', close: '22:00'}],
			3: [{open: '09:00', close: '22:00'}],
			4: [{open: '09:00', close: '22:00'}],
			5: [{open: '09:00', close: '22:00'}],
			6: [{open: '09:00', close: '22:00'}],
		},
		order_policy: {
			asap: true,
			slot_interval_mins: 30,
			lead_time_mins: 20, // prep time before earliest slot
			max_days_ahead: 3,
		},
	},
];

// Delivery zones (postcode-based)
export const DELIVERY_ZONES = [
	{
		store_id: 's_meenabazar',
		code: 'KCH-1206',
		name: 'Kachukhet',
		postal_codes: ['1206'],
		base_fee: 40,
		min_order: 200,
		free_over: 1200,
		eta_min: 30,
		eta_max: 59,
	},
	{
		store_id: 's_meenabazar',
		code: 'BN-1216',
		name: 'Banani',
		postal_codes: ['1213', '1216'],
		base_fee: 60,
		min_order: 250,
		free_over: 1500,
		eta_min: 40,
		eta_max: 75,
	},
];

// Shipping fee tiers (fallback if zone not matched)
export const SHIPPING_RULES = [
	{threshold: 0, fee: 60},
	{threshold: 500, fee: 40},
	{threshold: 1200, fee: 0},
];

/* =========================
 *    CATEGORIES (TREE)
 * ========================= */

export const CATEGORY_TREE = [
	{
		id: 'gcg',
		name: 'Grocery',
		children: [
			{id: 'veg', name: 'Vegetables'},
			{id: 'frt', name: 'Fruits'},
			{
				id: 'sta',
				name: 'Staples',
				children: [
					{id: 'rice', name: 'Rice'},
					{id: 'flour', name: 'Flour & Atta'},
					{id: 'sugar', name: 'Sugar & Salt'},
				],
			},
			{
				id: 'bevg',
				name: 'Beverages',
				children: [
					{id: 'soft', name: 'Soft Drinks'},
					{id: 'tea', name: 'Tea'},
					{id: 'coffee', name: 'Coffee'},
				],
			},
			{
				id: 'snacks',
				name: 'Snacks',
				children: [
					{id: 'biscuits', name: 'Biscuits'},
					{id: 'chips', name: 'Chips'},
					{id: 'chocolate', name: 'Chocolate & Candy'},
				],
			},
			{id: 'frozen', name: 'Frozen & Ice Cream'},
		],
	},
];

/* =========================
 *        PRODUCTS
 * =========================
 * Fields:
 * id, store_id, sku, name, brand_id, category_ids[],
 * price, mrp, vat_pct, stock, unit, images[], tags[], rating,
 * variants [{id, label, priceDelta, stock}], options [{name, values[]}],
 * is_active
 */

export const PRODUCTS = [
	{
		id: 'prod_rice_miniket_5kg',
		store_id: 's_meenabazar',
		sku: 'RICE-MINI-5',
		name: 'Pran Miniket Rice 5kg',
		brand_id: 'b2',
		category_ids: ['gcg', 'sta', 'rice'],
		price: 615,
		mrp: 650,
		vat_pct: 0,
		stock: 42,
		unit: 'bag',
		images: ['https://picsum.photos/seed/miniket/600/600'],
		tags: ['staples', 'best_seller'],
		rating: 4.7,
		variants: [
			{id: 'v1', label: '5kg', priceDelta: 0, stock: 42},
			{id: 'v2', label: '10kg', priceDelta: 580, stock: 21},
		],
		options: [],
		is_active: true,
	},
	{
		id: 'prod_oil_rupchanda_1l',
		store_id: 's_meenabazar',
		sku: 'OIL-RUP-1L',
		name: 'Rupchanda Soyabean Oil 1L',
		brand_id: 'b3',
		category_ids: ['gcg', 'sta'],
		price: 190,
		mrp: 205,
		vat_pct: 0,
		stock: 120,
		unit: 'bottle',
		images: ['https://picsum.photos/seed/rup1l/600/600'],
		tags: ['cooking'],
		rating: 4.5,
		variants: [
			{id: 'v1', label: '1L', priceDelta: 0, stock: 120},
			{id: 'v2', label: '5L', priceDelta: 699, stock: 18},
		],
		is_active: true,
	},
	{
		id: 'prod_egg_12pcs',
		store_id: 's_meenabazar',
		sku: 'EGG-12',
		name: 'Kazi Farmas Egg 12pcs',
		brand_id: 'b6',
		category_ids: ['gcg', 'sta'],
		price: 165,
		mrp: 175,
		vat_pct: 0,
		stock: 64,
		unit: 'tray',
		images: ['https://picsum.photos/seed/egg12/600/600'],
		tags: ['breakfast'],
		rating: 4.6,
		variants: [],
		is_active: true,
	},
	{
		id: 'prod_tea_seylon_400g',
		store_id: 's_meenabazar',
		sku: 'TEA-SEY-400',
		name: 'Seylon Family Blend Tea 400g',
		brand_id: 'b5',
		category_ids: ['gcg', 'bevg', 'tea'],
		price: 185,
		mrp: 225,
		vat_pct: 0,
		stock: 80,
		unit: 'pack',
		images: ['https://picsum.photos/seed/teapack/600/600'],
		tags: ['beverage', 'trending'],
		rating: 4.4,
		variants: [{id: 'v1', label: '400g', priceDelta: 0, stock: 80}],
		is_active: true,
	},
	{
		id: 'prod_noodles_mag_8pack',
		store_id: 's_meenabazar',
		sku: 'NOOD-MAG-8',
		name: 'Maggi Noodles Family Pack (8x)',
		brand_id: 'b2',
		category_ids: ['gcg', 'snacks'],
		price: 220,
		mrp: 250,
		vat_pct: 0,
		stock: 33,
		unit: 'pack',
		images: ['https://picsum.photos/seed/nood8/600/600'],
		tags: ['snack', 'kids'],
		rating: 4.3,
		variants: [],
		is_active: true,
	},
	{
		id: 'prod_ice_kulfi_4pc',
		store_id: 's_meenabazar',
		sku: 'ICE-KUL-4',
		name: 'Premium Kulfi Ice Cream 4pcs',
		brand_id: 'b5',
		category_ids: ['gcg', 'frozen'],
		price: 280,
		mrp: 320,
		vat_pct: 0,
		stock: 17,
		unit: 'box',
		images: ['https://picsum.photos/seed/kulfi/600/600'],
		tags: ['frozen', 'dessert'],
		rating: 4.2,
		variants: [],
		is_active: true,
	},
];

/* =========================
 *     PROMOS / VOUCHERS
 * ========================= */

// Rich discounts (auto-applied based on rules)
export const DISCOUNTS = [
	{
		id: 'disc_bulk_staples',
		title: 'Staples Saver',
		description: 'Get ৳50 off on staples over ৳700 cart value',
		type: 'cart_amount', // cart_amount | item_brand | category
		value_bd: 50,
		min_cart: 700,
		applies_to: {categories: ['sta'], brands: [], products: []},
		can_stack_with_voucher: true,
		active: true,
	},
	{
		id: 'disc_brand_teer',
		title: 'TEER 5% Off',
		description: '5% off on all TEER products',
		type: 'item_brand',
		percent: 5,
		applies_to: {brands: ['b4']},
		can_stack_with_voucher: true,
		active: true,
	},
];

// Vouchers (user-entered; code based)
export const VOUCHERS = [
	{
		id: 'v_flat60',
		code: 'FLAT60',
		title: 'Flat ৳60 off',
		type: 'flat',
		amount: 60,
		min_cart: 600,
		usage_limit_per_user: 3,
		valid_from: '2025-08-01',
		valid_to: '2025-12-31',
		active: true,
	},
	{
		id: 'v_pct10',
		code: 'SAVE10',
		title: '10% off (max ৳200)',
		type: 'percent',
		percent: 10,
		max_discount: 200,
		min_cart: 800,
		active: true,
	},
];

/* =========================
 *   PAYMENT GATEWAYS (Mock)
 * ========================= */

export const PAYMENT_METHODS = [
	{
		id: 'pm_cash',
		label: 'Cash on Delivery',
		type: 'CASH',
		enabled: true,
	},
	{
		id: 'pm_card',
		label: 'Card (Mock Gateway)',
		type: 'CARD',
		enabled: true,
		gateways: [
			{id: 'gw_mock_1', name: 'MockPay', fee_pct: 0, fee_fixed: 0},
			{id: 'gw_mock_2', name: 'TestPay', fee_pct: 0, fee_fixed: 0},
		],
	},
	{
		id: 'pm_bkash',
		label: 'bKash',
		type: 'bKash',
		enabled: true,
		gateways: [{id: 'gw_bkash', name: 'bKash PG', fee_pct: 0, fee_fixed: 0}],
	},
];

/* =========================
 *      HELPERS / MAPS
 * ========================= */

export const mapById = (arr) => Object.fromEntries(arr.map((x) => [x.id, x]));
export const BRANDS_BY_ID = mapById(BRANDS);
export const PRODUCTS_BY_ID = mapById(PRODUCTS);
export const STORES_BY_ID = mapById(STORES);
export const ZONES_BY_CODE = mapById(DELIVERY_ZONES);

// Quick shipping fee calculator using SHIPPING_RULES
export const calcShippingFee = (cartTotal) => {
	// largest threshold <= cartTotal
	let fee = SHIPPING_RULES[0].fee;
	for (const rule of SHIPPING_RULES) {
		if (cartTotal >= rule.threshold) fee = rule.fee;
	}
	return fee;
};

// Apply brand/category discount examples (very simplified)
export const applyDiscounts = (cartItems) => {
	let discountTotal = 0;

	// Example brand % off (TEER)
	const brandDisc = DISCOUNTS.find((d) => d.id === 'disc_brand_teer' && d.active);
	if (brandDisc?.percent) {
		for (const it of cartItems) {
			const brandMatch = it.brand_id === 'b4';
			if (brandMatch) {
				const line = (it.price * it.qty * brandDisc.percent) / 100;
				discountTotal += line;
			}
		}
	}

	return Math.round(discountTotal);
};

// Apply cart-level discounts
export const applyCartDiscounts = (cartTotal) => {
	let cartLevel = 0;
	const staples = DISCOUNTS.find((d) => d.id === 'disc_bulk_staples' && d.active);
	if (staples && cartTotal >= staples.min_cart) {
		cartLevel += staples.value_bd;
	}
	return cartLevel;
};
