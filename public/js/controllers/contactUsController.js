/* globals $ */

import { load as loadTemplate } from 'templates';

export function contactUsController(context) {
	$('#viewSearch').hide();
	$('#search-form').hide();
	loadTemplate('contactUs')
		.then(template => {
			context.$element().html(template());
		});
}