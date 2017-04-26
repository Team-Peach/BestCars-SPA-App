class Vehicle {
    constructor(manufacturer, model, year, kilometers, price, type) {
        this._manufacturer = manufacturer;
        this._model = model;
        this._year = year;
        this._price = price;
        this._kilometers = kilometers;
        this._type = type;
        this._comments = [];

    }

    get manufacturer() {
    return this._manufacturer;
    }

    set manufacturer(value) {
        this._manufacturer = value;
    }

    get model() {
        return this._model;
    }

    set model(value) {
        this._model = value;
    }

    get year() {
        return this._year;
    }

    set year(value) {
        this._year = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get kilometers() {
        return this._kilometers;
    }

    set kilometers(value) {
        this._kilometers = kilometers;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}