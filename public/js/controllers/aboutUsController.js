/* globals $ */

import { load as loadTemplate } from 'templates';

export function aboutUsController(context) {
    $('#viewSearch').hide();
    loadTemplate('aboutUs')
        .then(template => {
            context.$element().html(template());
        });
}