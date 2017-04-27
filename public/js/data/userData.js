import * as CONSTANTS from 'constants';
import * as requester from 'requester';
import User from 'user';
//TODO abstraction
export function registerUser(newUser) {
    let promise = new Promise(function(resolve, reject) {
       //requester.get(CONSTANTS.kinveyAppDataUrl, {}, CONSTANTS.kinveyBasicHeaders);
        let url = CONSTANTS.kinveyRegisterUserUrl;
        let headers =  CONSTANTS.kinveyBasicHeaders;
        let body = {"username": newUser.username, "password": newUser.password }; 
        $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err){
                    reject(err);
                }
        });
      
    });
    return promise;
}

export function loginUser(user) {
    let promise = new Promise(function(resolve, reject) {
       //requester.get(CONSTANTS.kinveyAppDataUrl, {}, CONSTANTS.kinveyBasicHeaders);
        let url = CONSTANTS.kinveyRegisterUserUrl + '/login';
        let headers =  CONSTANTS.kinveyBasicHeaders;
        let body = {"username": user.username, "password": user.password }; 
        $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(body),
                success(response) {
                    resolve(response);
                },
                error(err){
                    reject(err);
                }
        });      
    });
    return promise;
}

export function logoutUser(authtoken) {
    let promise = new Promise(function(resolve, reject) {
       //requester.get(CONSTANTS.kinveyAppDataUrl, {}, CONSTANTS.kinveyBasicHeaders);
        let url = CONSTANTS.kinveyRegisterUserUrl + '/_logout';
        let headers =  { 'Authorization': CONSTANTS.kinveyUserAuthorization + authtoken};
        $.ajax({
                url: url,
                headers: headers,
                method: "POST",
                contentType: "application/json",
                success(response) {
                    resolve(response);
                },
                error(err){
                    reject(err);
                }
        });   
    });
    return promise;  
}