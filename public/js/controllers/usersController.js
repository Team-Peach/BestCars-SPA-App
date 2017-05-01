/*globals $*/
import { registerUser, loginUser, logoutUser, createUserProfile, getUserProfileById, addUserProfileImage } from 'data';
import { load as loadTemplate } from 'templates';
import { User } from 'user';

let user = {};

export function loadRegistrationForm(context) {
    loadTemplate('register')
        .then(template => {
            context.$element().html(template());
            let $registerForm = $('#register');
            $registerForm.on('submit', function () {
                let firstName = $('#firstName').val();
                let lastName = $('#lastName').val();
                let username = $('#username').val();
                let password = $('#password').val();
                let email = $('#email').val();
                let phoneNumber = $('#phoneNumber').val();
                let country = $('#country').val();
                let town = $('#town').val();

                let user = new User(firstName, lastName, username, email, phoneNumber, country, town);
                register(context, user);
            });
        });
}

export function loadLoginForm(context) {
    loadTemplate('login')
        .then(template => {
            context.$element().html(template());
            let $loginForm = $('#login');
            $loginForm.on('submit', function () {
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

    loadTemplate('userProfile')
        .then(template => {
            let currentUser = sessionStorage.getItem('user');
            if( currentUser !== null) {
                user = JSON.parse(currentUser);
            }
            context.$element().html(template({ user }));
            let input = $('#file');
            input.on('change', function () {
                showImage(this);
            });            
            $('#submit-image').on('click', function () {
            if($('#imgContainer').find('img').length > 0) {
                addProfileImage()
                .then(response => {
                    let userId = sessionStorage.getItem('id');
                    let authtoken = sessionStorage.getItem('authtoken');
                    getProfileById(userId, authtoken)
                    .then(response => {
                        let imgContainer = $('#imgContainer');
                        imgContainer.empty();
                        input.val('');
                        context.redirect('#/home');
                        //loadUserProfileForm(context);
                    }, error => {
                        alert("Cannot save the picture");
                         });
                }, error => {
                    alert("Cannot save the picture");
                });                
              }
            else {
                alert('You must upload a picture first');
            }
            });  
        });
}

export function register(context, user) {
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
                    alert("Welcome to BestCars!");
                    $('#buttonLogin').addClass('hidden');
                    $('#buttonRegister').addClass('hidden');
                    $('#buttonLogout').removeClass('hidden');
                    $('#buttonCreateNewAd').removeClass('hidden');
                    $('#buttonMyAd').removeClass('hidden');
                    $('#buttonUserProfile').removeClass('hidden');                    
                    context.redirect('#/profile');
                }, error => {
                    alert("Unsuccessful registration");
                    context.redirect('#/home');
                });

        }, error => {
            alert("Unsuccessful registration");
            context.redirect('#/home');
        });
}

export function login(context, user) {
    loginUser(user)
        .then(response => {
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);
            getProfileById(userId, authtoken)
                .then(response => {
                    $('#buttonLogin').addClass('hidden');
                    $('#buttonRegister').addClass('hidden');
                    $('#buttonLogout').removeClass('hidden');
                    $('#buttonCreateNewAd').removeClass('hidden');
                    $('#buttonMyAd').removeClass('hidden');
                    $('#buttonUserProfile').removeClass('hidden');

                    alert("Successful login");
                    context.redirect("#/profile");
                }, error => {
                    alert("Unsuccessful login");
                    context.redirect("#/home");
                })
        }, error => {
            alert("Unsuccessful login");
            context.redirect('#/home');
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
            user = {};
            // TODO: let user = {};
            alert("Successful logout");
            context.redirect('#/home');
        }, error => {
            alert("Unsuccessful logout");
            context.redirect('#/home');
        });
}
//TODO: refactor
export function createProfile(user, userId, authtoken) {
    return createUserProfile(user, authtoken)
        .then(
        response => {
            /*
        let userData = response;          
        let firstName = userData._firstName;
        let lastName = userData._lastName;
        let username = userData._username;
        let password = userData._password;
        let email = userData._email;
        let phoneNumber = userData._phoneNumber;
        let country = userData._country;
        let town = userData._town;
        // TODO: get adds from profile??
        // let adds
        user = new User(firstName, lastName, username, password, email, phoneNumber, country, town);
        */
            return getProfileById(userId, authtoken);
        }, error => {
            alert("Unsuccessful registration");
        });
}

export function getProfileById(userId, authtoken) {
    return getUserProfileById(userId, authtoken)
        .then(response => {
            let userData = response[0];
            let firstName = userData._firstName;
            let lastName = userData._lastName;
            let username = userData._username;
            let email = userData._email;
            let phoneNumber = userData._phoneNumber;
            let country = userData._country;
            let town = userData._town;

            let profileId = userData._id;
            // TODO: get adds from profile??
            // let adds
            user = new User(firstName, lastName, username, email, phoneNumber, country, town);
            user.image = userData._image;
            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('profileId', profileId);
        }, error => {
            alert("Cannot load profile");
        });
}

export function showImage(input) {
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

export function addProfileImage() {
    let currentUser = JSON.parse(sessionStorage.getItem('user'));
    let authtoken = sessionStorage.getItem('authtoken');
    let profileId = sessionStorage.getItem('profileId');
    user = new User(currentUser._firstName, currentUser._lastName, currentUser._username, currentUser._email, currentUser._phoneNumber, currentUser._country, currentUser._town);
    let uploadedImage = $('#profile-image').attr('src'); 
    user.image = uploadedImage;
    return addUserProfileImage(user, profileId, authtoken);
}
