/*globals $, Sammy*/
import 'addEventOnButtonsForChangeTheRoute';
import { homeController } from 'homeController';
import * as carsController from 'carsController';
import * as usersController from 'usersController';
import {createAdController} from 'createAdController';

(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('#/', homeController);

		this.get('#/home', homeController);

		this.post('#/home', homeController);

		this.get('#/cars', carsController.get);

		this.post('#/cars', carsController.post);

		this.get('#/motors', function () {
			$('#route').html('TODO motors');
		});

		this.get('#/caravans', function () {
			$('#route').html('TODO caravans');
		});


		this.get('#/trucks', function () {
			$('#route').html('TODO trucks');
		});

		this.get('#/about', function (context) {
			usersController.loadAboutUs(context)
		});

		this.get('#/contacts', function (context) {
			usersController.loadContactUsForm(context)
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
	});

	$(function () {
		sammyApp.run('#/');
	});
})();