module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        basic: {
          400: '#2d2f34',
          300: '#3f434a',
          250: '#5e666e',
          200: '#6a707c',
          150: '#acb1b9',
          100: '#ecedef',
          50: '#f1f2f4',
        },
        primary: {},
      },
    },
    theme: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
