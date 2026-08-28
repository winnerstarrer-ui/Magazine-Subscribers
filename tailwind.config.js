/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#1C2B3A',
          700: '#35506B',
          500: '#4C6885',
        },
        paper: {
          DEFAULT: '#F0EEE4',
          card: '#FBFAF5',
        },
        brass: {
          DEFAULT: '#A8842F',
          light: '#C7A44A',
          dark: '#8A6B22',
        },
        oxblood: {
          DEFAULT: '#7A2E2E',
          light: '#9A4646',
        },
        forest: {
          DEFAULT: '#3F6B4A',
          light: '#5C8C68',
        },
        line: '#D8D3C4',
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        'paper-texture':
          "radial-gradient(circle at 1px 1px, rgba(28,43,58,0.035) 1px, transparent 0)",
      },
      backgroundSize: {
        'paper-grid': '18px 18px',
      },
    },
  },
  plugins: [],
}
