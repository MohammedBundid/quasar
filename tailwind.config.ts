import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'text': {
          50: '#edf4f8',
          100: '#dbe9f0',
          200: '#b6d3e2',
          300: '#92bdd3',
          400: '#6da8c5',
          500: '#4992b6',
          600: '#3a7592',
          700: '#2c576d',
          800: '#1d3a49',
          900: '#0f1d24',
          950: '#070f12',
        },
        'background': {
          50: '#ecf4f8',
          100: '#d9e9f2',
          200: '#b3d3e5',
          300: '#8dbed8',
          400: '#67a8cb',
          500: '#4192be',
          600: '#347598',
          700: '#275872',
          800: '#1a3a4c',
          900: '#0d1d26',
          950: '#070f13',
        },
        'primary': {
          50: '#ebf4f9',
          100: '#d8eaf3',
          200: '#b1d4e7',
          300: '#8abfdb',
          400: '#63a9cf',
          500: '#3c94c3',
          600: '#30769c',
          700: '#245975',
          800: '#183b4e',
          900: '#0c1e27',
          950: '#060f14',
        },
        'secondary': {
          50: '#ebf4fa',
          100: '#d7eaf4',
          200: '#aed5ea',
          300: '#86c0df',
          400: '#5eabd4',
          500: '#3696c9',
          600: '#2b78a1',
          700: '#205a79',
          800: '#153c51',
          900: '#0b1e28',
          950: '#050f14',
        },
        'accent': {
          50: '#eaf5fa',
          100: '#d5eaf6',
          200: '#abd6ed',
          300: '#82c1e3',
          400: '#58adda',
          500: '#2e98d1',
          600: '#257aa7',
          700: '#1c5b7d',
          800: '#123d54',
          900: '#091e2a',
          950: '#050f15',
        },
       },
       fontFamily: {
        sans: ["var(--font-montserrat)", "sans-serif"],
        mono: ["var(--font-lato)", "monospace"],
      },
       
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-scrollbar-hide')
  ],
};
export default config;
