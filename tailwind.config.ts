import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
          'lightblack':'#0F0F0F',
          'graywhite':'#EEEEEE',
          'lightorange':'#F5AC62',
          'black':'#000000',
          'white':'#ffffff'
      },
      fontFamily:{
        'inter':["Inter", "sans-serif"]
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};
export default config;
