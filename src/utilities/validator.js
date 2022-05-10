const { estimatedDocumentCount } = require("../models/userModel");

const ObjectId = require("mongoose").Types.ObjectId

let isValidRequestBody = function (body) {
    if (Object.keys(body).length === 0) return false;
    return true;
}

let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

let isValidObjectId = function (objectId) {
    if (!ObjectId.isValid(objectId)) return false;
    return true;
}

let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return emailRegex.test(email)
}

let isValidMobile = function (number) {
    let mobileRegex = /^\d{10}$/;
    return mobileRegex.test(number);
}


let isValidName=function(name){
let nameRegex=/^[A-Za-z\s]{1,}[A-Za-z\s]{0,}$/;
return nameRegex.test(name);
}

let isValidPassword=function(password){
    let regexPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    return regexPassword.test(password);
}

let isValidEnum= function(value){
    let title=["Mr", "Mrs","Miss"];
  return  title.indexOf(value) !== -1;
}
let isValidISBN=function(value){
    let isbnRegex=/(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/
    return isbnRegex.test(value);
}
function isValidDate(value) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    return regEx.test(value);
  }
  


module.exports = { isValidRequestBody,isValidDate,isValidISBN, isValid, isValidObjectId, isValidEmail, isValidMobile, isValidName, isValidPassword, isValidEnum }