const mongoose = require('mongoose')
// Get schema object
const Schema = mongoose.Schema

// create new instance of Schema object
const archetypeSchema = new Schema({
    // Describe structure of document
    archetype: {
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
const Archetype = mongoose.model('Archetype', archetypeSchema)
// Export
module.exports = Archetype;
