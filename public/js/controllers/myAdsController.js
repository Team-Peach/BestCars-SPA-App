/* globals $, toastr */

import { deleteVehicle as deleteVehicle } from 'data';
import { getMyCars as getMyCars } from 'data';
import { load as loadTemplate } from 'templates';
import { attachFilterAds } from 'adsFilter';
import * as comments from 'comments';
import * as adsSearch from 'adsSearch';

export function myAdsController(context) {
	var userId = sessionStorage.id;
	$('#search-form').hide();
	Promise.all([getMyCars(userId), loadTemplate('myAds'), loadTemplate('comment')])
		.then(([carsDatabaseAJAXResponse, template, commentTemplate]) => {
			let allCars = {
				cars: carsDatabaseAJAXResponse
			};

			context.$element().html(template(allCars));


			// take all comments by ad id 
			let isLoadCommentsBtnClicked = false;
			let loadCommentsButtons = $(".load-comments");
			loadCommentsButtons.on('click', function () {
				isLoadCommentsBtnClicked = !isLoadCommentsBtnClicked;
				let loadCommentBtn = $(this);
				let commentDiv = $(this).parent().children('.comments');
				let adId = $(this).parent().parent().parent().parent().attr("id");
				comments.loadCommentsBtnIsChecked(adId, isLoadCommentsBtnClicked, commentTemplate, loadCommentBtn, commentDiv);
			});

			// show/hide add new comment form
			let loadCommentFormButtons = $('.load-comment-form');

			loadCommentFormButtons.on('click', function () {
				let loadCommentsFormBtn = $(this);
				let addCommentFormDiv = $(this).parent().prev().children('.div-comment-form ');
				comments.loadAddNewCommentForm(addCommentFormDiv, loadCommentsFormBtn);
			});
			// add new comment
			let addCommentForm = $('.comment-form');

			addCommentForm.on('submit', function (ev) {
				ev.preventDefault();
				let addCommentFormDiv = $(this).parent().parent();
				let loadCommentFormBtn = $(this).parent().parent().parent().next().children('.load-comment-form');
				let contentInput = $(this).children().children('.input-group').children('.comment-content');
				let commentsDiv = $(this).parent().parent().prev('.comments');
				let adId = $(this).parent().parent().parent().parent().parent().parent().attr("id");
				comments.addComment(adId, contentInput, addCommentFormDiv, loadCommentFormBtn, commentsDiv);
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

			$('.deleteButton').click(function () {
				console.log($(this).parent().parent().parent());
				var id = $(this).parent().parent().parent().attr('data-id');
				var type = $(this).parent().parent().parent().attr('data-type');
				deleteVehicle(type, id)
					.then(response => {
						toastr.success("Successfully delete");
						window.location.reload(true);
					}, error => {
						toastr.error("Cannot delete");
					});
			});
		});
}