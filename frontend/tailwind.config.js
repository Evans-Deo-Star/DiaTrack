/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // This array tells Tailwind to scan all your React component files (.js, .jsx, .ts, .tsx)
    "./src/**/*.{js,jsx,ts,tsx}",
    // This is important to ensure the main HTML file is also scanned
    "./public/index.html", 
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}