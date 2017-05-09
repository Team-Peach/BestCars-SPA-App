/* globals beforeEach, afterEach, sinon, mocha, chai, describe, it  */
import * as requester from 'requester';
import * as data from 'data';
import { User } from 'user';
import { Car } from 'car';
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
                "authkey": "authkey123"
            }

            requesterPostStub.returns(Promise.resolve(response));

            data.registerUser(user, password)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).username;
                    expect(responseUsername).to.equal(user.username);
                })
                .then(done, done);
        })
    })

    // login

    describe('Data.js loginUser', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('(6) expect loginUser to call post function from requester once', (done) => {
            let user = { 'username': "user", 'password': "123456" };

            requesterPostStub.returns(Promise.resolve());

            data.loginUser(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(7) expect loginUser to call post function with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let url = CONSTANTS.kinveyRegisterUserUrl + '/login'
            let user = { 'username': "user", 'password': "123456" };

            data.loginUser(user)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        it('(8) expect loginUser to call post function from requester with correct user data(username)', (done) => {

            let url = CONSTANTS.kinveyRegisterUserUrl + '/login'
            let user = { 'username': "user", 'password': "123456" };
            let response = { 'username': "user", 'authkey': "authkey123" };
            requesterPostStub.returns(Promise.resolve(response));

            data.loginUser(user)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).username;
                    expect(responseUsername).to.equal(user.username);
                })
                .then(done, done);
        })

        it('(9) expect loginUser to call post function from requester with correct user data(password)', (done) => {

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

        it('(10) expect logoutUser to call post function from requester once', (done) => {

            requesterPostStub.returns(Promise.resolve());

            data.logoutUser()
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(11) expect logoutUser to call post function with correct url', (done) => {
            let url = CONSTANTS.kinveyRegisterUserUrl + '/_logout';
            requesterPostStub.returns(Promise.resolve());

            data.logoutUser()
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })
    })

    //getVehicles
    describe('Data.js getVehicles', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'get');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('(12) expect getVehicles to call post function from requester once', (done) => {
            let collection = '/cars';
            requesterPostStub.returns(Promise.resolve());

            data.getVehicles(collection)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(13) expect getVehicles to call post function with correct url', (done) => {
            let collection = '/cars';
            let url = CONSTANTS.kinveyAppDataUrl + '/' + collection + '/' + '?query={}&sort={"_kmd": -1}';
            requesterPostStub.returns(Promise.resolve());

            data.getVehicles(collection)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })
    })
    // getMyAds

    describe('Data.js getMyAds', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'get');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        it('(14) expect getMyAds to call post function from requester once', (done) => {
            let creatorId = 'authorId';
            let collection = '/cars';
            let authtoken = "auth123";
            requesterPostStub.returns(Promise.resolve());

            data.getMyAds(creatorId, collection, authtoken)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(15) expect getMyAds to call post function with correct url', (done) => {
            let creatorId = 'authorId';
            let collection = '/cars';
            let authtoken = "auth123";
            let url = CONSTANTS.kinveyAppDataUrl + '/' + collection + '/' + '?query={"_acl.creator":"' + creatorId + '"}';
            requesterPostStub.returns(Promise.resolve());

            data.getMyAds(creatorId, collection, authtoken)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })
    })

    //createAd
    describe('Data,js - createAd', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'post');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        // with instance of new Car
        it('(16) expect createAd to call post function from requester once', (done) => {
            requesterPostStub.returns(Promise.resolve());
            let carStub = sinon.createStubInstance(Car);
            let authtoken = 'authtoken123';
            let type = 'cars';
            data.createAd(carStub, authtoken, type)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(17) expect createAd to call post function with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let carStub = sinon.createStubInstance(Car);
            let authtoken = 'authtoken123';
            let type = 'cars';
            let url = CONSTANTS.kinveyAppDataUrl + '/' + type;

            data.createAd(carStub, authtoken, type)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        // with  object car with correct properties
        it('(18) expect createAd to call post function from requester once', (done) => {
            //currentVehicle = factory.createCar(valuesFromForm.manufacturer, valuesFromForm.model, valuesFromForm.year, valuesFromForm.kilometers, valuesFromForm.price, valuesFromForm.fuel, valuesFromForm.transmission, valuesFromForm.horsepower, valuesFromForm.type, valuesFromForm.numberOfDoors, valuesFromForm.numberOfSeats);
            requesterPostStub.returns(Promise.resolve());
            let authtoken = 'authtoken123';
            let type = 'cars';

            let car = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }
            data.createAd(car, authtoken, type)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(19) expect createAd to make a POST request with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let authtoken = 'authtoken123';
            let type = 'cars';
            let url = CONSTANTS.kinveyAppDataUrl + '/' + type;

            let car = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }
            data.createAd(car, authtoken, type)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        it('(20) expect createAd to call post function from requester with correct car data(manufacturer)', (done) => {

            let authtoken = 'authtoken123';
            let type = 'cars';
            let url = CONSTANTS.kinveyAppDataUrl + '/' + type;

            let car = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }

            let response = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }

            requesterPostStub.returns(Promise.resolve(response));
            data.createAd(car, authtoken, type)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).manufacturer;
                    expect(responseUsername).to.equal(car.manufacturer);
                })
                .then(done, done);
        })

        it('(21) expect createAd to call post function from requester with correct car data(model)', (done) => {

            let authtoken = 'authtoken123';
            let type = 'cars';
            let url = CONSTANTS.kinveyAppDataUrl + '/' + type;

            let car = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }

            let response = {
                'manufacturer': "BMW",
                'model': 'X5',
                'year': '2006',
                'kilometers': '80000',
                'price': '20000',
                'fuel': 'Diesel',
                'transmission': 'Manual',
                'horsepower': '200',
                'type': 'type',
                'numberOfDoors': '5',
                'numberOfSeats': '5'
            }

            requesterPostStub.returns(Promise.resolve(response));
            data.createAd(car, authtoken, type)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).model;
                    expect(responseUsername).to.equal(car.model);
                })
                .then(done, done);
        })
    })
    // addUserProfileImage

    describe('Data,js - addUserProfileImage', () => {
        let requesterPostStub;
        beforeEach(() => {
            requesterPostStub = sinon.stub(requester, 'put');
        });
        afterEach(() => {
            requesterPostStub.restore();
        });

        // with  object user with correct property image
        it('(22) expect addUserProfileImage to call put function from requester once', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let user = {
                'username': 'user',
                'image': 'image'
            };

            let profileId = "profileId123"
            let authtoken = 'authtoken123';

            data.addUserProfileImage(user, profileId, authtoken)
                .then(() => {
                    expect(requesterPostStub).to.have.been.called.once;
                })
                .then(done, done);
        })

        it('(23) expect addUserProfileImage to make a put request with correct url', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let user = {
                'username': 'user',
                'image': 'image'
            };

            let response = {
                'username': 'user',
                'image': 'image'
            }

            let profileId = "profileId123"
            let authtoken = 'authtoken123';
            let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection + '/' + profileId;

            requesterPostStub.returns(Promise.resolve(response));
            data.addUserProfileImage(user, profileId, authtoken)
                .then(() => {
                    expect(requesterPostStub).to.have.been.calledWith(url);
                })
                .then(done, done);
        })

        it('(24) expect addUserProfileImage to call post function from requester with correct user data(image)', (done) => {

            requesterPostStub.returns(Promise.resolve());
            let user = {
                'username': 'user',
                'image': 'image'
            };

            let response = {
                'username': 'user',
                'image': 'image'
            }

            let profileId = "profileId123"
            let authtoken = 'authtoken123';
            let url = CONSTANTS.kinveyAppDataUrl + CONSTANTS.kinveyUsersProfileCollection + '/' + profileId;

            requesterPostStub.returns(Promise.resolve(response));
            data.addUserProfileImage(user, profileId, authtoken)
                .then(() => {
                    let responseUsername = JSON.parse(requesterPostStub.args[0][1]).image;
                    expect(responseUsername).to.equal(user.image);
                })
                .then(done, done);
        })
    })
});


mocha.run();
