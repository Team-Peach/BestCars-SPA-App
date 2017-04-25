import * as requester from 'requester';

export function getHome() {
	return requester.get('/home');
}

export function getUsers() {
	// TODO authentication
	return requester.get('/users');
}

export function getCars() {
	return requester.get('/cars');
}

export function addCars() {
	return requester.post('/cars/add');
}

