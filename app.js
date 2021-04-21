const express = require('express')
const mongoose = require('mongoose')
const symbolsRoutes = require('./routes/symbolRoutes')
const archetypeRoutes = require('./routes/archetypeRoutes')
const searchRoute = require('./routes/searchRoute')
const quoteRoutes = require('./routes/quoteRoutes')
const loginRoute = require('./routes/loginRoute')
// Authentication tools
const flash = require('connect-flash')
const session = require('express-session')


const app = express()

// Require passport and local config file
const passport = require('passport')
// passport config
require('./config/passport')(passport)

const PORT = process.env.PORT || 3000

// Connect to mongodb
const uri = process.env.MONGODB_URI;
// Removes deprecation warning from adding indexes to models schema
mongoose.set('useCreateIndex', true);
// the second argument is an options object that removes the 'deprecated' message when starting nodemon
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        // Listen for requests only after the connection to the db was established
        // Server, port 3000, localhost
        app.listen(PORT)
    })
    .catch(err => console.log(err))


// Set ejs template engine
app.set('view engine', 'ejs')

// use public folder static files
app.use(express.static('public'))

// takes all the url encoded data and parses it into an object 
// that can be used in the request object
app.use(express.urlencoded({ extended: true }))

// middleware for authentication
// Express session
app.use(session({
    secret: 'parrot',
    resave: true,
    saveUninitialized: true
}))
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

app.get('/', (req, res) => {
    res.render('index', { title: 'Home', user: req.user })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})



app.use(symbolsRoutes)
app.use(archetypeRoutes)
app.use(searchRoute)
app.use(quoteRoutes)
app.use(loginRoute)

app.use((req, res) => {
    res.status(404).render('404', { title: 404})
})