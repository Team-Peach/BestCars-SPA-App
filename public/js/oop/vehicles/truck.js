import { Vehicle } from "vehicle";

class Truck extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, maxLoadCapacity, numberOfWheels) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this._type = type;
        this._maxLoadCapacity = maxLoadCapacity;
        this._numberOfWheels = numberOfWheels;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }

    get maxLoadCapacity() {
        return this._maxLoadCapacity;
    }
    set maxLoadCapacity(value) {
        this._maxLoadCapacity = value;
    }

    get numberOfWheels() {
        return this._numberOfWheels;
    }
    set numberOfWheels(value) {
        this._numberOfWheels = value;
    }
}

export { Truck };
