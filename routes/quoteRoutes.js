const express = require('express')
const router = express.Router()
const archController = require('../controllers/quoteController')

router.get('/quotes', archController.quotes_index)

module.exports = router