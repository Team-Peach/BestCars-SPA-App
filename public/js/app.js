/*globals $, Sammy*/

import 'logout';
import 'factory';
import 'loadNavigationButtons';
import { homeController } from 'homeController';
import { vehiclesController } from 'vehiclesController';
import { createAdController } from 'createAdController';
import { aboutUsController } from 'aboutUsController';
import { contactUsController } from 'contactUsController';
import { myAdsController } from 'myAdsController';
import * as usersController from 'usersController';
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

		this.get('#/register', usersController.loadRegistrationForm);

		this.get('#/login', usersController.loadLoginForm);

		this.get('#/profile', profileController.loadUserProfileForm);
		
		this.get('#/user/profile/', profileController.loadUserProfile);
			
		this.get('#/user/profile/ads/', profileController.loadUserAds);

		this.get('#/myAds', myAdsController);

		// Make Sammy.js leave the forms alone!
		this._checkFormSubmission = function (form) {
			return false;
		};
	});

	$(function () {
		sammyApp.run('#/');
	});
})();