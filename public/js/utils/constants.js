const kinveyKey = 'kid_HJD_8Q9Al';
const kinveySecret = '94fdd0928a1c4e9e9ec4d17475916971';
const kinveyBasicHeaders = { 'Authorization': 'Basic ' + btoa(kinveyKey + ':' + kinveySecret) };
const guestUserAuthToken = '20081561-f1aa-4f31-a9f4-b2d3f94a2763.TlgKz+NmOZDOyQfqIB7p8jFwnFdsn68dHd2ponQsLAo=';
const kinveyHeaderKey = 'Authorization';
const kinveyUserAuthorization = 'Kinvey ';

const kinveyAppDataUrl = 'https://baas.kinvey.com/appdata/kid_HJD_8Q9Al';

const kinveyUsersProfileCollection = '/usersProfile';

export { kinveyKey, kinveySecret, kinveyBasicHeaders, guestUserAuthToken, kinveyHeaderKey, kinveyUserAuthorization, 
    kinveyAppDataUrl, kinveyUsersProfileCollection };
