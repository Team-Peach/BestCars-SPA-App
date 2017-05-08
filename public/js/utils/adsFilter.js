/* globals $ */

export function attachFilterAds(carsDatabaseAJAXResponse, context, template) {

	/* filter by price */
	$('#sortByPrice-Low').click(function (event) {
		// event.preventDefault();
		let LowCars = {
			cars: carsDatabaseAJAXResponse
		};
		LowCars.cars.sort(function (a, b) {
			return parseInt(a._vehicle._price) - parseInt(b._vehicle._price);
		});
		context.$element().html(template(LowCars));
	});

	$('#sortByPrice-High').click(function (event) {
		// event.preventDefault();
		let HighCars = {
			cars: carsDatabaseAJAXResponse
		};
		HighCars.cars.sort(function (a, b) {
			return parseInt(b._vehicle._price) - parseInt(a._vehicle._price);
		});
		context.$element().html(template(HighCars));
	});

	/* filter by year */
	$('#sortByYear-Low').click(function (event) {
		// event.preventDefault();
		let LowCars = {
			cars: carsDatabaseAJAXResponse
		};
		LowCars.cars.sort(function (a, b) {
			return parseInt(a._vehicle._year) - parseInt(b._vehicle._year);
		});
		context.$element().html(template(LowCars));
	});

	$('#sortByYear-High').click(function (event) {
		// event.preventDefault();
		let HighCars = {
			cars: carsDatabaseAJAXResponse
		};
		HighCars.cars.sort(function (a, b) {
			return parseInt(b._vehicle._year) - parseInt(a._vehicle._year);
		});
		context.$element().html(template(HighCars));
	});

	$('#sortByDate-Old').click(function (event) {
		// event.preventDefault();
		let LowCars = {
			cars: carsDatabaseAJAXResponse
		};
		LowCars.cars.sort(function (a, b) {
			return new Date(a._date) - new Date(b._date);
		});
		context.$element().html(template(LowCars));
	});

	$('#sortByDate-New').click(function (event) {
		// event.preventDefault();
		let HighCars = {
			cars: carsDatabaseAJAXResponse
		};
		HighCars.cars.sort(function (a, b) {
			return new Date(b._date) - new Date(a._date);
		});
		context.$element().html(template(HighCars));
	});
}