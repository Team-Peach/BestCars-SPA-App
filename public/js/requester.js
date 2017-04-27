/*globals $ */

function request(url, type, body, headers) {
	let promise = new Promise((resolve, reject) => $.ajax({
    url,
    type,
    contentType: 'application/json',
    headers,
    data: body,
    success(response) {
        resolve(response);
    },
    error(err) {
    	reject(err);
	}
	}));

	return promise;
}

export function get(url, headers) {
		return request(url, 'GET', {}, headers);
}

 export function post(url, body, headers) {
	return request(url, 'POST', body, headers);
}

export function put(url) {
	return request(url, 'PUT', {}, {});
}

