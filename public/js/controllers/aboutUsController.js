/* globals $ */

import { load as loadTemplate } from 'templates';

export function aboutUsController(context) {
    $('#viewSearch').hide();
    $('#search-form').hide();
    loadTemplate('aboutUs')
        .then(template => {
            context.$element().html(template());
        });
}