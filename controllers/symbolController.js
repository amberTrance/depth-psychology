const Symbol = require('../models/symbol')

// Logic for create symbol
const create_symbol_index = (req, res) => {

    Symbol.distinct("symbol")
        .then(result => {
            res.render('./symbols/create-symbol', {symbols: result, title: 'Create Symbol'})
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
const symbols_index = async (req, res) => {
    let symbols = await Symbol.find().sort({ symbol: 1 })
    let uniqSymbols = await Symbol.distinct("symbol")

    let symbolsObj = []
    for (let i = 0; i < uniqSymbols.length; i++) {
        symbolsObj[i] = []

        symbols.forEach(symbol => {
            if (symbol.symbol === uniqSymbols[i]) {

                symbolsObj[i].push(symbol)
            }
        })
    }
       
    // Return the symbolsObj ordered by symbol, and the unique Symbols for the symbols navbar
    res.render('./symbols/symbols', {orderedSym: symbolsObj, symbols: uniqSymbols, title: 'Symbols'})
}


const symbols_symbol = async (req, res) => {
    const paramSymbol = req.params.sym

    let requestedSymbol = await Symbol.find({ symbol: paramSymbol }).sort({ createdAt: -1 })
    let uniqSymbols = await Symbol.distinct("symbol")
            
    if (requestedSymbol == 0) {
        res.redirect('/404')
    } else {
        res.render('./symbols/symbol', { reqSymbol: requestedSymbol, symbols: uniqSymbols, title: paramSymbol})
    }
}

module.exports = {
    create_symbol_index,
    symbols_post,
    symbols_index,
    symbols_symbol
}
