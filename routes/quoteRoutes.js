const express = require('express')
const router = express.Router()
const archController = require('../controllers/quoteController')
const { ensureAuthenticated } = require('../config/auth')

router.get('/quotes', archController.quotes_index)
router.get('/quote/create', ensureAuthenticated, archController.quote_create)
router.post('/quotes', archController.quote_post)
router.get('/quotes/:author', archController.quotes_author)

module.exports = router