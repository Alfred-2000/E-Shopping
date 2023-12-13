
const express = require('express');
const {
    listAccounts, retrieveAccount, registerAccount,
    updateAccount, deleteAccount, deleteMultipleAccounts
} = require('../components/accountsUser');

const {verifyJWT, verifySuperUser,
    openAPI} = require('../components/authenticationMiddleware');
const router = express.Router();

router.route('/')
    .get(verifyJWT, listAccounts)
    .post(openAPI, registerAccount)
    .delete(verifySuperUser, deleteMultipleAccounts);

router.route('/:id/')
    .get(verifyJWT, retrieveAccount)
    .patch(verifyJWT, updateAccount)
    .delete(verifyJWT, deleteAccount)
    
router.delete('/delete/', );


module.exports = router;