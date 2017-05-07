/*globals $, toastr, moment*/

import { load as loadTemplate } from 'templates';
import * as data from 'data';
import * as adsSearch from 'adsSearch';
import * as factory from 'factory';

export function createAdController(context) {
	$('#viewSearch').hide();
	loadTemplate('createAd')
		.then(template => {
			context.$element().html(template());
			let currentVehicleTypeSelectedString;

			let adContainerForDifferentTypes = $('#newAdContainer');
			$('#typeNewAd label.btn-lg').click(function () {
				let $this = $(this);
				currentVehicleTypeSelectedString = $this.find('input').attr('value');
				let currentVehicleTypeTemplate;

				if (currentVehicleTypeSelectedString === 'cars') {
					currentVehicleTypeTemplate = 'createAdCar';
				}
				else if (currentVehicleTypeSelectedString === 'motorcycles') {
					currentVehicleTypeTemplate = 'createAdMotorcycle';
				}
				else if (currentVehicleTypeSelectedString === 'trucks') {
					currentVehicleTypeTemplate = 'createAdTruck';
				}
				else if (currentVehicleTypeSelectedString === 'campers') {
					currentVehicleTypeTemplate = 'createAdCamper';
				}

				loadTemplate(currentVehicleTypeTemplate)
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

				valuesFromForm.images = [];
				if ($('#imgContainer').find('img').length > 0) {
					let imagesFromForm = $('#imgContainer').find('img').each((i, img) => {
						let $img = $(img);
						valuesFromForm.images.push($img.attr('src'));
					});
				}

				if (!currentVehicleTypeSelectedString) {
					toastr.error("Please select vehicle type!");
					return;
				}

				let ad = createAdFromFormFieldsValues(valuesFromForm, currentVehicleTypeSelectedString);
				let typeOfAdForDatabaseCollection = valuesFromForm.typeOfVehicle;
				let authtoken = sessionStorage.getItem('authtoken');

				data.createAd(ad, authtoken, typeOfAdForDatabaseCollection)
					.then(response => {
						context.redirect('#/myAds');
					},
					error => {
						context.redirect('#/profile');
						toastr.error("Cannot save advertisement! Please fill the fields correctly.");
					});
			});
		});
}

function createAdFromFormFieldsValues(valuesFromForm, currentVehicleTypeSelectedString) {
	let currentVehicle;
	if (currentVehicleTypeSelectedString === 'cars') {
		// manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfDoors, numberOfSeats
		currentVehicle = factory.createCar(valuesFromForm.manufacturer, valuesFromForm.model, valuesFromForm.year, valuesFromForm.kilometers, valuesFromForm.price, valuesFromForm.fuel, valuesFromForm.transmission, valuesFromForm.horsepower, valuesFromForm.type, valuesFromForm.numberOfDoors, valuesFromForm.numberOfSeats);
	}
	else if (currentVehicleTypeSelectedString === 'motorcycles') {
		// manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type
		currentVehicle = factory.createMotorcycle(valuesFromForm.manufacturer, valuesFromForm.model, valuesFromForm.year, valuesFromForm.kilometers, valuesFromForm.price, valuesFromForm.fuel, valuesFromForm.transmission, valuesFromForm.horsepower, valuesFromForm.type);
	}
	else if (currentVehicleTypeSelectedString === 'trucks') {
		// manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, maxLoadCapacity, numberOfWheels
		currentVehicle = factory.createTruck(valuesFromForm.manufacturer, valuesFromForm.model, valuesFromForm.year, valuesFromForm.kilometers, valuesFromForm.price, valuesFromForm.fuel, valuesFromForm.transmission, valuesFromForm.horsepower, valuesFromForm.type, valuesFromForm.maxLoadCapacity, valuesFromForm.numberOfWheels);
	}
	else if (currentVehicleTypeSelectedString === 'campers') {
		// manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfSleepingPlaces
		currentVehicle = factory.createCamper(valuesFromForm.manufacturer, valuesFromForm.model, valuesFromForm.year, valuesFromForm.kilometers, valuesFromForm.price, valuesFromForm.fuel, valuesFromForm.transmission, valuesFromForm.horsepower, valuesFromForm.type, valuesFromForm.numberOfSleepingPlaces);
	}
	
	let nowDate = moment().format('MMM Do YYYY, hh:mm');
	// title, vehicle, date, images, description, town, nameForContacts, eMail , gsm
	let ad = factory.createAdvertisement(valuesFromForm.typeOfVehicle, valuesFromForm.title, currentVehicle, nowDate, valuesFromForm.images, valuesFromForm.description, valuesFromForm.town, valuesFromForm.nameForContacts, valuesFromForm.eMail, valuesFromForm.gsm);

	return ad;
}