import * as CONSTANTS from 'constants';
import * as requester from 'requester';
import User from 'user';

//TODO
export function getHome() {
        return requester.get('/home');
}

//TODO
export function getUsers() {
        return requester.get('/users');
}

function getKinveyUserAuthHeaders() {
        return {
                "Authorization": "Kinvey " + sessionStorage['authtoken']
        };
}

export function adForHome(params) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/' + params + '/' + '?query={}&sort={"_kmd": -1}&limit=3';
        let guestUserAuthToken = CONSTANTS.guestUserAuthToken;
        const kinveyAuthHeaders = { 'Authorization': "Kinvey " + guestUserAuthToken };

        return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

//TODO
export function editAd(params, vehicleId, body) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/' + params + '/' + vehicleId;
        let bodyAjax = body;

        return requester.put(kinveyAppDataUrl, JSON.stringify(bodyAjax), getKinveyUserAuthHeaders());
}

export function deleteVehicle(params, vehicleId) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/' + params + '/' + vehicleId;

        return requester.del(kinveyAppDataUrl, getKinveyUserAuthHeaders());
}

export function getVehicles(params) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/' + params + '/' + '?query={}&sort={"_kmd": -1}';
        let guestUserAuthToken = CONSTANTS.guestUserAuthToken;
        const kinveyAuthHeaders = { 'Authorization': "Kinvey " + guestUserAuthToken };

        return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

export function getMyAds(creatorId, collection, authtoken) {
        let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/' + collection + '/' + '?query={"_acl.creator":"' + creatorId + '"}';
        const kinveyAuthHeaders = { 'Authorization': "Kinvey " + authtoken };

        return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

export function registerUser(newUser, password) {
        let url = CONSTANTS.kinveyRegisterUserUrl;
        let headers = CONSTANTS.kinveyBasicHeaders;
        let body = { "username": newUser.username, "password": password };

        return requester.post(url, JSON.stringify(body), headers);
}

export function loginUser(user) {
        let url = CONSTANTS.kinveyRegisterUserUrl + '/login';
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
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = user;

        return requester.post(url, JSON.stringify(body), headers);
}

export function getUserProfileById(userId, authtoken) {
        let filter = JSON.stringify({ "_acl.creator": userId });
        let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection + '/?query=' + filter;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };

        return requester.get(url, headers);
}

export function createAd(params, authtoken, type) {
        let url = CONSTANTS.kinveyAppDataUrl + '/' + type;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = params;

        return requester.post(url, JSON.stringify(body), headers);
}

export function addUserProfileImage(user, profileId, authtoken) {
        let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection + '/' + profileId;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = user;

        return requester.put(url, JSON.stringify(body), headers);
}

export function getAllCommentsByAdId(adId, authtoken, type) {
        let filter = JSON.stringify({ "_adId": adId });
        let url = CONSTANTS.kinveyAppDataUrl + '/' + type + '/?query=' + filter;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };

        return requester.get(url, headers);
}

export function addNewComment(params, authtoken, type) {
        let url = CONSTANTS.kinveyAppDataUrl + '/' + type;
        let headers = { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken };
        let body = params;

        return requester.post(url, JSON.stringify(body), headers);
}