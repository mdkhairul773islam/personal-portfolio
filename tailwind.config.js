module.exports = {
  mode: 'jit',
  purge: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        dark: {
          900: '#0B1120',
          800: '#0F172A',
          700: '#1E293B',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
