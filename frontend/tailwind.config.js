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
          DEFAULT: '#174C35',
          dark: '#103626',
          light: '#236e4f',
        },
        agri: {
          DEFAULT: '#2F855A',
          dark: '#22543D',
          light: '#38A169',
        },
        lime: {
          accent: '#A3D977',
          light: '#D9F2BF',
          soft: '#F0F9E8',
        },
        ivory: {
          DEFAULT: '#F7F8F2',
          subtle: '#EEF0E5',
        },
        charcoal: {
          DEFAULT: '#1F2933',
          light: '#323F4B',
        },
        slate: {
          muted: '#667085',
          border: '#E4E7EC',
        },
        amber: {
          warn: '#E9A23B',
        },
        danger: {
          DEFAULT: '#DC5555',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
