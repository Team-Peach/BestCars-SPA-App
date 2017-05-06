/*globals $, Sammy*/
import 'addEventOnButtonsForChangeTheRoute';
import 'loadNavigationButtons';
import 'factory';
import { homeController } from 'homeController';
import { vehiclesController } from 'vehiclesController';
import { createAdController } from 'createAdController';
import * as usersController from 'usersController';
import { aboutUsController } from 'aboutUsController';
import { contactUsController } from 'contactUsController';

(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('#/', function (context) {
			$('#viewSearch').hide();
			homeController(context);
		});

		this.get('#/home', function (context) {
			$('#viewSearch').hide();
			homeController(context);
		});

		this.get('#/cars', vehiclesController);

		this.get('#/motorcycles', vehiclesController);

		this.get('#/trucks', vehiclesController);

		this.get('#/campers', vehiclesController);

		this.get('#/about', aboutUsController);

		this.get('#/contacts', contactUsController);

		this.get('#/createAd', createAdController);

		

		this.get('#/register', function (context) {
			usersController.loadRegistrationForm(context);
			$('#viewSearch').hide();
		});

		this.get('#/login', function (context) {
			usersController.loadLoginForm(context);
			$('#viewSearch').hide();
		});

		this.get('#/logout', function (context) {
			usersController.logout(context);
			$('#viewSearch').hide();
		});

		this.get('#/profile', function (context) {
			usersController.loadUserProfileForm(context);
			$('#viewSearch').hide();
		});

		this.get('#/user/profile/:id', function (context) {
			usersController.loadUserProfile(context);
		});

		this.get('#/myAd', function (context) {
			carsController.getMyAd(context);
		});

		this.get('#/createAd', function (context) {
			$('#viewSearch').hide();
			createAdController(context);
		});

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