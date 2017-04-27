import * as requester from 'requester';
import * as CONSTANTS from 'constants';

export function getHome() {
	return requester.get('/home');
}

export function getUsers() {
	return requester.get('/users');
}

export function getCars() {
	let kinveyAppDataUrl = CONSTANTS.kinveyAppDataUrl + '/cars';
	let guestUserAuthToken = CONSTANTS.guestUserAuthToken;
	const kinveyAuthHeaders = { 'Authorization': "Kinvey " + guestUserAuthToken };

	return requester.get(kinveyAppDataUrl, kinveyAuthHeaders);
}

export function postCar() {
	return requester.post('/cars/add');
}

