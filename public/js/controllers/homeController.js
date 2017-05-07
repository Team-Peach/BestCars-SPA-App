/*globals $, moment */
import { getCars as getCars } from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'adsSearch';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants';
import * as comments from 'comments';
import * as adsSearch from 'adsSearch';

export function homeController(context) {
	$('#viewSearch').hide();
	Promise.all([getCars('cars'), getCars('trucks'), getCars('motorcycles'), getCars('campers'), loadTemplate('home'), loadTemplate('ads'), loadTemplate('comment')])
		.then(([carsResponse, trucksResponse, motorcyclesResponse, campersResponse, templateHome, templateCars, commentTemplate]) => {
			context.$element().html(templateHome());
			let allAds = [].concat(carsResponse, trucksResponse, motorcyclesResponse, campersResponse),
				allTags = [],
				findAds,
				searchForm = $('#search-form'),
				input = $('#search');

			adsSearch.getAllTags(allTags, allAds);
			autocomplete(allTags);
			searchForm.on('submit', function (e) {
				e.preventDefault();
				Promise.resolve(adsSearch.searchInAds(input, allAds, context, templateCars))
					.then(resolve => {
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
					});
			});
		});
}