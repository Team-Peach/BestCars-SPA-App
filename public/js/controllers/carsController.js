/*globals $ */
import { getCars as getCars } from 'data';
import { postCar as postCar } from 'data';
import { load as loadTemplate } from 'templates';

export function get(context) {
	Promise.all([getCars(), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {
			console.log(carsDatabaseAJAXResponse);

			context.$element().html(template());
		});
}


export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}