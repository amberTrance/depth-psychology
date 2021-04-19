const { render } = require('ejs')
const Quote = require('../models/quote')

const quotes_index = (req, res) => {
    Quote.find()
        .then(result => {
            res.render('./quotes/quotes', {quotes: result, title: 'Quotes'})
        })
        .catch(err => console.log(err))
}

module.exports = {
    quotes_index
}