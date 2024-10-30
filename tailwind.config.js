/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Point to all JS/JSX/TS/TSX files for purging unused styles
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0f0f0f',
        'text-primary': '#ffffff',
        'text-secondary': '#d1d1d1',
        'text-tertiary': '#a0a0a0',
        'accent': '#BCA37F',
        'accent-light': 'rgba(77, 128, 228, 0.1)',
        'heart': '#ff6b6b',
      },
      fontFamily: {
        'roboto-slab': ['"Roboto Slab"', 'serif'],
      },
    },
  },
  fontFamily: {
    'roboto-slab': ['"Roboto Slab"', 'serif']
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
