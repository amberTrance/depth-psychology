const express = require('express')
const router = express.Router()
const Symbol = require('../models/symbol')
const Archetype = require('../models/archetype')
const Quote = require('../models/quote')

router.get('/search', async (req, res) => {
    const { value } = req.query

    let result1 = await Symbol.find({ $text: { $search : value }},
        { score: { $meta: "textScore" }})
        .sort({ score: { $meta: "textScore"}})

    let result2 = await Archetype.find({ $text: { $search : value }},
        { score: { $meta: "textScore" }})
        .sort({ score: { $meta: "textScore"}})

    let result3 = await Quote.find({ $text: { $search : value }},
        { score: { $meta: "textScore" }})
        .sort({ score: { $meta: "textScore"}})
    
    // res.render('search', {title: value})
    res.render('search', { searchResult: [...result1, ...result2, ...result3], title: value })
})

module.exports = router