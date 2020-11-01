const express = require('express');
const router = express.Router();

const {signup, signin, signout} = require('../Controllers/user.js')
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