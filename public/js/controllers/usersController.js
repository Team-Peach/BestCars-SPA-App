/*globals $*/
import { registerUser, loginUser, logoutUser } from 'data';
import { load as loadTemplate } from 'templates';
import { User } from 'user';

let user;

export function loadRegistrationForm(context) {
    loadTemplate('register')
        .then(template => {
            context.$element().html(template());
            let $registerForm = $('#register');
            $registerForm.on('submit', function() {
                let firstName = $('#firstName').val();
                let lastName = $('#lastName').val();
                let username = $('#username').val();
                let password = $('#password').val();
                let email = $('#email').val();
                let phoneNumber = $('#phoneNumber').val();
                let country = $('#country').val();
                let town = $('#town').val();

                user = new User(firstName, lastName, username, password, email, phoneNumber, country, town);
                register(context, user);
             })
        });
}

export function loadLoginForm(context) {
    loadTemplate('login')
        .then(template => {
            context.$element().html(template());
            let $loginForm = $('#login');
            $loginForm.on('submit', function() {
                let username = $('#username').val();
                let password = $('#password').val();
                let user = {"username": username, "password": password};
                login(context, user);
            })
        });
}

export function register(context, user) {
    registerUser(user)
        .then(response => {
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('authtoken', response._kmd.authtoken);
            sessionStorage.setItem('id',response._id);
            //todo - ajax for user profile
            alert("Welcome to BestCars!");
            context.redirect('#/home');
        }, error => {
            alert("Unsuccessful registration");
            context.redirect('#/home');
        });
}

export function login(context, user) {
    loginUser(user)
        .then(response => {
            console.log(response)
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('authtoken', response._kmd.authtoken);
            sessionStorage.setItem('id',response._id);
            console.log(sessionStorage);
            //todo - ajax for user profile
            alert("Successful login");
            context.redirect('#/home');
        }, error => {
            alert("Unsuccessful login");
            context.redirect('#/home');
        });
}

export function logout(context) {
    let authtoken = sessionStorage.getItem('authtoken');

    logoutUser(authtoken)
            .then(response => {
            sessionStorage.clear();
            // TODO: let user = {};
            alert("Successful logout");
            context.redirect('#/home');
        }, error => {
            alert("Unsuccessful logout");
            context.redirect('#/home');
        });
}