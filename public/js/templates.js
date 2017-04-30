/*globals Handlebars */
import { get as getRequest } from 'requester';

let cacheObj = {};

export function load(templateName) {
	return getRequest(`templates/${templateName}.handlebars`)
	.then(template => {
		let compiledTemplate = Handlebars.compile(template);

		return Promise.resolve(compiledTemplate);
	});
} 