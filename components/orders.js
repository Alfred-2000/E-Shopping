
const express = require('express');
const jwt = require('jsonwebtoken');
const UUID = require('uuid').v4;
const router = express.Router();
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const {JWT_SECRECT_KEY, ORDER_STATUS} = require('../constants');


const listAllUserOrders = async (request, response) => {
    try{
        const orders = await Order.find();
        success_response = {"msg": "ORDERS_LISTED_SUCCESSFULLY", "data": orders}
        response.json(success_response)
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const listUserOrders = async (request, response) => {
    const jwt_token = request.headers.authorization
    const user_data = jwt.verify(jwt_token, JWT_SECRECT_KEY);
    try{
        const userOrders = await Order.find({user_id: user_data.id});
        success_response = {"msg": "ORDERS_LISTED_SUCCESSFULLY", "data": userOrders}
        response.json(success_response)
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const retrieveOrder = async (request, response) => {
    const orderId = request.params.id;
    try{
        const orderRetreive = await Order.findById(orderId);
        if(orderRetreive){
            success_response = {"msg": "ORDER_RETRIEVED_SUCCESSFULLY", "data": orderRetreive}
            response.json(success_response)
        }
        else{
            error_response = {"_id": orderId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const addOrder = async (request, response) => {
    const {product_id, quantity} = request.body;
    const jwt_token = request.headers.authorization
    const user_data = jwt.verify(jwt_token, JWT_SECRECT_KEY);
    try{
        const product = await Product.findById(product_id);
        const order_amount = quantity * product.price;
        const order_data = {
            _id: UUID(),
            user_id: user_data.id,
            order_amount: order_amount,
            product_amount: product.price
        }
        const order_details = {...request.body, ...order_data}
        const order = await new Order(order_details).save();
        response_data = {"msg": "ORDER_PLACED_SUCCESSFULLY", "data": order} 
        response.status(201).json(response_data);
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const updateOrder = async (request, response) => {
    const orderId = request.params.id;
    const request_data = request.body;
    request_data.updated_at = new Date;    
    try{
        const orderRetreive = await Order.findById(orderId);
        if(request_data.status in [0, 1]){  //"0 => Order Placed, 1 => Packing for dispatch"
            request_data.order_status = ORDER_STATUS[request_data.status]
        }
        if(request_data.quantity){
            request_data.order_amount = request_data.quantity * orderRetreive.product_amount;
        }
        const updateOrder = await Order.findByIdAndUpdate(
            orderId,
            {"$set": request_data},
            {"new": true}
        )
        if(updateOrder){
            response_data = {"msg": "ORDER_UPDATED_SUCCSSFULLY", "data": updateOrder}
            response.json(response_data)
        }
        else{
            error_response = {"_id": orderId, "error": "DATA_NOT_FOUND"};
            response.status(404).json(error_response)
        }
    }
    catch(error){
        console.log(error);
        error_response = { "error": "Internal Server Error"}
        response.status(500).json(error_response)
    }
}


const deleteOrder = async (request, response) => {
    const orderId = request.params.id;
    try{
        const deleteOrder = await Order.findByIdAndDelete(orderId);
        if(deleteOrder){
            success_response = {"msg": "PRODUCT_DELETED_SUCCESSFULLY", "data": deleteOrder}
            response.json(success_response)
        }
        else{
            error_response = {"_id": orderId, "error": "DATA_NOT_FOUND"};
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
    listAllUserOrders, listUserOrders,
    retrieveOrder, addOrder,
    updateOrder, deleteOrder
}