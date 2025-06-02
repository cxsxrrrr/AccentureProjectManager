export default {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          accenture: "#A100FF", // o tu propia paleta si la vas a extender como Flowbite
        },
        fontFamily: {
          sans: ['Sansation', 'sans-serif'],
        },
      },
    },
    plugins: [],
  };
  