/*globals $, Sammy*/
import 'addEventOnButtonsForChangeTheRoute';
import 'loadNavigationButtons';
import { homeController } from 'homeController';
import * as carsController from 'carsController';
import * as usersController from 'usersController';
import { createAdController } from 'createAdController';

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

		this.post('#/cars', carsController.post);

		this.post('#/createAd', createAdController);

		this.post('#/createAd', createAdController);


		this.get('#/cars', function (context) {
			$('#viewSearch').show();
			carsController.getAllCars(context);
		});

		this.get('#/motors', function (context) {
			$('#viewSearch').show();
			carsController.getMotors(context);
		});

		this.get('#/trucks', function (context) {
			$('#viewSearch').show();
			carsController.getTrucks(context);
		});

		this.get('#/caravans', function (context) {
			$('#viewSearch').show();
			carsController.getCaravans(context);
		});

		this.get('#/myAd', function (context) {
			$('#viewSearch').show();
			carsController.getMyAd(context);
		});

		this.get('#/about', function (context) {
			usersController.loadAboutUs(context);
			$('#viewSearch').hide();
		});

		this.get('#/contacts', function (context) {
			usersController.loadContactUsForm(context);
			$('#viewSearch').hide();
		});

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
		}); /*/?:username */

		this.get('#/createAd', function (context) {
			$('#viewSearch').hide();
			createAdController(context);
		});

		/*	
		// Make Sammy.js leave the forms alone!
		this._checkFormSubmission = function(form) {
			return false;
		};
		*/
	});

	$(function () {
		sammyApp.run('#/');
	});
})();