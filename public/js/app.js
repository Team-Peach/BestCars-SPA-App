/*globals $, Sammy*/

(function () {
	var sammyApp = Sammy('#app-container', function () {

		this.get('/#/', function () {
			$('#route').html('TODO home');
		});

		this.get('#/cars', function () {
			$('#route').html('TODO cars');
		});

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

		this.get('#/register', function () {
			$('#route').html('TODO register');
		});

		this.get('#/login', function () {
			$('#route').html('TODO login');
		});

		this.get('#/logout', function () {
			$('#route').html('TODO logout');
		});
	});

	$(function () {
		sammyApp.run('#/home');
	});
})();