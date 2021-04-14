const Symbol = require('../models/symbol')


// Logic for create symbol
const create_symbol_index = (req, res) => {
    Symbol.find().sort({ symbol: 1 })
    .then(result => {
        let array = []

        result.forEach(symbol => {
            array.push(symbol.symbol)
        })
        let uniqSymbols = [...new Set(array)]

        res.render('create-symbol', {symbols: uniqSymbols, title: 'Create Symbol'})
    })
    .catch(err => console.log(err))
}

// Logic for post symbol
const symbols_post = (req, res) => {
    const symbol = new Symbol(req.body)
    symbol.save()
        .then(result => res.redirect('/symbols'))
        .catch(err => console.log(err))
}

// Logic for index symbols page
const symbols_index = (req, res) => {
    Symbol.find().sort({ symbol: 1 })
        .then(result => {

            const array = [];
            const symbolsObj = [];

            // For each symbol object in the db, push the symbol property value in a new array
            result.forEach( symbol => {
                array.push(symbol.symbol)
            })
            // Filter the array so that it contains only unique values
            // it will look like uniqSymbols = ['blood', 'lion', 'bird' ...]
            // I do this in order to create a new array which orders all the object by symbol
            let uniqSymbols = [...new Set(array)]

            // In this step, I create a separate indexed array for each unique symbol
            // Then I add only the symbol objects that have a corresponding symbol property
            // Final result will look like: 
                // symbolsObj = [ [{symbol: blood, text: 'bla bla'}, {symbol:blood , text: 'bla'}], [{..}, {..}]]
            for (let i = 0; i < uniqSymbols.length; i++) {
                symbolsObj[i] = []

                result.forEach(symbol => {
                    if (symbol.symbol === uniqSymbols[i]) {

                        symbolsObj[i].push(symbol)
                    }
                })
        }
        
        // Return the symbolsObj ordered by symbol, and the unique Symbols for the symbols navbar
        res.render('symbols', {orderedSym: symbolsObj, symbols: uniqSymbols, title: 'Symbols'})
    })
    .catch(err => console.log(err))
}

const symbols_symbol = (req, res) => {
    const paramSymbol = req.params.sym
    
    Symbol.find().sort({ symbol: 1 })
        .then(result => {
            let array = []

            // Get the data for the symbols nav
            result.forEach(symbol => {
                array.push(symbol.symbol)
            })
            uniqSymbols = [...new Set(array)]

            // Get the filtered data with only our requested symbol
            let requestedSymbol = result.filter(item => item.symbol == paramSymbol)
            console.log(requestedSymbol)

            res.render('symbol', { reqSymbol: requestedSymbol, symbols: uniqSymbols, title: paramSymbol})
        })
        .catch(err => console.log(err))       
}

module.exports = {
    create_symbol_index,
    symbols_post,
    symbols_index,
    symbols_symbol
}