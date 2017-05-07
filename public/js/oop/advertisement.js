class Advertisement {
    constructor(title, vehicle, date, images, description, town, nameForContacts, eMail , gsm) {
        this._title = title;
        this._vehicle = vehicle;
        this._date = date;
        this._images = images;
        this._description = description;
        this._town = town;
        this._nameForContacts = nameForContacts;
        this._eMail = eMail;
        this._gsm = gsm;
    }

     get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }
}

export { Advertisement };