/*globals $*/
import { getCars as getCars } from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'search';

export function homeController(context) {
	Promise.all([getCars('cars'), getCars('trucks'),getCars('motorcycles'), getCars('caravans'), loadTemplate('home'), loadTemplate('cars')])
		.then(([carsResponse, trucksResponse, motorcyclesResponse, caravanasResponce, templateHome, templateCars]) => {
			context.$element().html(templateHome());
			let allAds = [].concat(carsResponse, trucksResponse, motorcyclesResponse, caravanasResponce),
			allTags = [],
			findedAds,
			searchButton = $('#search-button');
			console.log(allAds)
			for(let i = 0; i < allAds.length; i++) {
				allTags.push(allAds[i].manufacturer);
				allTags.push(allAds[i].model);
			}
			autocomplete(allTags);
			searchButton.on('click', function () {
				let inputText = $('#search').val();
				findedAds = search(allAds, inputText);
				let findedVehicles = {
					cars: findedAds,
				};
				context.$element().html(templateCars(findedVehicles));
			});			
	});
}

/*
let $appContainer = $('#app-container');
export function homeController(params) {
	//TODO delete this -  just for test 
	$('#route').html('TODO home');

	// if route has /home?pesho='gosho'
	let { routeQueryParameters } = params;

	Promise.all([getHome(), loadTemplate('home')])
		.then(([databaseAJAXResponse, handlebarsTemplate]) => {
			$appContainer.html(handlebarsTemplate(databaseAJAXResponse));
		})
		.catch((err) => console.log(err));
	
}
*/