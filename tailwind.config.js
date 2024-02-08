import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...require('tailwindcss/colors'),
      'blue-100': '#1e1d85',
      'gray-900': 'rgba(0,0,0,0.35)',
      'indigo-750':'#6d6cb0',
      'white-100' : 'rgba(255, 255, 255, 0.4)',
      'white-50' : 'rgba(255, 255, 255, 0.85)'
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'prompt': ['Prompt', 'sans-serif'],
      'Kantumruy': ['Kantumruy', 'sans-serif'],
      'roboto-mono': ['Roboto Mono', 'monospace'],
    
    },
    fontWeight: {
      'prompt-light': 50,
      'prompt-xlight': 200,
      'prompt-normal': 550,
      'prompt-semibold': 800,
    },
    extend: {
      spacing: {
        '128': '85vh',
        '120': '65vw',
      },
    },
  },
  
  plugins: [],
});
