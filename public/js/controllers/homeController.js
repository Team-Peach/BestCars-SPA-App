/*globals $, moment */
import { getCars as getCars } from 'data';
import {adForHome as adForHome} from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'adsSearch';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants';
import * as comments from 'comments';
import * as adsSearch from 'adsSearch';

export function homeController(context) {
	$('#viewSearch').hide();

	let vehicleType = ['cars', 'motorcycles', 'trucks', 'campers'];
	Promise.all([adForHome(vehicleType[0]), adForHome(vehicleType[1]), adForHome(vehicleType[2]), adForHome(vehicleType[3]),loadTemplate('home'), loadTemplate('comment')])
		.then(([cars, motorcycles, trucks, campers, template]) => {
			let allCars = {
				cars: cars,
				motorcycles: motorcycles,
				trucks: trucks,
				campers: campers
			};
			console.log(allCars);

			context.$element().html(template(allCars));

		});
}