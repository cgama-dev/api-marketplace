const express = require('express')

const router = express.Router()

const controllers = require('./app/controllers')

const middlewares = require('./app/middlewares')

//users
router.get('/users', controllers.UserController.query)
router.post('/users', controllers.UserController.create)
router.delete('/users/:id', controllers.UserController.destroy)

//sessions 
router.post('/sessions', controllers.SessionControler.create)

router.get('/teste', middlewares.AuthMiddleware.isAthenticate, (req, res) => {
    res.send({ message: 'User authenticated' })
})


module.exports = router