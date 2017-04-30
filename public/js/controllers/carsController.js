/*globals $ */
import { getCars as getCars } from 'data';
import { postCar as postCar } from 'data';
import { load as loadTemplate } from 'templates';

export function get(context) {
	console.log(5);
	Promise.all([getCars(), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {
			console.log(5);
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};

			console.log(allCars); // TODO delete

			context.$element().html(template(allCars));
		});
}


export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}