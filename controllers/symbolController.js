const Symbol = require('../models/symbol')

// function that creates array with the unique symbols
function uniqueSymbols(result) {
    let array = []

    // Get the data for the symbols nav
    result.forEach(symbol => {
        array.push(symbol.symbol)
    })
    let uniqSymbols = [...new Set(array)]

    return uniqSymbols
}


// Logic for create symbol
const create_symbol_index = (req, res) => {
    Symbol.find().sort({ symbol: 1 })
    .then(result => {
        
        let uniqSymbols = uniqueSymbols(result)

        res.render('./symbols/create-symbol', {symbols: uniqSymbols, title: 'Create Symbol'})
    })
    .catch(err => console.log(err))
}


// Logic for post symbol
const symbols_post = (req, res) => {
    const symbol = new Symbol(req.body)
    const name = symbol.symbol
    symbol.save()
        .then(result => res.redirect(`/symbols/${name}`))
        .catch(err => console.log(err))
}


// Logic for index symbols page
const symbols_index = (req, res) => {
    Symbol.find().sort({ symbol: 1 })
        .then(result => {

            const array = [];
            const symbolsObj = [];

            let uniqSymbols = uniqueSymbols(result)

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
        res.render('./symbols/symbols', {orderedSym: symbolsObj, symbols: uniqSymbols, title: 'Symbols'})
    })
    .catch(err => console.log(err))
}


const symbols_symbol = (req, res) => {
    const paramSymbol = req.params.sym
   
    Symbol.find().sort({ symbol: 1 })
        .then(result => {
            let uniqSymbols = uniqueSymbols(result)

            // Get the filtered data with only our requested symbol
            let requestedSymbol = result.filter(item => item.symbol == paramSymbol)
            
            if (requestedSymbol == 0) {
                res.redirect('/404')
            } else {
                res.render('./symbols/symbol', { reqSymbol: requestedSymbol, symbols: uniqSymbols, title: paramSymbol})
            }
        })
        .catch(err => console.log(err))       
}


module.exports = {
    create_symbol_index,
    symbols_post,
    symbols_index,
    symbols_symbol
}