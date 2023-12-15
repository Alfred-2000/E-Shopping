
const express = require('express');
const router = express.Router();
const {verifyJWT, verifySuperUser} = require('../components/authenticationMiddleware');
const {listAllUserOrders, listUserOrders,
    retrieveOrder, addOrder,
    updateOrder, deleteOrder} = require('../components/orders');

router.route('/')
    .get(verifyJWT, listUserOrders)
    .post(verifyJWT, addOrder)

router.route('/:id/')
    .get(verifyJWT, retrieveOrder)
    .patch(verifyJWT, updateOrder)
    .delete(verifyJWT, deleteOrder)

module.exports = router;
