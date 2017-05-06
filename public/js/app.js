/*globals $, Sammy*/
import 'loadNavigationButtons';
import 'factory';
import 'logout';
import { homeController } from 'homeController';
import { vehiclesController } from 'vehiclesController';
import { createAdController } from 'createAdController';
import * as usersController from 'usersController';
import { aboutUsController } from 'aboutUsController';
import { contactUsController } from 'contactUsController';
import * as profileController from 'profileController';


(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('#/', homeController);
		
		this.get('#/home', homeController);

		this.get('#/cars', vehiclesController);

		this.get('#/motorcycles', vehiclesController);

		this.get('#/trucks', vehiclesController);

		this.get('#/campers', vehiclesController);

		this.get('#/about', aboutUsController);

		this.get('#/contacts', contactUsController);

		this.get('#/createAd', createAdController);

		this.get('#/register',	usersController.loadRegistrationForm);

		this.get('#/login', usersController.loadLoginForm);

		this.get('#/profile', profileController.aaaa);	// to profileController from userController

		this.get('#/user/profile/:id', usersController.aaaa);	// to profileController from userController

		this.get('#/myAds', vehiclesController.myAds);	// to myAdsController from vehiclesController

		// Make Sammy.js leave the forms alone!
		this._checkFormSubmission = function (form) {
			return false;
		};

		//$('#app-container').jscroll();
	});

	$(function () {
		sammyApp.run('#/');
	});
})();