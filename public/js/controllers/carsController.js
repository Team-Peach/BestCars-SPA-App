/*globals $ */
import { getCars as getCars } from 'data';
import { postCar as postCar } from 'data';
import { load as loadTemplate } from 'templates';

export function get(context) {
	Promise.all([getCars('Комби'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			console.log(allCars);
			context.$element().html(template(allCars));
		});
}


export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}