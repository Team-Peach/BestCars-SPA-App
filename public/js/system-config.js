/* globals System */

System.config({
	transpiler: 'plugin-babel',
	map: {
		'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
		'text': 'libs/systemjs-plugin-text/text.js',

		// library
		// 'jquery': 'libs/jquery/dist/jquery.min.js',
		// 'bootstrap': './../node_modules/bootstrap/dist/js/bootstrap.min.js',
		// 'Sammy': 'libs/sammy/lib/sammy.js'

		// app scripts
		'app': 'js/app.js',
	}
});

System.import('app');