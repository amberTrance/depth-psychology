const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = function(passport) {
    passport.use(
        new LocalStrategy( { usernameField: 'userName'}, 
        (userName, password, done) => {
            // Match user
            User.findOne({ userName: userName })
                .then(user => {

                    const message = 'Wrong user name or password!'
                    
                    if (!user) {
                        return done(null, false, { message: message })
                    }

                    // Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user)
                        } else {
                            return done(null, false, { message: message})
                        }
                    })

                })
                .catch(err => console.log(err))
        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}