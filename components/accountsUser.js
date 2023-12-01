
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

const listAccounts = async (request, response) => {
    console.log(request.originalUrl);
    try{
        const users = await User.find({is_superuser:false});
        success_response = {"msg" : "ACCOUNTS_LISTED_SUCCESSFULLY", "data" : users}
        response.json(success_response)
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const retrieveAccount = async (request, response) => {
    console.log(request.originalUrl);
    const userId = request.params.id;
    try{
        const userRetrieve = await User.findById(userId);
        if(userRetrieve){
            success_response = {"msg" : "ACCOUNTS_RETRIEVED_SUCCESSFULLY", "data" : userRetrieve}
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
    console.log(request.originalUrl);
    const {username} = request.body
    try{
        const checkUserExist = await User.findOne({username : username});
        if(!checkUserExist){
            const user = await new User(request.body).save()
            response_data = {"msg": "ACCOUNT_REGISTERED_SUCCESSFULLY", "data": user} 
            response.status(201).json(response_data);
        }
        else{
            response_data = {"msg": "USER_ALREADY_EXIST_PLEASE_LOGIN"} 
            response.json(response_data);
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const updateAccount = async (request, response) => {
    console.log(request.originalUrl);
    const userId = request.params.id;
    const request_data = request.body;
    request_data.updated_at = new Date;
    try{
        const updateUser = await User.findOneAndUpdate(
            {"_id" : userId},
            {"$set" : request_data},
            {"new" : true}
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

module.exports = {listAccounts, retrieveAccount, registerAccount, updateAccount};