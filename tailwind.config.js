/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	theme: {
		fontFamily: {
			sans: 'var(--font-sans)',
			serif: 'var(--font-serif)',
		},
		extend: {
			width: {
				'2px': '2px',
			},
			height: {
				'screen-1/2': '50vh',
				'screen-3/5': '60vh',
				'screen-2/3': '66.66666vh',
				'screen-4/5': '80vh',
			},
			maxHeight: {
				'screen-4/5': '80vh',
			},
		},
	},
	plugins: [],
}
