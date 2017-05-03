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

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.price) - parseInt(a.price);
				});


				context.$element().html(template(HighCars));

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

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.price) - parseInt(a.price);
				});


				context.$element().html(template(HighCars));

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

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.price) - parseInt(a.price);
				});


				context.$element().html(template(HighCars));

			});
		});
}

export function getCaravans(context) {
	Promise.all([getCars('campers'), loadTemplate('cars')])
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

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.price) - parseInt(a.price);
				});


				context.$element().html(template(HighCars));

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

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.price) - parseInt(a.price);
				});


				context.$element().html(template(HighCars));

			});
		});
}



export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}