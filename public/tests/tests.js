/* globals beforeEach, afterEach, sinon, mocha, chai, describe, it  */
import * as requester from 'requester';
import * as data from 'data';
import { User } from 'user';
import * as CONSTANTS from 'constants';

mocha.setup('bdd');
let expect = chai.expect;

const SESSION_STORAGE_USERNAME_KEY = 'username',
    SESSION_STORAGE_AUTHTOKEN_KEY = 'authtoken',
    SESSION_STORAGE_USERID_KEY = 'id';

const clearSessionStorage = () => {
    localStorage.removeItem(SESSION_STORAGE_USERNAME_KEY);
    localStorage.removeItem(SESSION_STORAGE_AUTHTOKEN_KEY);
    localStorage.removeItem(SESSION_STORAGE_USERID_KEY);
};

beforeEach(clearSessionStorage);
afterEach(clearSessionStorage);

//data tests
describe('Data Tests', () => {

    // registerUser tests
    describe('Data,js - registerUser', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        // with instance of new User
        it('(1) expect registerUser to call post function from requester once', (done) => {
            requesterPostStub.returns(Promise.resolve());
            let userStub = sinon.createStubInstance(User);
            let password = '123456';
            data.registerUser(userStub, password)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(2) expect registerUser to call post function with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let url = CONSTANTS.kinveyRegisterUserUrl;
            let userStub = sinon.createStubInstance(User);
            let password = '123456';
            data.registerUser(userStub, password)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        // with  object user with property username
        it('(3) expect registerUser to call post function from requester once', (done) => {
            requesterPostStub.returns(Promise.resolve());

            let user = {
                "username": "user"
            }

            let password = '123456';
            data.registerUser(user, password)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(4) expect registerUser to make a POST request with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let url = CONSTANTS.kinveyRegisterUserUrl;
            let user = {
                "username": "user"
            }

            let password = '123456';
            data.registerUser(user, password)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        it('(5) expect registerUser to call post function from requester with correct user data(username)', (done) => {

            let url = CONSTANTS.kinveyRegisterUserUrl;
            let user = {
                "username": "user"
            }
            let password = '123456';
            let response = {
                "username": "user", 
                "password": "123456"
            }

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(user, password)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).username;
                    expect(responseUsername).to.equal(user.username);
                })
                .then(done, done);
        })

        it('(6) expect registerUser to call post function from requester with correct user data(password)', (done) => {

            let url = CONSTANTS.kinveyRegisterUserUrl;
            let user = {
                "username": "user"
            }
            let password = '123456';
            let response = {
                "username": "user", 
                "password": "123456"
            }

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(user, password)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).password;
                    console.log(response)
                    expect(responseUsername).to.equal(password);
                })
                .then(done, done);
        })     
    })

    // TODO login

        describe('Data.js loginUser', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('(7) expect loginUser to call post function from requester once', (done) => {
            let user = { 'username': "user", 'password': "123456" };
            
            requesterPostStub.returns(Promise.resolve());
 
            data.loginUser(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(8) expect loginUser to call post function with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let url = CONSTANTS.kinveyRegisterUserUrl + '/login'
            let user = { 'username': "user", 'password': "123456" };
  
            data.loginUser(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        it('(9) expect loginUser to call post function from requester with correct user data(username)', (done) => {

            requesterPostStub.returns(Promise.resolve());

            let url = CONSTANTS.kinveyRegisterUserUrl + '/login'
            let user = { 'username': "user", 'password': "123456" };

            data.loginUser(user)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).username;
                    expect(responseUsername).to.equal(user.username);
                })
                .then(done, done);
        })

        it('(10) expect loginUser to call post function from requester with correct user data(password)', (done) => {

            requesterPostStub.returns(Promise.resolve());

            let url = CONSTANTS.kinveyRegisterUserUrl + '/login'
            let user = { 'username': "user", 'password': "123456" };

            data.loginUser(user)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).password;
                    expect(responseUsername).to.equal(user.password);
                })
                .then(done, done);
        })     
    })

    //logout function

    describe('Data.js logoutUser', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('(11) expect logoutUser to call post function from requester once', (done) => {
            
            requesterPostStub.returns(Promise.resolve());
 
            data.logoutUser()
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(12) expect logoutUser to call post function with correct url', (done) => {
            let url = CONSTANTS.kinveyRegisterUserUrl + '/_logout';
            requesterPostStub.returns(Promise.resolve());
  
            data.logoutUser()
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        }) 
    })



//TOD0 deleteVehicle 

// TODO getVehicles

//getMyAds
// getUserProfileByAd

//createAd

// add UserProfileImage
});





// vehicle controller 
describe('Vehicle controller tests', () => {
    describe('Data register new user', () => {

    });
});



mocha.run();
