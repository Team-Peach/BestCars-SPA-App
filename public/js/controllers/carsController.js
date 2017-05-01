/*globals $ */
import { getCars as getCars } from 'data';
import { getMyCars as getMyCars } from 'data';
import { postCar as postCar } from 'data';
import { load as loadTemplate } from 'templates';

export function getAllCars(context) {
	Promise.all([getCars('cars'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
		});
}

export function getTrucks(context) {
	Promise.all([getCars('trucks'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
		});
}

export function getMotors(context) {
	Promise.all([getCars('motorcycles'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
		});
}

export function getCaravans(context) {
	Promise.all([getCars('caravans'), loadTemplate('cars')])
		.then(([carsDatabaseAJAXResponse, template]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
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
		});
}



export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}