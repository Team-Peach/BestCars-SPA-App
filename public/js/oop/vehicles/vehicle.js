class Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower) {
        this._manufacturer = manufacturer;
        this._model = model;
        this._year = year;
        this._kilometers = kilometers;
        this._price = price;
        this._fuel = fuel;
        this._transmission = transmission;
        this._horsepower = horsepower;
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
        this._kilometers = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
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
        this._horsepower = value;
    }
}

export { Vehicle };