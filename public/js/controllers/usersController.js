/* globals $, toastr */

import { registerUser, loginUser, logoutUser, createUserProfile } from 'data';
import { load as loadTemplate } from 'templates';
import { createUser } from 'factory';
import { guestUserAuthToken } from 'constants'; 

export function loadRegistrationForm(context) {
    $('#viewSearch').hide();
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
    $('#viewSearch').hide();
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
            });
        });
}

function register(context, user) {
    registerUser(user)
        .then(response => {
            console.log(context);
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);
            createProfile(context, user, userId, authtoken)
                .then(response => {
                    toastr.success("Welcome to BestCars!");
                    $('#buttonLogin').addClass('hidden');
                    $('#buttonRegister').addClass('hidden');
                    $('#buttonLogout').removeClass('hidden');
                    $('#buttonCreateNewAd').removeClass('hidden');
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
            $('#buttonUserProfile').removeClass('hidden');

            toastr.success("Successful login");
            context.redirect("#/profile");
        }, error => {
            toastr.error("Unsuccessful login");
            context.redirect('#/register');
        });
}

function createProfile(context, user, userId, authtoken) {
    return createUserProfile(user, authtoken)
        .then(
        response => {
            context.redirect("#/profile");
        }, error => {
            toastr.error("Unsuccessful registration");
        });
}

