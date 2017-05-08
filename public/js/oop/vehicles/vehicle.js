import * as createAdValidator from 'createAdValidator';

class Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower) {
        this.manufacturer = manufacturer;
        this.model = model;
        this.year = year;
        this.kilometers = kilometers;
        this.price = price;
        this.fuel = fuel;
        this.transmission = transmission;
        this.horsepower = horsepower;
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
        createAdValidator.validateModel(value);
        this._model = value;
    }

    get year() {
        return this._year;
    }
    set year(value) {
        createAdValidator.validateYear(value);
        this._year = value;
    }

    get kilometers() {
        return this._kilometers;
    }
    set kilometers(value) {
        createAdValidator.validateKilometers(value);
        this._kilometers = value;
    }

    get price() {
        return this._price;
    }
    set price(value) {
        createAdValidator.validatePrice(value);
        this._price = value;
    }

    get fuel() {
        return this._fuel;
    }
    set fuel(value) {
        this._fuel = value;
    }

    get transmission() {
        return this._transmission;
    }
    set transmission(value) {
        this._transmission = value;
    }

    get horsepower() {
        return this._horsepower;
    }
    set horsepower(value) {
        createAdValidator.validateHorsepower(value);
        this._horsepower = value;
    }
}

export { Vehicle };