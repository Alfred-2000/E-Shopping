
const express = require('express');
const {verifyJWT, verifySuperUser} = require('../components/authenticationMiddleware');
const {listProducts, retrieveProduct,
    addProducts, updateProducts,
    deleteProduct, deleteMultipleProducts} = require('../components/products')
const router = express.Router();

router.route('/')
    .get(verifyJWT, listProducts)
    .post(verifySuperUser, addProducts)
    .delete(verifySuperUser, deleteMultipleProducts)

router.route('/:id/')
    .get(verifyJWT, retrieveProduct)
    .patch(verifyJWT, updateProducts)
    .delete(verifySuperUser, deleteProduct)

module.exports = router