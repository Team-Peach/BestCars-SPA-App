class Advertisement {
    constructor(typeOfVehicle, title, vehicle, date, images, description, town, nameForContacts, eMail, gsm) {
        this.typeOfVehicle = typeOfVehicle;
        this.title = title;
        this.vehicle = vehicle;
        this.date = date;
        this.images = images;
        this.description = description;
        this.town = town;
        this.nameForContacts = nameForContacts;
        this.eMail = eMail;
        this.gsm = gsm;
    }

    get typeOfVehicle() {
        return this._typeOfVehicle;
    }
    set typeOfVehicle(value) {
        this._typeOfVehicle = value;
    }

    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }

    get vehicle() {
        return this._vehicle;
    }
    set vehicle(value) {
        this._vehicle = value;
    }

   get date() {
        return this._date;
    }
    set date(value) {
        this._date = value;
    }

   get images() {
        return this._images;
    }
    set images(value) {
        this._images = value;
    }

    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }

    get town() {
        return this._town;
    }
    set town(value) {
        this._town = value;
    }

    get nameForContacts() {
        return this._nameForContacts;
    }
    set nameForContacts(value) {
        this._nameForContacts = value;
    }

    get eMail() {
        return this._eMail;
    }
    set eMail(value) {
        this._eMail = value;
    }

    get gsm() {
        return this._gsm;
    }
    set gsm(value) {
        this._gsm = value;
    }
}

export { Advertisement };