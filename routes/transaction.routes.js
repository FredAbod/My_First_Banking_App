const express = require('express');
const router = express.Router();

const {transfer, deposit, withdrawal} = require('../controllers/transactions.controllers');

router.post('/transfer', transfer);
router.put('/deposit', deposit);
router.put('/withdrawal', withdrawal);

module.exports = router;