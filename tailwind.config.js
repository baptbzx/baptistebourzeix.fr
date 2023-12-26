/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'cartograph': ['cartograph-cf', 'monospace'],
      },
      colors: {
        'custom-blue': '#0000C7',
        'custom-dark-blue': '#000052',
        'custom-yellow': '#FFD100',
        'custom-gold': '#87723D',
        'custom-gray': '#C9C5C9',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
