/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          from: '#1e3a8a', // Azul escuro profundo
          to: '#3b82f6',   // Azul médio
        },
        experience: {
          from: '#0c4a6e', // Azul petróleo escuro
          to: '#0ea5e9',   // Azul céu
        },
        ai: {
          from: '#1e40af', // Azul royal escuro
          to: '#60a5fa',   // Azul claro
        },
        opensource: {
          from: '#075985', // Azul aço escuro
          to: '#38bdf8',   // Azul cyan claro
        },
        contact: {
          from: '#1e293b', // Azul ardósia escuro
          to: '#475569',   // Azul ardósia médio
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
