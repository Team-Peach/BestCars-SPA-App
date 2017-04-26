class User {
    constructor(firstName, lastName, username, password, email, phoneNumber, country, town) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._username = username;
        this._password = password;
        this._email = email;
        this._phoneNumber = phoneNumber;
        this._country = country;
        this._town = town;
        this.adds = [];
    }

    get firstName() {
        return this._firstName;
    }
    set firstName(value) {
        if (value.length < 3 || value.length > 20) {
            throw new TypeError("First name must be between 3 and 20 characters long");
        }
        let firstNameRegex = /^[A-Za-z]+$/;
        if (!firstNameRegex.test(value)) {
            throw new TypeError("First name must contain only Latin characters");
        }

        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }
    set lastName(value) {
        if (value.length < 3 || value.length > 20) {
            throw new TypeError("Last name must be between 3 and 20 characters long");
        }
        let lastNameRegex = /^[A-Za-z]+$/;
        if (!lastNameRegex.test(value)) {
            throw new TypeError("Last name must contain only Latin characters");
        }

        this._lastName = value;
    }

    get username() {
        return this._username;
    }
    set username(value) {
        this._username = value;
    }

    get password() {
        return this._password;
    }
    set password(value) {
        this._password = value;
    }

    get email() {
        return this._email;
    }
    set email(value) {
        let emailRegex = /^\w+@[a-zA-Z.]+$/;
        if (!emailRegex.test(value)) {
            throw new TypeError("Invalid e-mail");
        }

        this._email = value;
    }

    get phoneNumber() {
        return this._phoneNumber;
    }
    set phoneNumber(value) {
        this._phoneNumber = value;
    }

    get country() {
        return this._phoneNumber;
    }
    set country(value) {
        this._country = value;
    }

    get town() {
        return this._town;
    }
    set town(value) {
        this._town = value;
    }

    get adds() {
        return this.adds;
    }
    set adds(value) {
        this.adds = value;
    }
}

export { User };