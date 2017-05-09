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
    describe('Data register new user', () => {
        let sandbox;
        let requesterPostStub;
        beforeEach(() => {
            sandbox = sinon.sandbox.create();
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            sandbox.restore();
            requesterPostStub.restore();
        });

        // with instance of new User
        it('(1) expect register User to call post function from requester once', (done) => {
            requesterPostStub.returns(Promise.resolve());
            let userStub = sinon.createStubInstance(User);
            let password = '123456';
            data.registerUser(userStub, password)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(2) expect register User to call post function with correct url', (done) => {

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
        it('(3) expect register User to make a POST request to kinvey url', (done) => {
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

        it('(4) expect register User to call post function from requester once', (done) => {

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

        it('(5) expect register User to call post function from requester with correct user data(username)', (done) => {

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

        it('(6) expect register User to call post function from requester with correct user data(password)', (done) => {

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



});



mocha.run();
