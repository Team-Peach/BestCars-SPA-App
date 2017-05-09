/* globals $, toastr, moment */

import { addNewComment as addNewComment } from 'data';
import { getAllCommentsByAdId as getAllCommentsByAdId } from 'data';
import { guestUserAuthToken } from 'constants';
import { createComment } from 'factory';
import { dismissModal } from 'dismissModal';

export function loadCommentsBtnIsChecked(context, adId, isLoadCommentsBtnClicked, commentTemplate, loadCommentsBtn, commentsDiv) {
	if (isLoadCommentsBtnClicked) {
		loadAllComments(context, adId, commentTemplate, commentsDiv);
		loadCommentsBtn.text('Hide Comments');
	} else {
		commentsDiv.html('');
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

export function addComment(adId, contentInput, addCommentFormDiv, loadCommentFormBtn, commentsDiv) {
	let author = sessionStorage.getItem('username') || 'Anonymous';
	let content = contentInput.val();
	let comment = createComment(adId, content, author);
	let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	if (content === '') {
		toastr.info('You must write a comment first');
	} else {
		addNewComment(comment, authtoken, 'comments')
			.then(response => {
				toastr.success('Added new comment!');
				
				contentInput.val('');
				addCommentFormDiv.toggleClass('hidden');
				loadCommentFormBtn.text('Add new comment');
			}, error => {
				toastr.error('Cannot save the comment, please try latter');
				contentInput.val('');
			});
	}
}


function loadAllComments(context, adId, commentTemplate, commentsDiv) {
	let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	getAllCommentsByAdId(adId, authtoken, 'comments')
		.then(response => {			
			let comments = response;
        	for (let i = 0; i < comments.length; i++) {
                comments[i] = fixDate(comments[i]);
            }			
			commentsDiv.html(commentTemplate({ comments }));
			dismissModal(context);
		}, error => {
			toastr.error('Cannot load comments');
		});
}

function fixDate(item) {
    let newItem = Object.create(item);
    newItem._kmd.ect = moment(item._kmd.ect).format('MMM Do YYYY, hh:mm');
    return newItem;
}
