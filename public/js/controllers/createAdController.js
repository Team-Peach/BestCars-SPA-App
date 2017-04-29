/*globals $ */

import { load as loadTemplate } from 'templates';
import { createAd as createAd } from 'data';

export function createAdController(context) {
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());

			$('#form-createAd').submit(function () {
				let arrayOfFormObjValues = $('#form-createAd').serializeArray();

				let valuesFromForm = {};
				$.each(arrayOfFormObjValues, function (i, field) {
					valuesFromForm[field.name] = field.value;
				});

				let typeOfVehicleAd = valuesFromForm.type;

				let authtoken = sessionStorage.getItem('authtoken');

				createAd(valuesFromForm, authtoken, typeOfVehicleAd);
			});
		});
}


