
const express = require('express');
const {
    listAccounts, retrieveAccount, registerAccount,
    updateAccount
} = require('../components/accountsUser');
const router = express.Router();

router.route('/')
    .get(listAccounts)
    .post(registerAccount);

router.route('/:id/')
    .get(retrieveAccount)
    .patch(updateAccount)
    .delete();


module.exports = router;