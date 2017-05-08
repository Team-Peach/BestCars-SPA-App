import { Vehicle } from "vehicle";

class Car extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfDoors, numberOfSeats) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this.type = type;
        this.numberOfDoors = numberOfDoors;
        this.numberOfSeats = numberOfSeats;
    }

    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }

    get numberOfDoors() {
        return this._numberOfDoors;
    }
    set numberOfDoors(value) {
        this._numberOfDoors = value;
    }

    get numberOfSeats() {
        return this._numberOfSeats;
    }
    set numberOfSeats(value) {
        this._numberOfSeats = value;
    }
}

export { Car };