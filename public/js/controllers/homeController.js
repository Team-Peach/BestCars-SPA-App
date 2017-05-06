/*globals $, moment */
import { getCars as getCars } from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'adsSearch';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants';
import * as comments from 'comments';

export function homeController(context) {
	Promise.all([getCars('cars'), getCars('trucks'), getCars('motorcycles'), getCars('campers'), loadTemplate('home'), loadTemplate('ads'), loadTemplate('comment')])
		.then(([carsResponse, trucksResponse, motorcyclesResponse, campersResponse, templateHome, templateCars, commentTemplate]) => {
			context.$element().html(templateHome());
			let allAds = [].concat(carsResponse, trucksResponse, motorcyclesResponse, campersResponse),
				allTags = [],
				findAds,
				searchForm = $('#search-form'),
				input = $('#search');

			getAllTags(allTags, allAds);
			autocomplete(allTags);
			searchForm.on('submit', function (e) {
				e.preventDefault();
				searchInAds(input, allAds, context, templateCars)
					.then(resolve => {
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
			});
		});
	});
}

function getAllTags(allTags, allAds) {
	for (let i = 0; i < allAds.length; i++) {
		allTags.push(allAds[i].manufacturer);
		allTags.push(allAds[i].model);
	}
}

function searchInAds(input, allAds, context, template) {

	let inputText = input.val();
	let findAds = search(allAds, inputText);
	let findCars = {
		cars: findAds,
	};

	return Promise.resolve(context.$element().html(template(findCars)));
}