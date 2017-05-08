import { Vehicle } from "vehicle";

class Camper extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfSleepingPlaces) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this.type = type;
        this.numberOfSleepingPlaces = numberOfSleepingPlaces;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }

    get numberOfSleepingPlaces() {
        return this._numberOfSleepingPlaces;
    }
    set numberOfSleepingPlaces(value) {
        this._numberOfSleepingPlaces = value;
    }
}

export { Camper };