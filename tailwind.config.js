import themes from 'daisyui/src/theming/themes'

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,svelte,js,ts}'],
	theme: {
		extend: {}
	},
	plugins: [require('daisyui')],
	daisyui: {
		themes: [{
			light: {
				...themes['cupcake'],
				"--rounded-btn": "0.5rem"
			}
		}],
		logs: false
	}
};
