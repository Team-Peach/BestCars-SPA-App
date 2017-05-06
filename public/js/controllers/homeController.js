/*globals $*/
import { getCars as getCars } from 'data';
import { load as loadTemplate } from 'templates';
import { search, autocomplete } from 'search';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants';

import { Comment } from 'comment';

export function homeController(context) {
	Promise.all([getCars('cars'), getCars('trucks'),getCars('motorcycles'), getCars('caravans'), loadTemplate('home'), loadTemplate('cars'), loadTemplate('comment')])
		.then(([carsResponse, trucksResponse, motorcyclesResponse, caravanasResponce, templateHome, templateCars, commentTemplate]) => {
			context.$element().html(templateHome());
			let allAds = [].concat(carsResponse, trucksResponse, motorcyclesResponse, caravanasResponce),
				allTags = [],
				findedAds,
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
							loadCommentsBtnIsChecked(isLoadCommentsBtnClicked, loadAllComments, commentTemplate, loadCommentsBtn);
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
					})
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
	let findedAds = search(allAds, inputText);
	let findedCars = {
		cars: findedAds,
	};
	return Promise.resolve(context.$element().html(template(findedCars)));
}

function loadCommentsBtnIsChecked(isLoadCommentsBtnClicked, loadAllComments, commentTemplate, loadCommentsBtn) {
	if (isLoadCommentsBtnClicked) {
		loadAllComments(commentTemplate);
		loadCommentsBtn.text('Hide Comments');
	} else {
		let commentDiv = $('#comments').html('');
		loadCommentsBtn.text('Show Comments');
	}
}

function loadAllComments(commentTemplate) {
	let adId = $('.fade').attr("id");
	let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	getAllCommentsByAdId(adId, authtoken, 'comments')
		.then(response => {			
			let comments = response;
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

/*
let $appContainer = $('#app-container');
export function homeController(params) {
	//TODO delete this -  just for test 
	$('#route').html('TODO home');

	// if route has /home?pesho='gosho'
	let { routeQueryParameters } = params;

	Promise.all([getHome(), loadTemplate('home')])
		.then(([databaseAJAXResponse, handlebarsTemplate]) => {
			$appContainer.html(handlebarsTemplate(databaseAJAXResponse));
		})
		.catch((err) => console.log(err));
	
}
*/