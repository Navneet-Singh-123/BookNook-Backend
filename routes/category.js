const express = require('express');
const router = express.Router();

const {create, categoryById, read} = require('../Controllers/category.js')

const {
    requireSignin, 
    isAdmin, 
    isAuth
} = require('../Controllers/auth.js')

const {userById} = require("../Controllers/user")

router.post('/category/create/:userId',requireSignin, isAuth, isAdmin, create)
router.get('/category/:categoryId', read)

router.param('categoryId', categoryById);
router.param('userId', userById)



module.exports = router;    