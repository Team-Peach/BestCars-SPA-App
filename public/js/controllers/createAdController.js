/*globals $ */

import { load as loadTemplate } from 'templates';
import { createAd as createAd } from 'data';
import * as adsSearch from 'adsSearch';

export function createAdController(context) {
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());

			let adContainerForDifferentTypes = $('#newAdContainer');

			$('#typeNewAd label.btn-lg').click(function () {
				let $this = $(this);
				let currentTypeSelectedString = $this.find('input').attr('value');
				let currentTypeSelected = '';

				if (currentTypeSelectedString === 'cars') {
					currentTypeSelected = 'createAdCar';
				}
				else if (currentTypeSelectedString === 'motorcycles') {
					currentTypeSelected = 'createAdMotorcycle';
				}
				else if (currentTypeSelectedString === 'trucks') {
					currentTypeSelected = 'createAdTruck';
				}
				else if (currentTypeSelectedString === 'campers') {
					currentTypeSelected = 'createAdCamper';
				}

				loadTemplate(currentTypeSelected)
					.then(templateCars => {
						adContainerForDifferentTypes.html(templateCars());
					});
			});

			$('#form-createAd').submit(function () {
				let arrayOfFormObjValues = $('#form-createAd').serializeArray();

				let valuesFromForm = {};
				$.each(arrayOfFormObjValues, function (i, field) {
					valuesFromForm[field.name] = field.value;
				});

				if ($('#imgContainer').find('img').length > 0) {
					valuesFromForm.images = [];
					let imagesFromForm = $('#imgContainer').find('img').each((i, img) => {
						let $img = $(img);
						valuesFromForm.images.push($img.attr('src'));
					});
				}

				let typeOfVehicleAd = valuesFromForm.typeOfVehicle;
				let authtoken = sessionStorage.getItem('authtoken');

				createAd(valuesFromForm, authtoken, typeOfVehicleAd)
					.then(response => {
						context.redirect('#/myAd');
					},
					error => {
					});
			});
		});
}
