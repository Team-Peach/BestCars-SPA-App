/*globals $ */

import { load as loadTemplate } from 'templates';
import { createAd as createAd } from 'data';

export function createAdController(context) {
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());
			let $loginForm = $('#createAd-form');
			$loginForm.on('submit', function () {
				let aaa = $('#createAd-town option:selected').text();
				let bbb = $('#createAd-town1 option:selected').text();
				let aaaa = $('#createAd-town2 option:selected').text();
				let ddd = $('#createAd-town3 option:selected').text();

				let params = {};

				// TODO get all drop down
				if (params.hasOwnProperty()) {

				}

				let type = 'cars';

				params = {
					aaa,
					bbb,
					aaaa,
					ddd
				};

				let authtoken = sessionStorage.getItem('authtoken');

				createAd(params, authtoken, type);
			});
		});
}


