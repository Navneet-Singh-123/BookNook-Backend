const express = require('express');
const router = express.Router();

const {
    requireSignin, 
    isAdmin, 
    isAuth
} = require('../Controllers/auth.js')

const {
    userById
} = require('../Controllers/user.js')

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res)=>{
    res.json({
        user: req.profile
    })
})

router.param('userId', userById)



module.exports = router;