const express = require('express')
const symContrl = require('../controllers/symbolController')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')


router.get('/symbol/create', ensureAuthenticated, symContrl.create_symbol_index)
router.post('/symbols', symContrl.symbols_post)
router.get('/symbols', symContrl.symbols_index)
router.get('/symbols/:sym', symContrl.symbols_symbol)

module.exports = router