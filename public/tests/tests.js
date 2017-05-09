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

        it('(.....) expect register User to call post function from requester once', (done) => {

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
    })  

});



mocha.run();
