/*globals $*/
//import { getHome as getHome } from 'data';
import { load as loadTemplate } from 'templates';

let $appContainer = $('#app-container');

export function loadRegistrationForm() {
    loadTemplate('register')
        .then(template => {
            $appContainer.html(template())
        });
}

export function loadLoginForm() {
    loadTemplate('login')
        .then(template => {
            $appContainer.html(template())
        });
}
