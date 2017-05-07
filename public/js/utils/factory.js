import { User } from 'user';
import { Advertisement } from 'advertisement';
import { Car } from 'car';
import { Motorcycle } from 'motorcycle';
import { Truck } from 'truck';
import { Camper } from 'camper';
import { Comment } from 'comment';

export function createUser(firstName, lastName, username,  email, phoneNumber, country, town){
	return new User(firstName, lastName, username, email, phoneNumber, country, town);
}

export function createAdvertisement(title, vehicle, date, images, description, town, nameForContacts, eMail , gsm){
	return new Advertisement(title, vehicle, date, images, description, town, nameForContacts, eMail , gsm);
}

export function createCar(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfDoors, numberOfSeats){
	return new Car(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfDoors, numberOfSeats);
}

export function createMotorcycle(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type){
	return new Motorcycle(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type);
}

export function createTruck(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, maxLoadCapacity, numberOfWheels){
	return new Truck(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, maxLoadCapacity, numberOfWheels);
}

export function createCamper(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfSleepingPlaces){
	return new Camper(manufacturer, model, year, kilometers, price, fuel, transmission, horsepower, type, numberOfSleepingPlaces);
}

export function createComment(adId, content, author){
	return new Comment(adId, content, author);
}