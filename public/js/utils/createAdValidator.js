/* globals $ */

export function validateTitle(value) {
    let townField = $('#title');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateDescription(value) {
    let townField = $('#create-ad-description');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateTown(value) {
    let townField = $('#create-ad-town');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateEmail(value) {
    let townField = $('#create-ad-eMail');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateGSM(value) {
    let townField = $('#create-ad-gsm');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateManufacturer(value) {
    let townField = $('#create-ad-manufacturer');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateModel(value) {
    let townField = $('#create-ad-model');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateYear(value) {
    let townField = $('#create-ad-year');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateKilometers(value) {
    let townField = $('#create-ad-kilometers');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validateHorsepower(value) {
    let townField = $('#create-ad-horsepower');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}

export function validatePrice(value) {
    let townField = $('#create-ad-price');
    let stringRegex = /^[A-Za-z]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', townField);
}



function validateString(value, minLength, maxLength, field) {
    if (value.length < minLength || value.length > maxLength) {
        console.log(field);
        let errMessage = `Between ${minLength} and ${maxLength} characters`;
        field.addClass('errorInput').val('').attr('placeholder', errMessage);
        console.log(field);
        
        throw new Error(errMessage);
    }
}

function validateWithRegex(value, regex, errMessage, field) {
    if (!regex.test(value)) {
        field.addClass('errorInput').val('').attr('placeholder', errMessage);
        throw new Error(errMessage);
    }
}
