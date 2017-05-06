/*globals $ */

import { load as loadTemplate } from 'templates';
import { createAd as createAd } from 'data';

export function createAdController(context) {
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());

			let currentTypeSelected = findSelectedTypeTemplate();
			let adContainerForDifferentTypes = $('#newAdContainer');

			loadTemplate(currentTypeSelected)
				.then(templateCars => {
					adContainerForDifferentTypes.html(templateCars());
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

				createAd(valuesFromForm, authtoken, typeOfVehicleAd);
				context.redirect('#/myAd');
			});
		});


	function findSelectedTypeTemplate() {
		$('#typeNewAd label.btn-lg').click(function () {
			let $this = $(this);
			let currentTypeSelectedString = $this.find('input').attr('value');
			let currentTypeSelected = '';

			if (currentTypeSelected === 'cars') {
				currentTypeSelected = 'createAdCar';
			}
			else if (currentTypeSelected === 'motorcycles') {
				currentTypeSelected = 'createAdMotorcycle';
			}
			else if (currentTypeSelected === 'trucks') {
				currentTypeSelected = 'createAdTruck';
			}
			else if (currentTypeSelected === 'campers') {
				currentTypeSelected = 'createAdCamper';
			}

			return currentTypeSelected;
		});
	}
}