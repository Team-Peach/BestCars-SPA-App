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
		'vehicle': 'js/opp/vehicles/vehicle.js',
		'car': 'js/opp/vehicles/car.js',
		'motorcycle': 'js/opp/vehicles/motorcycle.js',
		'truck': 'js/opp/vehicles/truck.js',
		'camper': 'js/opp/vehicles/camper.js',
		'advertisement': 'js/opp/advertisement.js',
		'comment': 'js/opp/comment.js',
		'user': 'js/oop/user.js',

		'app': 'js/app.js',
		'addEventOnButtonsForChangeTheRoute' : 'js/utils/addEventOnButtonsForChangeTheRoute.js',
		'loadNavigationButtons': 'js/utils/loadNavigationButtons.js',
		'requester' : 'js/requester.js',
		'data' : 'js/data.js',
		'templates': 'js/templates.js',
		'constants': 'js/utils/constants.js',
		'homeController': 'js/controllers/homeController.js',
		'carsController': 'js/controllers/carsController.js',
		'usersController': 'js/controllers/usersController.js',
		'createAdController': 'js/controllers/createAdController.js',
		'userData': 'js/data/userData.js',
	}
});

System.import('app');