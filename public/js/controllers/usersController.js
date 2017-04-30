/*globals $*/
import { registerUser, loginUser, logoutUser, createUserProfile, getUserProfileById } from 'data';
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

                let user = new User(firstName, lastName, username, password, email, phoneNumber, country, town);
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
            context.$element().html(template({ user }));
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
            console.log("create", user);
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
            let password = userData._password;
            let email = userData._email;
            let phoneNumber = userData._phoneNumber;
            let country = userData._country;
            let town = userData._town;
            // TODO: get adds from profile??
            // let adds
            user = new User(firstName, lastName, username, password, email, phoneNumber, country, town);
        }, error => {
            alert("Cannot load profile");
        });
}
