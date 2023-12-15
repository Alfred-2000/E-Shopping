
const express = require('express');
const router = express.Router();
const UUID = require('uuid').v4;
const Product = require('../models/productModel');


const listProducts = async (request, response) => {
    try{
        const products = await Product.find();
        success_response = {"msg": "PRODUCTS_LISTED_SUCCESSFULLY", "data": products}
        response.json(success_response)
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const retrieveProduct = async (request, response) => {
    const productId = request.params.id;
    try{
        const productRetrieve = await Product.findOne({_id: productId});
        if(productRetrieve){
            success_response = {"msg": "PRODUCT_RETRIEVED_SUCCESSFULLY", "data": productRetrieve}
            response.json(success_response)
        }
        else{
            error_response = {"_id": productId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const addProducts = async (request, response) => {
    const {name} = request.body;
    request.body._id = UUID();
    try{
        const product = await Product.findOne({name: name});
        if (!product){
            const product = await new Product(request.body).save();
            response_data = {"msg": "PRODUCT_ADDED_SUCCESSFULLY", "data": product} 
            response.status(201).json(response_data);
        }
        else{
            response_data = {"msg": "PRODUCT_ALREADY_PRESENT_PLEASE_UPDATE", "data": product._id} 
            response.json(response_data);
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const updateProducts = async (request, response) => {
    const productId = request.params.id;
    const request_data = request.body;
    request_data.updated_at = new Date;
    try{
        const updateProduct = await Product.findOneAndUpdate(
            {"_id": productId},
            {"$set": request_data},
            {"new": true}
        )
        if(updateProduct){
            response_data = {"msg": "USER_UPDATED_SUCCSSFULLY", "data": updateProduct}
            response.json(response_data)
        }
        else{
            error_response = {"_id": productId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const deleteProduct = async (request, response) => {
    const productId = request.params.id;
    try{
        const product = await Product.findByIdAndDelete(productId);
        if(product){
            success_response = {"msg": "PRODUCT_DELETED_SUCCESSFULLY", "data": product}
            response.json(success_response)
        }
        else{
            error_response = {"_id": productId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const deleteMultipleProducts = async (request, response) => {
    const productsId = request.body.product_ids
    try{
        const products = await Product.deleteMany({_id: {"$in": productsId}})
        if(products.deletedCount != 0){
            success_response = {"msg": "PRODUCTS_DELETED_SUCCESSFULLY", "data": products}
            response.json(success_response)
        }
        else{
            error_response = {"_id": productId, "error": "DATA_NOT_FOUND"};
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
    listProducts, retrieveProduct, addProducts,
    updateProducts, deleteProduct, deleteMultipleProducts
};