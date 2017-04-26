import { Vehicle } from "Vehicle";

class Car extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfDoors, numberOfSeats, color) {
        super(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower);

        this._type = type;
        this._numberOfDoors = numberOfDoors;
        this._numberOfSeats = numberOfSeats;
        this._color = color;
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
        this._kilometers = value;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }
    get engine() {
        return this._engine;
    }

    set engine(value) {
        this._engine = value;
    }
}

export { Car };