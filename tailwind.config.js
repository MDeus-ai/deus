/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
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
            color: theme('colors.neutral[300]'),
            a: {
              color: theme('colors.pink[500]'),
              '&:hover': {
                color: theme('colors.pink[400]'),
              },
            },
            strong: {
              color: theme('colors.white'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
            code: {
              color: theme('colors.pink[500]'),
              backgroundColor: theme('colors.neutral.800'),
              borderRadius: theme('borderRadius.md'),
              padding: '0.2em 0.4em',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
            'pre code': {
              color: theme('colors.neutral[300]'),
              backgroundColor: 'transparent',
              padding: 0,
            },
            pre: {
              backgroundColor: theme('colors.neutral.900'),
              border: '1px solid',
              borderColor: theme('colors.neutral.800'),
            },
            blockquote: {
              color: theme('colors.neutral[300]'),
              borderLeftColor: theme('colors.pink[500]'),
            },
            table: {
              width: '100%',
              borderCollapse: 'separate',
              borderSpacing: 0,
              marginTop: '2em',
              marginBottom: '2em',
            },
            'thead th': {
              color: theme('colors.white'),
              backgroundColor: theme('colors.neutral.900'),
              borderBottom: '2px solid',
              borderColor: theme('colors.neutral.800'),
              padding: theme('spacing.3'),
              fontWeight: '600',
            },
            'tbody td': {
              padding: theme('spacing.3'),
              borderBottom: '1px solid',
              borderColor: theme('colors.neutral.800'),
              color: theme('colors.neutral[300]'),
            },
            'tbody tr': {
              '&:last-child td': {
                borderBottom: 'none',
              },
            },
            hr: {
              borderColor: theme('colors.neutral.800'),
              marginTop: '3em',
              marginBottom: '3em',
            },
            ul: {
              li: {
                '&::before': {
                  backgroundColor: theme('colors.pink[500]'),
                },
              },
            },
          },
        },
        invert: {
          css: {
            '--tw-prose-body': theme('colors.neutral[300]'),
            '--tw-prose-headings': theme('colors.white'),
            '--tw-prose-links': theme('colors.pink[500]'),
            '--tw-prose-bold': theme('colors.white'),
            '--tw-prose-quotes': theme('colors.neutral[100]'),
            '--tw-prose-quote-borders': theme('colors.pink[500]'),
            '--tw-prose-captions': theme('colors.neutral[400]'),
            '--tw-prose-code': theme('colors.white'),
            '--tw-prose-pre-code': theme('colors.neutral[300]'),
            '--tw-prose-pre-bg': theme('colors.neutral[900]'),
            '--tw-prose-counters': theme('colors.neutral[400]'),
            '--tw-prose-bullets': theme('colors.pink[500]'),
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