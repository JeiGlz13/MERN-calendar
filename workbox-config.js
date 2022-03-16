module.exports = {
	globDirectory: 'build/',
	globPatterns: [
		'**/*.{json,png,ico,html,txt,css,js,jpg}'
	],
	swDest: 'build/sw.js',
	// ignoreURLParametersMatching: [
	// 	/^utm_/,
	// 	/^fbclid$/
	// ],
	swSrc: 'src/sw-template.js'
};