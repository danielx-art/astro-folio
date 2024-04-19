/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      fira: ["ui-monospace", "Fira Code"],
    },
    extend: {
      colors: {
        pallete1a: "#283d3b",
        pallete1aA: "#283d3b10",
        pallete1b: "#197278",
        pallete1bA: "#19727840",
        pallete1c: "#eddd49",
        pallete1d: "#c44536",
        pallete1e: "#772e25",
        pallete2a: "#ba1200",
        pallete2b: "#031927",
        pallete2c: "#9dd1f1",
        pallete2d: "#508aa8",
        pallete2e: "#c8e0f4",
        pallete3a: "#09484a",
        pallete3aA: "#09484a90",
        pallete3b: "#301026",
        pallete3c: "#04bcc2",
        pallete3d: "#c2a817",
        pallete3e: "#4f4408",
        pallete4a: "#080a1f",
        pallete4aA: "#080a1f60",
        pallete4b: "#c72e31",
        pallete4c: "#4551c4",
        pallete4cA: "#4551c440",
        pallete4d: "#c4a431",
        pallete4e: "#232e26",
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
