/*globals $ */
import { getCars as getCars } from 'data';
import { postCar as postCar } from 'data';
import { guestUserAuthToken } from 'constants';
import { load as loadTemplate } from 'templates';
import * as adsSearch from 'adsSearch';
import { attachFilterAds } from 'adsFilter';
import * as comments from 'comments';

export function vehiclesController(context) {
	let vehicleType = window.location.hash.split('#/')[1];
	console.log(window.location.hash);
	Promise.all([getCars(vehicleType), loadTemplate('ads'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {
			$('#viewSearch').show();
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};

			context.$element().html(template(allCars));

			let loadCommentsBtn = $("#load-comments");

			// take all comments by ad id 
			let isLoadCommentsBtnClicked = false;
			loadCommentsBtn.on('click', function () {
				isLoadCommentsBtnClicked = !isLoadCommentsBtnClicked;
				comments.loadCommentsBtnIsChecked(isLoadCommentsBtnClicked, commentTemplate, loadCommentsBtn);
			});

			// show/hide add new comment form
			let loadCommentFormBtn = $('#load-comment-form');
			let addCommentFormDiv = $('#div-comment-form');

			loadCommentFormBtn.on('click', function () {
				comments.loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn);
			});
			// add new comment ?? Todo: commentController or extract function in other file
			let addCommentForm = $('#comment-form');
			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				comments.addComment(addCommentFormDiv, loadCommentFormBtn);
			});

			let allTags = [];
			adsSearch.getAllTags(allTags, carsDatabaseAJAXResponse);
			adsSearch.autocomplete(allTags);

			let searchForm = $('#search-form');
			let input = $('#search');
			searchForm.on('submit', function (e) {
				e.preventDefault();
				adsSearch.searchInAds(input, carsDatabaseAJAXResponse, context, template);
			});

			// filter events
			attachFilterAds(carsDatabaseAJAXResponse, context, template);
		});
}

/* Георги
export function post(context) {
	Promise.all([postCar(), loadTemplate()])
		.then(() => {

		});
}
*/
