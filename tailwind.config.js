module.exports = {
	media: false, // or 'media' or 'class'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"
  ],
  theme: {
    screens: {
			xs: "300px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			xl: "1280px",
			"2xl": "1536px",
		},
    extend: {
      fontFamily: {
				Poppins: ["Poppins"],
				Montserrat: ["Montserrat"],
				Newake: ["Newake"],
			},
    },
  },
  plugins: [],
}
