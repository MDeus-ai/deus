/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Point to all JS/JSX/TS/TSX files for purging unused styles
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0f0f0f',
        'text-primary': '#ffffff',
        'text-secondary': '#d1d1d1',
        'text-tertiary': '#a0a0a0',
        'accent': 'rgba(168, 85, 247)',
        'accent-light': 'rgba(77, 128, 228, 0.1)',
        'heart': '#ff6b6b',
      },
      fontFamily: {
        'roboto-slab': ['"Roboto Slab"', 'serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            maxWidth: 'none',
            code: {
              backgroundColor: theme('colors.neutral.800'),
              borderRadius: theme('borderRadius.md'),
              padding: '0.2em 0.4em',
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.neutral[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-lead': theme('colors.neutral[400]'),
            '--tw-prose-links': theme('colors.pink[500]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-counters': theme('colors.neutral[400]'),
            '--tw-prose-bullets': theme('colors.neutral[600]'),
            '--tw-prose-hr': theme('colors.neutral[700]'),
            '--tw-prose-quotes': theme('colors.neutral[100]'),
            '--tw-prose-quote-borders': theme('colors.pink[500]'),
            '--tw-prose-captions': theme('colors.neutral[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.neutral[300]'),
            '--tw-prose-pre-bg': theme('colors.neutral[900]'),
            '--tw-prose-tables': theme('colors.white'),
            '--tw-prose-th-borders': theme('colors.neutral[700]'),
            '--tw-prose-td-borders': theme('colors.neutral[800]'),
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
