/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      scale: {
        '102': '1.02',
        '105': '1.05',
      },
      blur: {
        '3xl': '64px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse': 'pulse 4s ease-in-out infinite',
        'rainbow-border': 'rainbow-border 3s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'particle-float': 'particle-float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.3' },
        },
        'rainbow-border': {
          '0%, 100%': {
            'border-color': '#60a5fa',
            'box-shadow': '0 0 20px rgba(96, 165, 250, 0.3)',
          },
          '50%': {
            'border-color': '#7d34db',
            'box-shadow': '0 0 20px rgba(125, 52, 219, 0.3)',
          },
        },
        'particle-float': {
          '0%, 100%': { 
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: '0.3',
          },
          '50%': { 
            transform: 'translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(180deg)',
            opacity: '0.6',
          },
        },
      },
      colors: {
        'glass': 'rgba(255, 255, 255, 0.03)',
        'glass-hover': 'rgba(255, 255, 255, 0.05)',
        'glass-active': 'rgba(255, 255, 255, 0.07)',
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      translate: {
        'z-8': '8px',
      },
    },
  },
  plugins: [],
} 