/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#1B4332',
          dark: '#122C21',
          light: '#2D6A4F',
        },
        agri: {
          DEFAULT: '#2D6A4F',
          dark: '#1B4332',
          light: '#40916C',
        },
        soil: {
          DEFAULT: '#8B5E34',
          light: '#C4A574',
        },
        lime: {
          accent: '#A3B18A',
          light: '#DAD7CD',
          soft: '#F0EDE4',
        },
        cream: {
          DEFAULT: '#F7F3EA',
        },
        ivory: {
          DEFAULT: '#F4F1EA',
          subtle: '#EAE6DC',
        },
        charcoal: {
          DEFAULT: '#1C1917',
          light: '#44403C',
        },
        slate: {
          muted: '#57534E',
          border: '#DDD6C9',
        },
        amber: {
          warn: '#B45309',
        },
        danger: {
          DEFAULT: '#B42318',
        }
      },
      fontFamily: {
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
        display: ['Newsreader', 'Georgia', 'serif'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 25, 23, 0.06)',
      }
    },
  },
  plugins: [],
}
