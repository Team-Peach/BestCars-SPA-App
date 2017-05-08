/* globals System */

System.config({
	transpiler: 'plugin-babel',
	map: {
		'plugin-babel': '../libs/systemjs-plugin-babel/plugin-babel.js',
		'systemjs-babel-build': '../libs/systemjs-plugin-babel/systemjs-babel-browser.js',
		'text': '../libs/systemjs-plugin-text/text.js',
		
		// app scripts
		'vehicle': '../js/oop/vehicles/vehicle.js',
		'car': '../js/oop/vehicles/car.js',
		'motorcycle': '../js/oop/vehicles/motorcycle.js',
		'truck': '../js/oop/vehicles/truck.js',
		'camper': '../js/oop/vehicles/camper.js',
		'advertisement': '../js/oop/advertisement.js',
		'comment': '../js/oop/comment.js',
		'user': '../js/oop/user.js',
		'factory': '../js/utils/factory.js',

		'app': '../js/app.js',
		'logout' : '../js/utils/logout.js',
		'loadNavigationButtons': '../js/utils/loadNavigationButtons.js',
		'comments': '../js/utils/comments.js',
		'adsSearch': '../js/utils/adsSearch.js',
		'adsFilter': '../js/utils/adsFilter.js',
		'registerValidator': '../js/utils/registerValidator.js',
		'createAdValidator': '../js/utils/createAdValidator.js',
		'dismissModal': 'js/utils/dismissModal.js',
        'data' : '../js/data.js',
		'requester' : '../js/requester.js',
		'data' : '../js/data.js',
		'templates': '../js/templates.js',
		'constants': '../js/utils/constants.js',
		'homeController': '../js/controllers/homeController.js',
		'vehiclesController': '../js/controllers/vehiclesController.js',
		'usersController': '../js/controllers/usersController.js',
		'createAdController': '../js/controllers/createAdController.js',
		'aboutUsController': '../js/controllers/aboutUsController.js',
		'contactUsController': '../js/controllers/contactUsController.js',
		'profileController': '../js/controllers/profileController.js',
		'myAdsController': '../js/controllers/myAdsController.js',

        //tests
		'dataTests': 'data-tests.js',
        'userControllerTests': 'userController-tests.js'
	}
});
System.import('userControllerTests');
System.import('dataTests');
