/*globals $*/
import { getHome as getHome } from 'data';
import { load as loadTemplate } from 'templates';

export function homeController(context) {

    loadTemplate('home')
	.then(template => {
            context.$element().html(template());
        });
}

/*
let $appContainer = $('#app-container');
export function homeController(params) {
	//TODO delete this -  just for test 
	$('#route').html('TODO home');

	// if route has /home?pesho='gosho'
	let { routeQueryParameters } = params;

	Promise.all([getHome(), loadTemplate('home')])
		.then(([databaseAJAXResponse, handlebarsTemplate]) => {
			$appContainer.html(handlebarsTemplate(databaseAJAXResponse));
		})
		.catch((err) => console.log(err));
	
}
*/