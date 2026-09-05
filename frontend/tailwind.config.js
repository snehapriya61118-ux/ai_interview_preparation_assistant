/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#070B1A',
        bgSecondary: '#0F1630',
        glassSurface: 'rgba(255, 255, 255, 0.08)',
        glassHover: 'rgba(255, 255, 255, 0.12)',
        glassBorder: 'rgba(255, 255, 255, 0.18)',
        primaryBlue: '#4F8CFF',
        primaryPurple: '#8B5CF6',
        cyanAccent: '#22D3EE',
        textMain: '#FFFFFF',
        textSecondary: '#A7B0C0',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'float-slow': 'floatSlow 12s infinite ease-in-out',
        'float-medium': 'floatMedium 9s infinite ease-in-out',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(79, 140, 255, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 35px rgba(79, 140, 255, 0.8), 0 0 65px rgba(139, 92, 246, 0.6)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(30px, -40px) scale(1.1)' },
        },
        floatMedium: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%': { transform: 'translate(-40px, 30px) scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
