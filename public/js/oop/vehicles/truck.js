import { Vehicle } from "vehicle";

class Truck extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, maxLoadCapacity, numberOfWheels) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);
        
        this._type = type;
        this._maxLoadCapacity = maxLoadCapacity;
        this.numberOfWheels = numberOfWheels;
    }
}

export { Truck };
