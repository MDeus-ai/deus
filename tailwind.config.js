/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        'text-primary': 'rgb(var(--color-text-primary) / <alpha-value>)',
        'text-secondary': 'rgb(var(--color-text-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        'accent-text': 'rgb(var(--color-accent-text) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        shadow: 'rgb(var(--color-shadow) / <alpha-value>)',
        'shadow-accent-bg': 'rgb(var(--color-shadow-accent-bg) / <alpha-value>)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        secondary: ['var(--font-secondary)', 'sans-serif'], 
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        'grid-move': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(30px, 30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(2deg)' },
          '50%': { transform: 'translateY(-5px) rotate(-2deg)' },
          '75%': { transform: 'translateY(-15px) rotate(1deg)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          from: { opacity: '0', transform: 'translateX(30px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'grid-move': 'grid-move 20s linear infinite',
        float: 'float 8s ease-in-out infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.8s ease-out forwards',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.text-primary'),
            '--tw-prose-links': theme('colors.text-primary'),
            '--tw-prose-bold': theme('colors.text-primary'),
            '--tw-prose-quotes': theme('colors.text-primary'),
            '--tw-prose-quote-borders': theme('colors.accent'),
            '--tw-prose-font-sans': 'var(--font-body)',
            '--tw-prose-font-mono': 'var(--font-mono)',
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.text-secondary'),
            '--tw-prose-headings': theme('colors.text-primary'),
            '--tw-prose-links': theme('colors.accent'),
            '--tw-prose-bold': theme('colors.text-primary'),
            '--tw-prose-quotes': theme('colors.text-primary'),
            '--tw-prose-quote-borders': theme('colors.accent'),
            '--tw-prose-font-sans': 'var(--font-body)',
            '--tw-prose-font-mono': 'var(--font-mono)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};