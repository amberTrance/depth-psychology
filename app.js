const express = require('express')

const app = express()

// Server, port 3000, localhost
app.listen(3000)

// Set ejs template engine
app.set('view engine', 'ejs')

// use public folder static files
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/symbols', (req, res) => {
    res.render('symbols')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/quotes', (req, res) => {
    res.render('quotes')
})