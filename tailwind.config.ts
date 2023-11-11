import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundColor: {
        'custom-black': '#202020',
        'custom-gray': '#333533',
        'custom-yellow': '#FFD100',
        'custom-white': '#D6D6D6',
      },
      textColor: {
        'custom-black': '#202020',
        'custom-gray': '#333533',
        'custom-yellow': '#FFD100',
        'custom-white': '#D6D6D6',
      },
    },
  },
  plugins: [],
};
export default config;
