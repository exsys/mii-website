import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "creator-background": "linear-gradient(to bottom, #CCFFFF, #FEFFFF)",
      },
      colors: {
        "wii-blue": "#5DB0CF",
      },
    },
  },
  plugins: [],
};
export default config;
