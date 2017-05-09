/* globals $, toastr */

import { getUserProfileById, addUserProfileImage, getMyAds } from 'data';
import { load as loadTemplate } from 'templates';
import { createUser } from 'factory';
import { guestUserAuthToken, guestUserId } from 'constants'; 
import * as comments from 'comments';
import { dismissModal } from 'dismissModal';

export function loadUserProfileForm(context) {
    $('#viewSearch').hide();
    $('#search-form').hide();
    let userId = sessionStorage.getItem('id');
    let authtoken = sessionStorage.getItem('authtoken');

    Promise.all([getUserProfileById(userId, authtoken), loadTemplate('userProfile')])
        .then(([response, template]) => {
            let userData = response[0];
            let firstName = userData._firstName;
            let lastName = userData._lastName;
            let username = userData._username;
            let email = userData._email;
            let phoneNumber = userData._phoneNumber;
            let country = userData._country;
            let town = userData._town;
            let profileId = userData._id;
            sessionStorage.setItem('profileId', profileId);  
            console.log(profileId)     
            console.log(userData)
            let user = createUser(firstName, lastName, username, email, phoneNumber, country, town);
            user.image = userData._image;  
            context.$element().html(template({ user }));
            let input = $('#file');
            input.on('change', function () {
            showImage(this);
            });
            $('#submit-image').on('click', function () {
                if ($('#imgContainer').find('img').length > 0) {
                    addProfileImage(user)
                        .then(response => {
                            toastr.success("Successfully added new profile image");
                            getUserProfileById(userId, authtoken)
                                .then(response => {
                                    let imgContainer = $('#imgContainer');
                                    imgContainer.empty();
                                    input.val('');
                                    window.location.reload(true);
                                }, error => {
                                    toastr.error("Cannot save the picture");
                                });
                        }, error => {
                            toastr.error("Cannot save the picture");
                        });
                }
                else {
                    toastr.info('You must upload a picture first');
                }
            });
        });
}

export function loadUserProfile(context) {
    $('#viewSearch').hide();
    $('#search-form').hide();
    let userId = context.params['id'];  //take from url
    let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;

    if (userId === guestUserId) {
        toastr.info("The account you are trying to view does not exist");
        context.redirect("#/home");
    }
    else {
        Promise.all([getUserProfileById(userId, authtoken), loadTemplate('userProfile')])
            .then(([response, template]) => {
                let userData = response[0];
                let firstName = userData._firstName;
                let lastName = userData._lastName;
                let username = userData._username;
                let email = userData._email;
                let phoneNumber = userData._phoneNumber;
                let country = userData._country;
                let town = userData._town;

                let user = createUser(firstName, lastName, username, email, phoneNumber, country, town);
                user.image = userData._image;

                context.$element().html(template({ user }));

                $('#upload-image-form').remove();
                let myAdsBtn = $('#my-ads');
                myAdsBtn.text('User ads');
                myAdsBtn.on('click', function(ev) {
                    ev.preventDefault();
                    context.redirect("#/user/profile/ads/?id=" + userId);
                })
            });
    }
}

export function loadUserAds(context) {
    $('#search-form').hide();
    let userId = context.params['id'];  //take from url
    let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken;
	let vehicleType = ['cars', 'motorcycles', 'trucks', 'campers'];
	Promise.all([getMyAds(userId, vehicleType[0], authtoken), getMyAds(userId, vehicleType[1], authtoken), getMyAds(userId, vehicleType[2], authtoken), getMyAds(userId, vehicleType[3], authtoken),loadTemplate('myAds'), loadTemplate('comment')])
		.then(([cars, motorcycles, trucks, campers, template, commentTemplate]) => {
			let allCars = {
				cars: cars,
				motorcycles: motorcycles,
				trucks: trucks,
				campers: campers
			};

			context.$element().html(template(allCars));
            
            //remove delete buttons 
            let deleteButtons = $('.deleteButton');
            deleteButtons.remove();

			// take all comments by ad id 
			let isLoadCommentsBtnClicked = false;
			let loadCommentsButtons = $(".load-comments");
			loadCommentsButtons.on('click', function () {
				isLoadCommentsBtnClicked = !isLoadCommentsBtnClicked;
				let loadCommentBtn = $(this);
				let commentDiv = $(this).parent().children('.comments');
				let adId = $(this).parent().parent().parent().parent().attr("id");
				comments.loadCommentsBtnIsChecked(context, adId, isLoadCommentsBtnClicked, commentTemplate, loadCommentBtn, commentDiv);
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

            //dismiss modal
            dismissModal(context);            
		});    
}

function showImage(input) {
    if (input.files && input.files[0]) {
        let img = input.files[0];
        let fileReader = new FileReader();
        fileReader.onload = function (e) {
            let imgContainer = $('#imgContainer');
            imgContainer.empty();
            $('<img>')
            .attr('id', 'profile-image')
            .attr('src', e.target.result)
            .addClass('img-thumbnail')
            .appendTo(imgContainer);
        }
        fileReader.readAsDataURL(img);
    }
}

function addProfileImage(user) {
    let currentUser = user;
    let authtoken = sessionStorage.getItem('authtoken');
    let profileId = sessionStorage.getItem('profileId');
    let uploadedImage = $('#profile-image').attr('src'); 
    currentUser.image = uploadedImage;
    return addUserProfileImage(currentUser, profileId, authtoken);
}