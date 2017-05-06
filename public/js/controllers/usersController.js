/*globals $*/
import { registerUser, loginUser, logoutUser, createUserProfile, getUserProfileById, addUserProfileImage } from 'data';
import { load as loadTemplate } from 'templates';
import { createUser } from 'factory';
import { guestUserAuthToken } from 'constants'; 

export function loadRegistrationForm(context) {
    loadTemplate('register')
        .then(template => {
            context.$element().html(template());
            let $registerForm = $('#register');
            $registerForm.on('submit', function (ev) {
                ev.preventDefault();
                let firstName = $('#firstName').val();
                let lastName = $('#lastName').val();
                let username = $('#username').val();
                let password = $('#password').val();
                let email = $('#email').val();
                let phoneNumber = $('#phoneNumber').val();
                let country = $('#country').val();
                let town = $('#town').val();

                let user = createUser(firstName, lastName, username, email, phoneNumber, country, town);
                register(context, user);
            });
        });
}

export function loadLoginForm(context) {
    loadTemplate('login')
        .then(template => {
            context.$element().html(template());
            let $loginForm = $('#login');
            $loginForm.on('submit', function (ev) {
                ev.preventDefault();
                let username = $('#username').val();
                let password = $('#password').val();
                let user = { "username": username, "password": password };
                login(context, user);
            })
        });
}

export function loadContactUsForm(context) {
    loadTemplate('contactUs')
        .then(template => {
            context.$element().html(template());
        });

    //TODO finish
}

export function loadAboutUs(context) {
    loadTemplate('aboutUs')
        .then(template => {
            context.$element().html(template());
        });

    //TODO finish
}

export function loadUserProfileForm(context) {
    let userId = sessionStorage.getItem('id');
    let authtoken = sessionStorage.getItem('authtoken');

    Promise.all([getUserProfileById(userId, authtoken), loadTemplate('userProfile')])
        .then(([response, template]) => {
            let userData = response[0];
            console.log(response)
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
            let input = $('#file');
            input.on('change', function () {
                  showImage(this);
            });
            $('#submit-image').on('click', function () {
                if ($('#imgContainer').find('img').length > 0) {
                    addProfileImage(user)
                        .then(response => {
                            toastr.success("Successfully added new profile image");
                            getProfileById(userId, authtoken)
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

export function logout(context) {
    let authtoken = sessionStorage.getItem('authtoken');

    logoutUser(authtoken)
        .then(response => {
            $('#buttonLogin').removeClass('hidden');
            $('#buttonRegister').removeClass('hidden');
            $('#buttonLogout').addClass('hidden');
            $('#buttonCreateNewAd').addClass('hidden');
            $('#buttonMyAd').addClass('hidden');
            $('#buttonUserProfile').addClass('hidden');

            sessionStorage.clear();
            toastr.success("Successful logout");
            context.redirect('#/home');
        }, error => {
            toastr.error("Unsuccessful logout");
            context.redirect('#/home');
        });
}

export function getUserProfile(context) {

}

function register(context, user) {
    registerUser(user)
        .then(response => {
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);
            createProfile(user, userId, authtoken)
                .then(response => {
                    toastr.success("Welcome to BestCars!");
                    $('#buttonLogin').addClass('hidden');
                    $('#buttonRegister').addClass('hidden');
                    $('#buttonLogout').removeClass('hidden');
                    $('#buttonCreateNewAd').removeClass('hidden');
                    $('#buttonMyAd').removeClass('hidden');
                    $('#buttonUserProfile').removeClass('hidden');                    
                    context.redirect('#/profile');
                }, error => {
                    toastr.error("Unsuccessful registration");
                });

        }, error => {
            toastr.error("Unsuccessful registration");
        });
}

function login(context, user) {
    loginUser(user)
        .then(response => {
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);

            $('#buttonLogin').addClass('hidden');
            $('#buttonRegister').addClass('hidden');
            $('#buttonLogout').removeClass('hidden');
            $('#buttonCreateNewAd').removeClass('hidden');
            $('#buttonMyAd').removeClass('hidden');
            $('#buttonUserProfile').removeClass('hidden');

            toastr.success("Successful login");
            context.redirect("#/profile");
        }, error => {
            toastr.error("Unsuccessful login");
            context.redirect('#/register');
        });
}

function createProfile(user, userId, authtoken) {
    return createUserProfile(user, authtoken)
        .then(
        response => {
            return getProfileById(userId, authtoken);
        }, error => {
            toastr.error("Unsuccessful registration");
        });
}

function getProfileById(userId, authtoken) {
    return getUserProfileById(userId, authtoken)
        .then(response => {
            let profileId = response[0]._id;       
            sessionStorage.setItem('profileId', profileId);            
        }, error => {
            toastr.error("Cannot load profile");
        });
}

function showImage(input) {
    if (input.files && input.files[0]) {
        let img = input.files[0];
        let filerdr = new FileReader();
        filerdr.onload = function (e) {
            let imgContainer = $('#imgContainer');
            imgContainer.empty();
            $('<img>')
            .attr('id', 'profile-image')
            .attr('src', e.target.result)
            .addClass('img-thumbnail')
            .appendTo(imgContainer);
        }
        filerdr.readAsDataURL(img);
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

export function loadUserProfile(context) {
    //let userId = sessionStorage.getItem('id');  //take from url
    let authtoken = sessionStorage.getItem('authtoken') || guestUserAuthToken
    //let userId = context.params;

    Promise.all([getUserProfileById(userId, authtoken), loadTemplate('userProfile')])
        .then(([response, template]) => {
            //remove images
            let userData = response[0];
            console.log(response)
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
        });
}
