import * as registerValidator from 'registerValidator';

class User {
    constructor(firstName, lastName, username, email, phoneNumber, country, town) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.town = town;
        this.image = '';
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        registerValidator.validateFirstName(value);
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        registerValidator.validateLastName(value);
        this._lastName = value;
    }

    get username() {
        return this._username;
    }
    set username(value) {
        registerValidator.validateUsername(value);
        this._username = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        registerValidator.validateEmail(value);
        this._email = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        registerValidator.validatePhoneNumber(value);
        this._phoneNumber = value;
    }

    get country() {
        return this._country;
    }
    set country(value) {
        registerValidator.validateCountry(value);
        this._country = value;
    }

    get town() {
        return this._town;
    }
    set town(value) {
        registerValidator.validateTown(value);
        this._town = value;
    }

    get image() {
        return this._image;
    }
    set image(value) {
        this._image = value;
    }
}

export { User };