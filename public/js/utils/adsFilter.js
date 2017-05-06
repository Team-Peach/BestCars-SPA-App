export function attachFilterAds(carsDatabaseAJAXResponse, context, template) {
	/* filter by price */

	$('#sortByPrice-Low').click(function (event) {
		// event.preventDefault();
		let LowCars = {
			cars: carsDatabaseAJAXResponse
		};
		LowCars.cars.sort(function (a, b) {
			return parseInt(a.price) - parseInt(b.price);
		});
		context.$element().html(template(LowCars));
	});

	$('#sortByPrice-High').click(function (event) {
		// event.preventDefault();
		let HighCars = {
			cars: carsDatabaseAJAXResponse
		};
		HighCars.cars.sort(function (a, b) {
			return parseInt(b.price) - parseInt(a.price);
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
			return parseInt(a.year) - parseInt(b.year);
		});
		context.$element().html(template(LowCars));
	});

	$('#sortByYear-High').click(function (event) {
		// event.preventDefault();
		let HighCars = {
			cars: carsDatabaseAJAXResponse
		};
		HighCars.cars.sort(function (a, b) {
			return parseInt(b.year) - parseInt(a.year);
		});
		context.$element().html(template(HighCars));
	});
}