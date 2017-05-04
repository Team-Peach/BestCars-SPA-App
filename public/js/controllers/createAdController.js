/*globals $ */

import { load as loadTemplate } from 'templates';
import { createAd as createAd } from 'data';

export function createAdController(context) {
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());

			$('#typeNewAd label.btn-lg').click(function () {
				let $this = $(this);
				let currentTypeSelected = $this.find('input').attr('value');
				let adContainerForDifferentTypes = $('#newAdContainer');

				if (currentTypeSelected === 'cars') {
					loadTemplate('createAdCar')
						.then(templateCars => {
							adContainerForDifferentTypes.html(templateCars());
						});
				}
				else if (currentTypeSelected === 'motorcycles') {
					loadTemplate('createAdMotorcycle')
						.then(templateMotorcycles => {
							adContainerForDifferentTypes.html(templateMotorcycles());
						});
				}
				else if (currentTypeSelected === 'trucks') {
					loadTemplate('createAdTruck')
						.then(templateTrucks => {
							adContainerForDifferentTypes.html(templateTrucks());
						});
				}
				else if (currentTypeSelected === 'campers') {
					loadTemplate('createAdCamper')
						.then(templateCampers => {
							adContainerForDifferentTypes.html(templateCampers());
						});
				}
			});


			$('#form-createAd').submit(function () {
				let arrayOfFormObjValues = $('#form-createAd').serializeArray();

				let valuesFromForm = {};
				$.each(arrayOfFormObjValues, function (i, field) {
					valuesFromForm[field.name] = field.value;
				});

				if($('#imgContainer').find('img').length > 0) {
					valuesFromForm.images = [];
					let imagesFromForm = $('#imgContainer').find('img').each((i, img) => {
						let $img = $(img);
						valuesFromForm.images.push($img.attr('src'));
					});

				}

				let typeOfVehicleAd = valuesFromForm.typeOfVehicle;
				let authtoken = sessionStorage.getItem('authtoken');

				createAd(valuesFromForm, authtoken, typeOfVehicleAd);
				context.redirect('#/myAd');
			});
		});
}