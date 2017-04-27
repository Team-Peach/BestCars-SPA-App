const kinveyKey = 'kid_HJD_8Q9Al';
const kinveySecret = '422a08d12f0d4707a0e24f89daf31e90';
const kinveyBasicHeaders = { 'Authorization': "Basic " + btoa(kinveyKey + ":" + kinveySecret)};
const guestUserAuthToken = '20081561-f1aa-4f31-a9f4-b2d3f94a2763.TlgKz+NmOZDOyQfqIB7p8jFwnFdsn68dHd2ponQsLAo=';
const kinveyHeaderKey = 'Authorization';
const kinveyUserAuthorization = 'Kinvey ';

const kinveyAppDataUrl = 'https://baas.kinvey.com/appdata/kid_HJD_8Q9Al';
const kinveyRegisterUserUrl = 'https://baas.kinvey.com/user/kid_HJD_8Q9Al';

const kinveyUsersProfileColleciton = '/usersProfile';

export { kinveyKey, kinveySecret, kinveyBasicHeaders, guestUserAuthToken, kinveyHeaderKey, kinveyUserAuthorization, 
    kinveyAppDataUrl, kinveyRegisterUserUrl, kinveyUsersProfileColleciton };
