/* globals $ */

export function validateTitle(value) {
    let titleField = $('#create-ad-title');
    var titleRegex = /^[a-zA-Z0-9\-. ]+$/;
    validateString(value, 3, 15, titleField);
    validateWithRegex(value, titleRegex, 'Only A-Z, a-z, 0-9 . and -', titleField);
}

export function validateDescription(value) {
    let descriptionField = $('#create-ad-description');
    validateString(value, 5, 150, descriptionField);
}

export function validateTown(value) {
    let townField = $('#create-ad-town');
    let townRegex = /^[A-Za-z0-9. ]+$/;
    validateString(value, 3, 15, townField);
    validateWithRegex(value, townRegex, 'Only latin characters and digits!', townField);
}

export function validateNameForContacts(value) {
    let nameForContactsField = $('#create-ad-nameForContacts');
    let stringRegex = /^[A-Za-z ]+$/;
    validateString(value, 3, 15, nameForContactsField);
    validateWithRegex(value, stringRegex, 'Only latin characters!', nameForContactsField);
}

export function validateEmail(value) {
    let eMailField = $('#create-ad-eMail');
    let emailRegex = /^\w+@[a-zA-Z.]+$/;
    validateWithRegex(value, emailRegex, 'Invalid e-mail!', eMailField);
}

export function validateGSM(value) {
    let gsmField = $('#create-ad-gsm');
    let gsmRegex = /^[0-9\+ ]+$/;
    validateString(value, 3, 15, gsmField);
    validateWithRegex(value, gsmRegex, 'Only latin characters!', gsmField);
}

// vehicle validations
export function validateModel(value) {
    let modelField = $('#create-ad-model');
    let stringRegex = /^[A-Za-z0-9. ]+$/;
    validateString(value, 1, 15, modelField);
    validateWithRegex(value, stringRegex, 'Only latin characters and digits!', modelField);
}

export function validateYear(value) {
    let yearField = $('#create-ad-year');
    let digitRegex = /^[0-9\+]+$/;
    validateWithRegex(value, digitRegex, 'Only digits!', yearField);
}

export function validateKilometers(value) {
    let kilometersField = $('#create-ad-kilometers');
    let digitRegex = /^[0-9\+]+$/;
    validateWithRegex(value, digitRegex, 'Only digits!', kilometersField);
}

export function validateHorsepower(value) {
    let horsepowersField = $('#create-ad-horsepower');
    let digitRegex = /^[0-9\+]+$/;
    validateWithRegex(value, digitRegex, 'Only digits!', horsepowersField);
}

export function validatePrice(value) {
    let priceField = $('#create-ad-price');
    let digitRegex = /^[0-9\+]+$/;
    validateWithRegex(value, digitRegex, 'Only digits!', priceField);
}

function validateString(value, minLength, maxLength, field) {
    if (value.length < minLength || value.length > maxLength) {
        let errMessage = `Between ${minLength} and ${maxLength} characters`;
        field.addClass('errorInput').val('').attr('placeholder', errMessage);
        throw new Error(errMessage);
    }
}

function validateWithRegex(value, regex, errMessage, field) {
    if (!regex.test(value)) {
        field.addClass('errorInput').val('').attr('placeholder', errMessage);
        throw new Error(errMessage);
    }
}
