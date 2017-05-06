/* globals $*/
export function getAllTags(allTags, carsDatabaseAJAXResponse) {
	for (let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
		allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
		allTags.push(carsDatabaseAJAXResponse[i].model);
	}
}

export function searchInAds(input, carsDatabaseAJAXResponse, context, template) {

	let inputText = input.val();
	let findedAds = search(carsDatabaseAJAXResponse, inputText);
	let findedCars = {
		cars: findedAds,
	};
	context.$element().html(template(findedCars));
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
      "manufacturer",
      "model"
    ]
  };
  let fuse = new Fuse(allVehicles, options);
  let findedVehicles = fuse.search(text);
  return findedVehicles;
}