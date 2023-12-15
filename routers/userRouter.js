
const express = require('express');
const router = express.Router();
const {
    listAccounts, retrieveAccount, registerAccount,
    updateAccount, deleteAccount, deleteMultipleAccounts
} = require('../components/accountsUser');

const {verifyJWT, verifySuperUser,
    openAPI} = require('../components/authenticationMiddleware');

router.route('/')
    .get(verifySuperUser, listAccounts)
    .post(openAPI, registerAccount)
    .delete(verifySuperUser, deleteMultipleAccounts);

router.route('/:id/')
    .get(verifyJWT, retrieveAccount)
    .patch(verifyJWT, updateAccount)
    .delete(verifyJWT, deleteAccount)
    
router.delete('/delete/', );


module.exports = router;