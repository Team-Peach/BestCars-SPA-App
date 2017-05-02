/*globals $, Sammy*/
import 'addEventOnButtonsForChangeTheRoute';
import 'loadNavigationButtons';
import { homeController } from 'homeController';
import * as carsController from 'carsController';
import * as usersController from 'usersController';
import {createAdController} from 'createAdController';

(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('#/', homeController);

		this.get('#/home', homeController);

		this.post('#/home', homeController);

		this.get('#/cars', carsController.getAllCars);

		this.post('#/cars', carsController.post);

		this.post('#/createAd', createAdController);

		this.get('#/trucks', carsController.getTrucks);

		this.get('#/motors', carsController.getMotors);

		this.get('#/caravans', carsController.getCaravans);

		this.get('#/myAd', carsController.getMyAd);

		this.get('#/cars', function (context) {
			usersController.get(context)
		});

		this.get('#/trucks', function () {
			carsController.getTruck()
		});

		this.get('#/about', function (context) {
			usersController.loadAboutUs(context)

		});

		this.get('#/contacts', function (context) {
			usersController.loadContactUsForm(context);
		});

		this.get('#/register', function (context) {
			usersController.loadRegistrationForm(context);
		});

		this.get('#/login', function (context) {
			usersController.loadLoginForm(context);
		});

		this.get('#/logout', function (context) {
			usersController.logout(context);
		});

		this.get('#/profile', function (context) {
			usersController.loadUserProfileForm(context);
		}); /*/?:username */

		this.get('#/createAd', createAdController);
		
		this.post('#/createAd', createAdController);
	});

	$(function () {
		sammyApp.run('#/');
	});
})();