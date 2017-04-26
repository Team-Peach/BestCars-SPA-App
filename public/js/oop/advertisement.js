class Advertisement {
    constructor(title, userId, vehicle, date, images, description, contacts) {
        this._title = title;
        this._userId = userId;
        this._vehicle = vehicle;
        this._date = date;
        this._images = images;
        this._description = description;
        this._contacts = contacts;
    }

     get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }
}

export { Advertisement };