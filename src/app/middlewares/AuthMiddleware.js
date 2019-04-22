const jwt = require('jsonwebtoken')
const auth = require('../config/auth')
const { promisify } = require('util')

class AuthMiddleware {

    async  isAthenticate(req, res, next) {

        const authHeader = req.headers.authorization

        if (!authHeader) {
            return res.status(400).json({ error: 'Token not provided' })
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = await promisify(jwt.verify)(token, auth.secreteKey)
            req.userId = decoded.id
            return next()
        } catch (err) {
            return res.status(401).json({ error: 'Token invalid', err })
        }
    }
}



module.exports = new AuthMiddleware()