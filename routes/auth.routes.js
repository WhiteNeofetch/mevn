const {
    Router
} = require('express')
const {
    login,
    createUser
} = require('../controllers/auth.controller')
const router = Router()
const passport = require('passport')

// /api/auth/admin/login
router.post('/admin/login', login)

// /api/auth/admin/create
router.post('/admin/create',
    passport.authenticate('jwt', {
        session: false
    }),
    createUser)

module.exports = router