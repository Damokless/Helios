const {heroui} = require('@heroui/theme');
import  {nextui} from '@nextui-org/theme';
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|date-picker|table|ripple|spinner|calendar|date-input|form|popover|checkbox|spacer).js",
    "./node_modules/@heroui/theme/dist/components/(input|form).js"
  ],
	theme: {
	  extend: {},
	},
  plugins: [nextui(),heroui()],
  }
