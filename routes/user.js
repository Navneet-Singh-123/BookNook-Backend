const express = require('express');
const router = express.Router();

const {sayHi} = require('../Controllers/user.js')

router.get('/',sayHi)

module.exports = router;