const express = require('express');
const router = express.Router();

router.use('/getEmail', require('./getEmail'));
router.use('/getId', require('./getId'));
router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/register', require('./register'));
router.use('/product', require('./product'));
router.use('/order', require('./order'));
router.use('/contact', require('./contact'));

module.exports = router;