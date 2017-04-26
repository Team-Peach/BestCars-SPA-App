class Truck extends Vehicle {
    constructor(manufacturer, model, year, kilometers,price, type, numberOfWheels) {
        super(manufacturer, model, year, kilometers, price, type);

        this.numberOfWheels = numberOfWheels;
    }
}