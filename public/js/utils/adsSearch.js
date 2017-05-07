/* globals $, Fuse */

export function getAllTags(allTags, carsDatabaseAJAXResponse) {
	for (let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
		allTags.push(carsDatabaseAJAXResponse[i]._vehicle._manufacturer);
		allTags.push(carsDatabaseAJAXResponse[i]._vehicle._model);
	}
}

export function searchInAds(input, carsDatabaseAJAXResponse, context, template) {

	let inputText = input.val();
	let findAds = search(carsDatabaseAJAXResponse, inputText);
	let findCars = {
		cars: findAds,
	};

	context.$element().html(template(findCars));
}

export function autocomplete(availableTags) {
    let searchInput = $( "#search" );
    searchInput.autocomplete({
      source: availableTags
    });
}

export function search(allVehicles, text) {
  let options = {
    caseSensitive: false,
    shouldSort: true,
    tokenize: true,
    findAllMatches: true,
    threshold: 0,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      "_vehicle._manufacturer",
      "_vehicle._model"
    ]
  };
  let fuse = new Fuse(allVehicles, options);
  let findVehicles = fuse.search(text);
  return findVehicles;
}