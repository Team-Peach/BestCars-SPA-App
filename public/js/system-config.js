/* globals System */

System.config({
	transpiler: 'plugin-babel',
	map: {
		'plugin-babel': 'libs/systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': 'libs/systemjs-plugin-babel/systemjs-babel-browser.js',
		'text': 'libs/systemjs-plugin-text/text.js',

		// library
		// 'jquery': 'libs/jquery/dist/jquery.min.js',
		// 'bootstrap': 'libs/bootstrap/dist/js/bootstrap.min.js',
		// 'sammy': 'libs/sammy/lib/sammy.js'
		// 'toastr': 'libs/toastr/build/toastr.min.js',
		// 'handlebars': 'libs/handlebars/dist/handlebars.min.js',

		// app scripts
		'app': 'js/app.js',
		'addEventOnButtonsForChangeTheRoute' : 'js/utils/addEventOnButtonsForChangeTheRoute.js',
		'requester' : 'js/requester.js',
		'data' : 'js/data.js',
		'templates': 'js/templates.js',
		'homeController': 'js/controllers/homeController.js',
		'carsController': 'js/controllers/carsController.js',
	}
});

System.import('app');