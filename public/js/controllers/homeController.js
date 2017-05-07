/*globals $, moment */

import {adForHome as adForHome} from 'data';
import { postCar as postCar } from 'data';
import { guestUserAuthToken } from 'constants';
import { load as loadTemplate } from 'templates';
import * as adsSearch from 'adsSearch';
import { attachFilterAds } from 'adsFilter';
import * as comments from 'comments';




export function homeController(context) {
	$('#viewSearch').hide();

	let vehicleType = ['cars', 'motorcycles', 'trucks', 'campers'];
	Promise.all([adForHome(vehicleType[0]), adForHome(vehicleType[1]), adForHome(vehicleType[2]), adForHome(vehicleType[3]),loadTemplate('home'), loadTemplate('comment')])
		.then(([cars, motorcycles, trucks, campers, template, commentTemplate]) => {
			let allCars = {
				cars: cars,
				motorcycles: motorcycles,
				trucks: trucks,
				campers: campers
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
		});
}