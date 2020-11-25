const express = require('express');
const router = express.Router();

const {create, categoryById, read, update, remove, list} = require('../Controllers/category.js')

const {
    requireSignin, 
    isAdmin, 
    isAuth
} = require('../Controllers/auth.js')

const {userById} = require("../Controllers/user")

router.post('/category/create/:userId',requireSignin, isAuth, isAdmin, create)
router.put('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, update)
router.delete('/category/:categoryId/:userId',requireSignin, isAuth, isAdmin, remove)
router.get('/category/:categoryId', read)
router.get('/categories', list)

router.param('categoryId', categoryById);
router.param('userId', userById)



module.exports = router;    