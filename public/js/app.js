/*globals $, Sammy*/
import 'addEventOnButtonsForChangeTheRoute';
import {homeController} from 'homeController';
import {carsController} from 'carsController';
import * as usersController from 'usersController';

(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('#/', homeController);

		this.get('#/home', homeController);
		
		this.post('#/home', homeController);

		this.get('#/cars', carsController);

		this.get('#/motors', function () {
			$('#route').html('TODO motors');
		});

		this.get('#/caravans', function () {
			$('#route').html('TODO caravans');
		});

		this.get('#/trucks', function () {
			$('#route').html('TODO trucks');
		});

		this.get('#/about', function () {
			$('#route').html('TODO about');
		});

		this.get('#/contacts', function () {
			$('#route').html('TODO contacts');
		});

		this.get('#/register', function (context) {
			usersController.loadRegistrationForm(context);
		});

		this.get('#/login', function (context) {
			usersController.loadLoginForm(context);
		});

		this.get('#/logout', function (context) {
			//$('#route').html('TODO logout');
			usersController.logout(context);
		});
	});

	$(function () {
		sammyApp.run('#/');
	});
})();