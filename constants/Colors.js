// constants/Colors.js (or Colors.ts)
const PALETTE = {
	primary: '#16a34a',
	success: '#7fda49',
	danger: '#ef4444',
	white: '#ffffff',
	black: '#000000',
	dark: '#111827',

	// grays
	gray50: '#f9fafb',
	gray100: '#f1f5f9',
	gray200: '#e2e8f0',
	gray300: '#cbd5e1',
	gray400: '#9ca3af',
	gray500: '#6b7280',

	// accents
	brandBlue: '#e6f3ff',
	brandPurple: '#f4f1ff',
	brandGreenTint: '#e8f7ee',
};

export const Colors = {
	light: {
		...PALETTE,
		text: '#111827', // dark text on light bg
		background: '#ffffff',
		tint: PALETTE.primary, // used for links / selected
		icon: PALETTE.gray500,
		tabIconDefault: PALETTE.gray400,
		tabIconSelected: PALETTE.primary,
	},
	dark: {
		...PALETTE,
		text: '#ECEDEE',
		background: '#111827',
		tint: '#ffffff', // white highlight on dark
		icon: '#9BA1A6',
		tabIconDefault: '#9BA1A6',
		tabIconSelected: '#ffffff',
	},
};

// optional: export the raw palette if you want direct access elsewhere
export const COLORS = PALETTE;
