/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      fira: ["Fira Code", "ui-monospace", "monospace"],
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        neutral: "rgb(var(--neutral) / <alpha-value>)",
      },
      keyframes: {
        zinzout: {
          "0%, 100%": { transform: "scale(1)" },
          "90%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        zinzout: "zinzout 3s ease-in",
      },
      backgroundImage: {
        texture: "url('https://i.ibb.co/FhfBXMD/static.jpg')",
      },
    },
  },
  plugins: [],
};
