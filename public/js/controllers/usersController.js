/* globals $, toastr */

import { registerUser, loginUser, logoutUser, createUserProfile } from 'data';
import { load as loadTemplate } from 'templates';
import { createUser } from 'factory';

export function loadRegistrationForm(context) {
    $('#viewSearch').hide();
    $('#search-form').hide();
    loadTemplate('register')
        .then(template => {
            context.$element().html(template());
            let $registerForm = $('#register');
            $registerForm.on('submit', function (ev) {
                ev.preventDefault();
                let arrayOfFormObjValues = $registerForm.serializeArray();
                let valuesFromForm = {};
                $.each(arrayOfFormObjValues, function (i, field) {
                    valuesFromForm[field.name] = field.value;
                });
                let password = $('#password').val();
                let user;
                try {
                    user = createUser(valuesFromForm.firstName, valuesFromForm.lastName, valuesFromForm.username, valuesFromForm.email, valuesFromForm.phoneNumber, valuesFromForm.country, valuesFromForm.town);
            }
                catch (e) {
                    toastr.warning('Please fill all fields correct!');
                    return;
                }

                register(context, user, password);
            });
        });
}

function register(context, user, password) {
    registerUser(user, password)
        .then(response => {
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);
            createUserProfile(user, authtoken)
                .then(response => {
                    toastr.success('Welcome to BestCars!');
                    setTimeout(function () {
                        window.location.href = '#/profile';
                        window.location.reload(true);
                    }, 2000);
                }, error => {
                    toastr.error('Unsuccessful registration');
                });

        }, error => {
            toastr.error('Unsuccessful registration');
        });
}

export function loadLoginForm(context) {
    $('#viewSearch').hide();
    $('#search-form').hide();
    loadTemplate('login')
        .then(template => {
            context.$element().html(template());
            let $loginForm = $('#login');
            $loginForm.on('submit', function (ev) {
                ev.preventDefault();
                let username = $('#username').val();
                let password = $('#password').val();
                let user = { 'username': username, 'password': password };
                login(context, user);
            });
        });
}

function login(context, user) {
    loginUser(user)
        .then(response => {
            toastr.success('Successful login');
            let username = response.username;
            let authtoken = response._kmd.authtoken;
            let userId = response._id;
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('authtoken', authtoken);
            sessionStorage.setItem('id', userId);
            setTimeout(function () {
                window.location.href = '#/profile';
                window.location.reload(true);
            }, 1000);

        }, error => {
            toastr.error('Unsuccessful login');
            context.redirect('#/register');
        });
}
