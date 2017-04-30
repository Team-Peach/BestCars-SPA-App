import * as CONSTANTS from 'constants';
import * as requester from 'requester';
import User from 'user';

export function getHome() {
        return requester.get('/home');
}

export function getUsers() {
        return requester.get('/users');
}

export function getCars(params) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/cars/' + '?query={"type":"'+ params + '"}';
        let guestUserAuthToken = CONSTANTS.guestUserAuthToken;
        const kinveyAuthHeaders = { 'Authorization': "Kinvey " + guestUserAuthToken };

        return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

export function getMyCars(params) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/cars/' + '?query={"_acl.creator":"'+ params + '"}';
        let guestUserAuthToken = CONSTANTS.guestUserAuthToken;
        const kinveyAuthHeaders = { 'Authorization': "Kinvey " + guestUserAuthToken };

        return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

export function postCar() {
        return requester.post('/cars/add');
}

export function registerUser(newUser) {
        let url = CONSTANTS.kinveyRegisterUserUrl;
        let headers = CONSTANTS.kinveyBasicHeaders;
        let body = { "username": newUser.username, "password": newUser.password };
        return requester.post(url, JSON.stringify(body), headers);
}

export function loginUser(user) {
        let url = CONSTANTS.kinveyRegisterUserUrl + '/login' ;
        let headers = CONSTANTS.kinveyBasicHeaders;
        let body = { "username": user.username, "password": user.password };
        return requester.post(url, JSON.stringify(body), headers);
}

export function logoutUser(authtoken) {
        let url = CONSTANTS.kinveyRegisterUserUrl + '/_logout';
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        return requester.post(url, {}, headers);
}

export function createUserProfile(user, authtoken) {
        let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection;
        console.log(url);
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = user;
        return requester.post(url, JSON.stringify(body), headers);
}

export function getUserProfileById(userId, authtoken) {
        let filter = JSON.stringify({ "_acl.creator": userId })
        let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection + '/?query=' + filter;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };

        return requester.get(url, headers);
}

//TODO getAll Users Profiles

export function createAd(params, authtoken, type) {
        let url = CONSTANTS.kinveyAppDataUrl + '/' + type;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = params;

        // factory create 

        return requester.post(url, JSON.stringify(body), headers);
}