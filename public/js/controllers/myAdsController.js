/* globals $,  */

import { deleteVehicle as deleteVehicle } from 'data';
import { getMyCars as getMyCars } from 'data';
import { load as loadTemplate } from 'templates';
import * as comments from 'comments';
import * as adsSearch from 'adsSearch';
import { attachFilterAds } from 'adsFilter';

export function myAdsController(context) {
	var userId = sessionStorage.id;
	console.log(555);
	Promise.all([getMyCars(userId), loadTemplate('myAd'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {

			let allCars = {
				cars: carsDatabaseAJAXResponse
			};
			context.$element().html(template(allCars));

			let loadCommentsBtn = $("#load-comments");

			// take all comments by ad id 
			let isLoadCommentsBtnClicked = false;
			loadCommentsBtn.on('click', function () {
				isLoadCommentsBtnClicked = !isLoadCommentsBtnClicked;
				comments.loadCommentsBtnIsChecked(isLoadCommentsBtnClicked, comments.loadAllComments, commentTemplate, loadCommentsBtn);
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