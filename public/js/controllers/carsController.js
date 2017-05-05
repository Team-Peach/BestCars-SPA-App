/*globals $ */
import { getCars as getCars } from 'data';
import {deleteVehicle as deleteVehicle} from 'data';
import { getMyCars as getMyCars } from 'data';
import { postCar as postCar } from 'data';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants'; 
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'search';

import { Comment } from 'comment';

export function getAllCars(context) {
	Promise.all([getCars('cars'),loadTemplate('cars'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};

			context.$element().html(template(allCars));

			let loadComments = $("#load-comments");
			// take all comments by ad id 
			loadComments.on('click', function() {
			loadAllComments(commentTemplate);
			});
		
			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {				
				loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				addComment(addCommentFormDiv, loadCommentFormBtn);
			});	

			
			let allTags = [];

			getAllTags(allTags, carsDatabaseAJAXResponse);

			autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			/* filter by price */


			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
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

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.year) - parseInt(b.year);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByYear-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.year) - parseInt(a.year);
				});

				context.$element().html(template(HighCars));

			});
		});
}

export function getTrucks(context) {
	Promise.all([getCars('trucks'), loadTemplate('cars'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));

			let loadComments = $("#load-comments");
			// take all comments by ad id 
			loadComments.on('click', function() {
			loadAllComments(commentTemplate);
			});
		
			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {				
				loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				addComment(addCommentFormDiv, loadCommentFormBtn);
			});
		
			let allTags = [];

			getAllTags(allTags, carsDatabaseAJAXResponse);

			autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			/* filter by price */

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
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

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.year) - parseInt(b.year);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByYear-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.year) - parseInt(a.year);
				});

				context.$element().html(template(HighCars));

			});
		});
}

export function getMotors(context) {
	Promise.all([getCars('motorcycles'), loadTemplate('cars'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));

			let loadComments = $("#load-comments");
			// take all comments by ad id 
			loadComments.on('click', function() {
			loadAllComments(commentTemplate);
			});
		
			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {				
				loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				addComment(addCommentFormDiv, loadCommentFormBtn);
			});		
		
			let allTags = [];

			getAllTags(allTags, carsDatabaseAJAXResponse);

			autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			/* filter by price */

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
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

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.year) - parseInt(b.year);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByYear-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.year) - parseInt(a.year);
				});

				context.$element().html(template(HighCars));

			});
		});
}

export function getCaravans(context) {
	Promise.all([getCars('campers'), loadTemplate('cars'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));

			let loadComments = $("#load-comments");
			// take all comments by ad id 
			loadComments.on('click', function() {
			loadAllComments(commentTemplate);
			});
		
			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {				
				loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				addComment(addCommentFormDiv, loadCommentFormBtn);
			});		
		
			let allTags = [];

			getAllTags(allTags, carsDatabaseAJAXResponse);

			autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			/* filter by price */
			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
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

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.year) - parseInt(b.year);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByYear-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.year) - parseInt(a.year);
				});

				context.$element().html(template(HighCars));

			});
		});
}

export function getMyAd(context) {
	var userId = sessionStorage.id;
	Promise.all([getMyCars(userId), loadTemplate('myAd'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));
			console.log(carsDatabaseAJAXResponse);
			let loadComments = $("#load-comments");
			// take all comments by ad id 
			loadComments.on('click', function() {
			loadAllComments(commentTemplate);
			});
		
			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {				
				loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				addComment(addCommentFormDiv, loadCommentFormBtn);
			});		

			let allTags = [];

			getAllTags(allTags, carsDatabaseAJAXResponse);

			autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			/* filter by price */

			$('#sortByPrice-Low').click(function (event) {
				// event.preventDefault();
				let LowCars = {
					cars: carsDatabaseAJAXResponse
				};

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.price) - parseInt(b.price);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByPrice-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
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

				LowCars.cars.sort(function(a, b) {
					return parseInt(a.year) - parseInt(b.year);
				});


				context.$element().html(template(LowCars));

			});

			$('#sortByYear-High').click(function (event) {
				// event.preventDefault();
				let HighCars = {
					cars: carsDatabaseAJAXResponse
				};

				HighCars.cars.sort(function(a, b) {
					return parseInt(b.year) - parseInt(a.year);
				});

				context.$element().html(template(HighCars));

			});

			$('.deleteButton').click(function () {
				var id = $(this).parent().parent().parent().attr('data-id');
				var type = $(this).parent().parent().parent().attr('data-type');
				alert(id);
				deleteVehicle(type, id);
				// context.redirect('#/myAd');
			})

		});
}

export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}

function getAllTags(allTags, carsDatabaseAJAXResponse) {
	for (let i = 0; i < carsDatabaseAJAXResponse.length; i++) {
		allTags.push(carsDatabaseAJAXResponse[i].manufacturer);
		allTags.push(carsDatabaseAJAXResponse[i].model);
	}
}

function searchInAds(input, carsDatabaseAJAXResponse, context, template) {

	let inputText = input.val();
	let findedAds = search(carsDatabaseAJAXResponse, inputText);
	let findedCars = {
		cars: findedAds,
	};
	context.$element().html(template(findedCars));
}

function loadAllComments(commentTemplate) {
	let adId = $('.fade').attr("id");
	let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	getAllCommentsByAdId(adId, authtoken, 'comments')
		.then(response => {			
			let comments = response;
			console.log(comments);
        	for (let i = 0; i < comments.length; i++) {
                comments[i] = fixDate(comments[i]);
            }			
			let commentsDiv = $('#comments');
			commentsDiv.html(commentTemplate({ comments }));
		}, error => {
			toastr.error("Cannot load comments");
		});
}

function loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn) {
	addCommentFormDiv.toggleClass('hidden');
	if (addCommentFormDiv.hasClass('hidden')) {
		loadCommentFormBtn.text('Add new comment');
	} else {
		loadCommentFormBtn.text('Hide new comment form');
	}
}

function addComment(addCommentFormDiv, loadCommentFormBtn) {
	let adId = $('.fade').attr("id");
	let content = $('#comment-content').val();
	let author = sessionStorage.getItem('username') || "Anonimous";
	let comment = new Comment(adId, content, author);
	let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	if (content === '') {
		toastr.info('You must write a comment first');
	} else {
		addNewComment(comment, authtoken, 'comments')
			.then(response => {
				toastr.success('Added new comment!');
				$('#comments').html('');
				$('#comment-content').val('');
				addCommentFormDiv.toggleClass('hidden');
				loadCommentFormBtn.text('Add new comment');
			}, error => {
				toastr.error('Cannot save the comment, please try latter');
				$('#comment-content').val('');
			});
	}
}

function fixDate(item) {
    let newItem = Object.create(item);
    newItem._kmd.ect = moment(item._kmd.ect).format('MMM Do YYYY, hh:mm');
    return newItem;
}
