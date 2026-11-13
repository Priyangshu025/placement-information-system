/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        page: '#F7F7F5',
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F0F1EF',
        },
        ink: {
          DEFAULT: '#171918',
          secondary: '#626864',
          tertiary: '#858B87',
        },
        border: {
          subtle: '#E3E6E2',
        },
        accent: {
          DEFAULT: '#245B4A',
          hover: '#194638',
          soft: '#E8F0EC',
        },
        state: {
          success: '#26734D',
          warning: '#A96819',
          danger: '#B33A35',
          focus: '#2867C7',
        },
      },
      borderRadius: {
        control: '8px',
        card: '16px',
        feature: '24px',
      },
      maxWidth: {
        content: '1200px',
        reading: '740px',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
}
