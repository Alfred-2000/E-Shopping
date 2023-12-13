
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const UUID = require('uuid').v4;
const User = require('../models/userModel');
const {hashPassword, verifyJWT} = require('./authenticationMiddleware');
const {JWT_SECRECT_KEY} = require('../constants');


const userLogin = async (request, response) => {
    const {username, password} = request.body;
    try{
        const user = await User.findOne({username:username});
        console.log(user);
        if (!user){
            error_response = {"error": "USER_DOESNT_EXIST"}
            response.status(404).json(error_response)
        }
        else{
            const user_data = await User.findOne({username: username});
            const request_password = hashPassword(username+password);
            if (user_data.password == request_password){
                admin_token_details = {
                    "id": user_data._id,
                    "username": user_data.username,
                    "email": user_data.email,
                    "is_superuser": user_data.is_superuser
                }
                expiry_details = {
                    "expiresIn": '15m',
                }
                const jwt_token = jwt.sign(admin_token_details, JWT_SECRECT_KEY, expiry_details);
                success_response = {"msg": "USER_LOGGED_IN_SUCCESSFULLY", "data": []}
                response.set("Authorization", jwt_token)
                response.json(success_response)
            }
            else{
                error_response = {"error": "INVALID_CREDENTIALS"}
                response.status(401).json(error_response)
            }
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const listAccounts = async (request, response) => {
    try{
        const users = await User.find({is_superuser: false});
        success_response = {"msg": "ACCOUNTS_LISTED_SUCCESSFULLY", "data": users}
        response.json(success_response)
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const retrieveAccount = async (request, response) => {
    const userId = request.params.id;
    try{
        const userRetrieve = await User.findById(userId);
        if(userRetrieve){
            success_response = {"msg": "ACCOUNTS_RETRIEVED_SUCCESSFULLY", "data": userRetrieve}
            response.json(success_response)
        }
        else{
            error_response = {"_id": userId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }

}


const registerAccount = async (request, response) => {
    const {username, password, email, phone_number} = request.body;
    request.body._id = UUID();
    request.body.password = hashPassword(username+password);
    try{
        const checkUserExist = await User.findOne({username: username});
        const checkEmailExist = await User.findOne({email: email});
        const checkPhonenumberExist = await User.findOne({phone_number: phone_number});
        if(checkUserExist || checkEmailExist || checkPhonenumberExist){
            response_data = {"msg": "USER_ALREADY_EXIST_PLEASE_LOGIN"} 
            response.json(response_data);
        }
        else{
            const user = await new User(request.body).save()
            response_data = {"msg": "ACCOUNT_REGISTERED_SUCCESSFULLY", "data": user} 
            response.status(201).json(response_data);
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const updateAccount = async (request, response) => {
    const userId = request.params.id;
    const request_data = request.body;
    request_data.updated_at = new Date;
    try{
        const updateUser = await User.findOneAndUpdate(
            {"_id": userId},
            {"$set": request_data},
            {"new": true}
        );
        if(updateUser){
            response_data = {"msg": "USER_UPDATED_SUCCSSFULLY", "data": updateUser}
            response.json(response_data)
        }
        else{
            error_response = {"_id": userId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }

}


const deleteAccount = async (request, response) => {
    const userId = request.params.id;
    try{
        const user = await User.deleteOne({_id: userId});
        if(user.deletedCount != 0){
            success_response = {"msg": "ACCOUNT_DELETED_SUCCESSFULLY", "data": user}
            response.json(success_response)
        }
        else{
            error_response = {"_id": userId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const deleteMultipleAccounts = async (request, response) => {
    const userIds = request.body.user_ids
    try{
        const users = await User.deleteMany({_id: {"$in": userIds}})
        if(users.deletedCount != 0){
            success_response = {"msg": "ACCOUNTS_DELETED_SUCCESSFULLY", "data": users}
            response.json(success_response)
        }
        else{
            error_response = {"_id": userIds, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


module.exports = {
    userLogin, listAccounts, retrieveAccount,
    registerAccount, updateAccount, deleteAccount,
    deleteMultipleAccounts,
};