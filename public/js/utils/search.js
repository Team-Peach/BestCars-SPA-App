/* globals $*/
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
  console.log(findedVehicles)
  return findedVehicles;
}