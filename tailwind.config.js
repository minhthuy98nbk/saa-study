/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#185FA5',
          green: '#1D9E75',
          red: '#E24B4A',
          amber: '#BA7517',
          purple: '#534AB7',
        },
        light: {
          blue: '#E6F1FB',
          green: '#EAF3DE',
          'green-done': '#F0FAF5',
          'green-done-hover': '#E4F5ED',
          'green-done-num': '#C6EDDB',
          red: '#FCEBEB',
          amber: '#FAEEDA',
          purple: '#EEEDFE',
        },
        'done-num-text': '#0F6E56',
        page: '#F8F8F6',
        card: '#FFFFFF',
        secondary: '#F1EFE8',
        border: '#E5E3DC',
        text: {
          DEFAULT: '#1A1A18',
          muted: '#5C5B55',
          faint: '#8C8B82',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        lg: '12px',
      },
    },
  },
  plugins: [],
}
