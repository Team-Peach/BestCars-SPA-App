/*globals $ */

export function dismissModal(context) {
    let redirectToUserProfileLinks = $('.redirect-user-profile');
    redirectToUserProfileLinks.on('click', function (ev) {
        let href = $(this).attr('href');
        redirectToUserProfileLinks.attr('data-dismiss', 'modal');
        context.redirect(href);
    });
}