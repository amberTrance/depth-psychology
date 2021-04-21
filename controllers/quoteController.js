const { render } = require('ejs')
const Quote = require('../models/quote')

const quotes_index = async (req, res) => {
    let quotes = await Quote.find().sort({ createdAt: -1 })
    let navquotes = await Quote.distinct("author")

    
    res.render('./quotes/quotes', 
    {quotes: quotes, navquotes: navquotes, title: 'Quotes', user: req.user})
}

const quote_create = async (req, res) => {
    // Select all distinct authors in the collection
    let navQuotes = await Quote.distinct("author")

    res.render('./quotes/create-quote', 
    {navquotes: navQuotes,  title: 'Create Quote', user: req.user})
}

const quote_post = (req, res) => {
    const quote = new Quote(req.body)
    
    quote.save()
        .then(result => res.redirect('/quotes'))
        .catch(err => console.log(err))

}

const quotes_author = async (req, res) => {
    let author = req.params.author

    let navQuotes = await Quote.distinct("author")
    let quotes = await Quote.find({ author: author}).sort({createdAt: -1})

    res.render('./quotes/quote', 
    {quotes: quotes, navquotes: navQuotes, title: author, user: req.user})
}

module.exports = {
    quotes_index,
    quote_create,
    quote_post,
    quotes_author
}