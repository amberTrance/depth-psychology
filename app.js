const express = require('express')
const mongoose = require('mongoose')
const symbolsRoutes = require('./routes/symbolRoutes')
const archetypeRoutes = require('./routes/archetypeRoutes')
const searchRoute = require('./routes/searchRoute')

const app = express()

// Connect to mongodb
dbURI = "mongodb+srv://test:test1234@node.ul9of.mongodb.net/depth-psychology?retryWrites=true&w=majority"
// Removes deprecation warning from adding indexes to models schema
mongoose.set('useCreateIndex', true);
// the second argument is an options object that removes the 'deprecated' message when starting nodemon
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        // Listen for requests only after the connection to the db was established
        // Server, port 3000, localhost
        app.listen(3000)
    })
    .catch(err => console.log(err))


// Set ejs template engine
app.set('view engine', 'ejs')



// use public folder static files
app.use(express.static('public'))
// takes all the url encoded data and parses it into an object 
// that can be used in the request object
app.use(express.urlencoded({ extended: true }))



app.get('/', (req, res) => {
    res.render('index', { title: 'Home' })
})


app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})


app.get('/quotes', (req, res) => {
    res.render('quotes', { title: 'Quotes'})
})

app.use(symbolsRoutes)
app.use(archetypeRoutes)
app.use(searchRoute)

app.use((req, res) => {
    res.status(404).render('404', { title: 404})
})