class Camper extends Vehicle {
    constructor(manufacturer, model, year, kilometers, price, type, color) {
        super(manufacturer, model, year, kilometers, price, type);

        this.color = color;
    }
}