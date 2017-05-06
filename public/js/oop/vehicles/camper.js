import { Vehicle } from "Vehicle";

class Camper extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfSleepingPlaces) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this._type = type;
        this._numberOfSleepingPlaces = numberOfSleepingPlaces;
    }
}

export { Camper };