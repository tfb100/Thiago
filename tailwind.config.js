/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exec: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        exec: {
          bg: '#0a0a0b',
          card: '#141416',
          border: '#27272a',
          muted: '#a1a1aa',
          accent: '#0ea5e9',
        },
        hero: {
          from: '#1e3a8a', // Azul escuro profundo
          to: '#3b82f6',   // Azul médio
        },
        experience: {
          from: '#064e3b', // Emerald 950
          to: '#134e4a',   // Teal 900
        },
        concursos: {
          from: '#0f172a', // Slate 900 (Deep Navy)
          to: '#1e40af',   // Blue 800 (Royal Blue)
        },
        ai: {
          from: '#312e81', // Indigo 900
          to: '#7c3aed',   // Violet 600
        },
        dev: {
          from: '#134e4a', // Teal 900
          to: '#0d9488',   // Teal 600
        },
        opensource: {
          from: '#7c2d12', // Orange 900
          to: '#ea580c',   // Orange 600
        },
        contact: {
          from: '#020617', // Slate 950
          to: '#0f172a',   // Slate 900
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
