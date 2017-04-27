const kinveyKey = 'kid_HJD_8Q9Al';
const kinveySecret = '422a08d12f0d4707a0e24f89daf31e90';
const kinveyBasicHeaders = { 'Authorization': "Basic " + btoa(kinveyKey + ":" + kinveySecret)};
const guestUserAuthToken = '2539c911-ecb5-4eb7-bff0-66aa026a73c1.F3zN5BSQmSLqkAt0RdGsMWDgNAgSWSgW7tmcVFbY/m8=';
const kinveyHeaderKey = 'Authorization';
const kinveyUserAuthorization = 'Kinvey ';

const kinveyAppDataUrl = 'https://baas.kinvey.com/appdata/kid_HJD_8Q9Al';
const kinveyRegisterUserUrl = 'https://baas.kinvey.com/user/kid_HJD_8Q9Al';

const kinveyUsersProfileColleciton = '/usersProfile';

export { kinveyKey, kinveySecret, kinveyBasicHeaders, guestUserAuthToken, kinveyHeaderKey, kinveyUserAuthorization, 
    kinveyAppDataUrl, kinveyRegisterUserUrl, kinveyUsersProfileColleciton };
