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
		'vehicle': 'js/oop/vehicles/vehicle.js',
		'car': 'js/oop/vehicles/car.js',
		'motorcycle': 'js/oop/vehicles/motorcycle.js',
		'truck': 'js/oop/vehicles/truck.js',
		'camper': 'js/oop/vehicles/camper.js',
		'advertisement': 'js/oop/advertisement.js',
		'comment': 'js/oop/comment.js',
		'user': 'js/oop/user.js',
		'factory': 'js/utils/factory.js',

		'app': 'js/app.js',
		'logout' : 'js/utils/logout.js',
		'loadNavigationButtons': 'js/utils/loadNavigationButtons.js',
		'comments': 'js/utils/comments.js',
		
		'adsSearch': 'js/utils/adsSearch.js',
		'adsFilter': 'js/utils/adsFilter.js',
		'requester' : 'js/requester.js',
		'data' : 'js/data.js',
		'templates': 'js/templates.js',
		'constants': 'js/utils/constants.js',
		'homeController': 'js/controllers/homeController.js',
		'vehiclesController': 'js/controllers/vehiclesController.js',
		'usersController': 'js/controllers/usersController.js',
		'createAdController': 'js/controllers/createAdController.js',
		'aboutUsController': 'js/controllers/aboutUsController.js',
		'contactUsController': 'js/controllers/contactUsController.js',
		'profileController': 'js/controllers/profileController.js',
		'myAdsController': 'js/controllers/myAdsController.js',
		'userData': 'js/data/userData.js',
		
	}
});

System.import('app');