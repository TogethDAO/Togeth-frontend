const plugin = require('tailwindcss/plugin');

module.exports = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					yellow: '#ff7300',
				},
			},
		},
		fontFamily: {
			body: ['Ubuntu', 'system-ui', 'sans-serif'],
			barlow: ['Barlow', 'system-ui', 'sans-serif'],
		},
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				'.text-stroke-gray': {
					'-webkit-text-stroke': '1px #edecec',
				},
			});
		}),
	],
	corePlugins: {},
};
