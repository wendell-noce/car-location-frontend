/** @type {import('tailwindcss').Config} */

export const colors = {
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
  blue: {
    100: "#0044FF",
    200: '#005C9E',
    500: "#00198C",
    900: '#0021AF'
  },  
  gray: {
    300: '#D1D5DB',
    400: '#6B6B6B',
  },
  red: {
    500: '#EF4444'
  }
}

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors,
    extend: {    
      fontFamily: {
        sans: ["Montserrat", "ui-sans-serif", "system-ui"],        
      },  
      backgroundImage: {
        carro: "url('/assets/images/bg-carro.jpg')",
      },
    },
  },
  plugins: [],
} satisfies import('tailwindcss').Config;
