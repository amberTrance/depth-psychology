const express = require('express')
const symContrl = require('../controllers/symbolController')
const router = express.Router();


router.get('/create-symbol', symContrl.index_create_symbol)
router.post('/symbols', symContrl.symbol_create_post)
router.get('/symbols', symContrl.index_symbols)

module.exports = router;