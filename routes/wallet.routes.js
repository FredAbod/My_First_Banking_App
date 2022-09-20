const express = require('express');
const { createWallet, deposit, withdrawal } = require('../controllers/wallet.controllers');
const { isAuth } = require('../middleware/isAuth');
const router = express.Router();



router.post('/',isAuth, createWallet);


module.exports = router;