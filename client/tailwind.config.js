module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        basic: {
          300: '#3f434a',
          250: '#5e666e',
          200: 'rgba(25, 23, 17, 0.6)',
          150: '#acb1b9',
          100: 'rgb(247, 246, 243)',
          50: 'rgba(55,53,47,0.08)',
        },
        primary: {
          light: 'rgba(25, 23, 17, 0.6)',
          dark: '#2d2f34',
          default: 'rgba(55,53,47)',
        },
      },
    },
    theme: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
