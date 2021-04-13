const mongoose = require('mongoose')

// Get schema object
const Schema = mongoose.Schema

// create new instance of Schema object
const symbolSchema = new Schema({
    // Describe structure of document
    symbol: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
}, { timestamps: true })

// Create Model
const Symbol = mongoose.model('Symbol', symbolSchema)

module.exports = Symbol;