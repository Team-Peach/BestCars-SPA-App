import { Vehicle } from "Vehicle";

class Motorcycle extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);
        
        this._type = type;
    }
}

export { Motorcycle };