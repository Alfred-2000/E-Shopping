
const express = require('express');
const router = express.Router();
const {verifyJWT, verifySuperUser} = require('../components/authenticationMiddleware');
const {listProducts, retrieveProduct,
    addProducts, updateProducts,
    deleteProduct, deleteMultipleProducts} = require('../components/products')

router.route('/')
    .get(verifyJWT, listProducts)
    .post(verifySuperUser, addProducts)
    .delete(verifySuperUser, deleteMultipleProducts)

router.route('/:id/')
    .get(verifyJWT, retrieveProduct)
    .patch(verifyJWT, updateProducts)
    .delete(verifySuperUser, deleteProduct)

module.exports = router