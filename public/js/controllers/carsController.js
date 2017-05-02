/*globals $ */
import { getCars as getCars } from 'data';
import { getMyCars as getMyCars } from 'data';
import { postCar as postCar } from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'search';

export function getAllCars(context) {
	Promise.all([getCars('cars'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};

			console.log(allCars.cars);

			context.$element().html(template(allCars));
			let allTags = [];
			for(let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
				allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
				allTags.push(carsDatabaseAJAXResponse[i].model);
			}
			autocomplete(allTags);

			let searchButton = $('#search-button');
			searchButton.on('click', function () {
				let inputText = $('#search').val();
				let findedAds = search(carsDatabaseAJAXResponse, inputText);
				let findedCars = {
					cars: findedAds,
				};
				context.$element().html(template(findedCars));
			});	
		});
}

export function getTrucks(context) {
	Promise.all([getCars('trucks'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
			let allTags = [];
			for(let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
				allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
				allTags.push(carsDatabaseAJAXResponse[i].model);
			}
			autocomplete(allTags);

			let searchButton = $('#search-button');
			searchButton.on('click', function () {
				let inputText = $('#search').val();
				let findedAds = search(carsDatabaseAJAXResponse, inputText);
				let findedTrucks = {
					cars: findedAds,
				};
				context.$element().html(template(findedTrucks));
			});	
		});
}

export function getMotors(context) {
	Promise.all([getCars('motorcycles'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
			let allTags = [];
			for(let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
				allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
				allTags.push(carsDatabaseAJAXResponse[i].model);
			}
			autocomplete(allTags);

			let searchButton = $('#search-button');
			searchButton.on('click', function () {
				let inputText = $('#search').val();
				let findedAds = search(carsDatabaseAJAXResponse, inputText);
				let findedMotors = {
					cars: findedAds,
				};
				context.$element().html(template(findedMotors));
			});	
		});
}

export function getCaravans(context) {
	Promise.all([getCars('caravans'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
			let allTags = [];
			console.log(carsDatabaseAJAXResponse)
			for(let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
				allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
				allTags.push(carsDatabaseAJAXResponse[i].model);
			}
			autocomplete(allTags);
			let searchButton = $('#search-button');

			searchButton.on('click', function () {
				let inputText = $('#search').val();
				let findedAds = search(carsDatabaseAJAXResponse, inputText);
				let findedCaravanas = {
					cars: findedAds,
				};
				context.$element().html(template(findedCaravanas));
			});	
		});
}

export function getMyAd(context) {
	var userId = sessionStorage.id;
	Promise.all([getMyCars(userId), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
			let allTags = [];
			for(let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
				allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
				allTags.push(carsDatabaseAJAXResponse[i].model);
			}
			autocomplete(allTags);
			let searchButton = $('#search-button');

			searchButton.on('click', function () {
				let inputText = $('#search').val();
				let findedAds = search(carsDatabaseAJAXResponse, inputText);
				let findedMyAds = {
					cars: findedAds,
				};
				context.$element().html(template(findedMyAds));
			});	
		});
}



export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}