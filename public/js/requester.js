/*globals $ */

function request(url, type, options, headers) {
	let promise = new Promise((resolve, reject) => $.ajax({
		url,
		type,
		headers,
		options,
		success: resolve,
		error: reject
	}));

	return promise;
}

export function get(url) {
	return request(url, 'GET', {}, {});
}

 export function post(url) {
	return request(url, 'POST', {}, {});
}

export function put(url) {
	return request(url, 'PUT', {}, {});
}

