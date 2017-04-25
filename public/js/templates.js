/*globals Handlebars */
import { get as getRequest } from 'requester';

let cacheObj = {};

export function load(templateName) {
	if(cacheObj.hasOwnProperty(templateName)) {
		return Promise.resolve(cacheObj[templateName]);
	}
	
	return getRequest(`templates/${templateName}.handlebars`)
	.then(template => {
		let compiledTemplate = Handlebars.compile(template);
		cacheObj[templateName] = compiledTemplate;

		return Promise.resolve(compiledTemplate);
	});
} 