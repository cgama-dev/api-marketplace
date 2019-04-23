const express = require('express')

const router = express.Router()

const controllers = require('./app/controllers')

const middlewares = require('./app/middlewares')

//users
router.get('/users', controllers.UserController.query)
router.post('/users', controllers.UserController.create)
router.delete('/users/:id', controllers.UserController.destroy)

//sessions 
router.post('/sessions', controllers.SessionController.create)

// middleware
router.use(middlewares.AuthMiddleware.isAthenticate)

//Ad 
router.get('/ads', controllers.AdController.query)
router.post('/ads', controllers.AdController.create)
router.put('/ads/:id', controllers.AdController.update)
router.delete('/ads/:id', controllers.AdController.destroy)



module.exports = router