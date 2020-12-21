const express = require('express');
const router = express.Router();

const {
    requireSignin, 
    isAuth
} = require('../Controllers/auth.js')
const {userById} = require("../Controllers/user")

const {generateToken, processPayment} = require("../Controllers/braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
    "/braintree/payment/:userId",
    requireSignin,
    isAuth,
    processPayment
);

router.param('userId', userById)


module.exports = router;