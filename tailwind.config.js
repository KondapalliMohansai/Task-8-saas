/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        primary: '#605BFF',
        ink: '#05004E',
        body: '#4B4A68',
        muted: '#9291A5',
        page: '#FAFAFA',
        field: '#F7F7F8',
        line: '#ECECF3',
        brand: {
          blue: '#5B93FF',
          yellow: '#FFD66B',
          orange: '#FF8F6B',
          cyan: '#26C0E2',
          green: '#3CA058',
          red: '#E5192D',
        },
      },
      boxShadow: {
        card: '0 2px 14px rgba(20, 20, 60, 0.04)',
        pop: '0 8px 30px rgba(20, 20, 60, 0.12)',
      },
    },
  },
  plugins: [],
};
