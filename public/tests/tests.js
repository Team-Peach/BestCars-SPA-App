/* globals mocha, chai, describe, it  */
import * as requester from 'requester';
import * as data from 'data';
import { User } from 'user';

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
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('expect register User to call post function from requester once', (done) => {
            requesterPostStub.returns(Promise.resolve());
            let userStub = sinon.stub(User, 'constructor');
            let password = '123456';
            data.registerUser(userStub, password)
            .then(() => {
                expect(requesterPostStub).to.have.been.called.once;
            })
            .then(done, done);
        })
    })
    /*
    it('Test 1 - adForHome function should be invoke once with valid parameters', () => {
        let vehicleType = 'cars';

    });
    */
});



mocha.run();
