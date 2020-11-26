const express = require('express');
const router = express.Router();

const {create, productById, read, remove, update, list, listRelated, listCategories} = require('../Controllers/product.js')

const {
    requireSignin, 
    isAdmin, 
    isAuth
} = require('../Controllers/auth.js')

const {userById} = require("../Controllers/user")

router.get('/product/:productId', read);
router.post('/product/create/:userId',requireSignin, isAuth, isAdmin, create)
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove)
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update)
router.get('/products', list)
router.get("/products/related/:productId", listRelated);
router.get('/products/categories', listCategories)

router.param('userId', userById)
router.param('productId', productById)



module.exports = router;    