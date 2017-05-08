import { Vehicle } from "vehicle";

class Motorcycle extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this._type = type;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
}

export { Motorcycle };