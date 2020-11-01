const express = require('express');
const router = express.Router();

const {signup, signin, signout, requireSignin} = require('../Controllers/auth.js')
const {userSignupValidator} = require('../Validators')

router.post('/signup',
    userSignupValidator,
    signup
)

router.post('/signin',
    signin
)

router.get('/signout', 
    signout
)




module.exports = router;