const express = require('express')
const router = express.Router()
// const bcrypt = require('bcryptjs')
const passport = require('passport')


router.post('/', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next)
})

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out!')
    res.redirect('/')
})

module.exports = router