const express = require('express')
const router = express.Router()
const archController = require('../controllers/quoteController')

router.get('/quotes', archController.quotes_index)
router.get('/quote/create', archController.quote_create)
router.post('/quotes', archController.quote_post)

module.exports = router