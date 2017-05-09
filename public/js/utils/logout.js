/* globals $, toastr */

import { logoutUser } from 'data';

(function () {
    $('#buttonLogout').click(() => {
        let authtoken = sessionStorage.getItem('authtoken');
        $('#viewSearch').hide();

        logoutUser(authtoken)
            .then(response => {
                $('#buttonLogin').removeClass('hidden');
                $('#buttonRegister').removeClass('hidden');
                $('#buttonLogout').addClass('hidden');
                $('#buttonCreateNewAd').addClass('hidden');
                $('#buttonUserProfile').addClass('hidden');

                sessionStorage.clear();
                toastr.success('Successful logout');
            }, error => {
                toastr.error('Unsuccessful logout');
            });
    });
})();