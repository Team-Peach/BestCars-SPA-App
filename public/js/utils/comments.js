/* globals $, toastr, moment */

import { guestUserAuthToken } from 'constants';
import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { createComment } from 'factory';

export function loadCommentsBtnIsChecked(isLoadCommentsBtnClicked, commentTemplate, loadCommentsBtn) {
	if (isLoadCommentsBtnClicked) {
		loadAllComments(commentTemplate);
		loadCommentsBtn.text('Hide Comments');
	} else {
		let commentDiv = $('#comments').html('');
		loadCommentsBtn.text('Show Comments');
	}
}

export function loadAddNewCommentForm(addCommentFormDiv, loadCommentFormBtn) {
	addCommentFormDiv.toggleClass('hidden');
	if (addCommentFormDiv.hasClass('hidden')) {
		loadCommentFormBtn.text('Add new comment');
	} else {
		loadCommentFormBtn.text('Hide new comment form');
	}
}

export function addComment(addCommentFormDiv, loadCommentFormBtn) {
	let adId = $('.fade').attr("id");
	let content = $('#comment-content').val();
	let author = sessionStorage.getItem('username') || "Anonymous";
	let comment = createComment(adId, content, author);
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

function fixDate(item) {
    let newItem = Object.create(item);
    newItem._kmd.ect = moment(item._kmd.ect).format('MMM Do YYYY, hh:mm');
    return newItem;
}
