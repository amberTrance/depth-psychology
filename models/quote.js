const mongoose = require('mongoose')

// Get schema object
const Schema = mongoose.Schema

// create new instance of Schema object
const quoteSchema = new Schema({
    // Describe structure of document
    author: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

// text indexing
quoteSchema.index({ text: 'text', author: 'text' })

// Create Model
const Quote = mongoose.model('Quote', quoteSchema)

module.exports = Quote;