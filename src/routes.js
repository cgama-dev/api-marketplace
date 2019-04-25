const express = require('express')

const router = express.Router()

const controllers = require('./app/controllers')

const middlewares = require('./app/middlewares')

//users
router.get('/users', controllers.UserController.query)
router.post('/users', controllers.UserController.create)
router.delete('/users/:id', controllers.UserController.destroy)

/**
 * Sessions
 **/
router.post('/sessions', controllers.SessionController.create)

/**
 * Middleware
 **/

router.use(middlewares.AuthMiddleware.isAthenticate)

/**
 * Ads
 **/
router.get('/ads', controllers.AdController.query)
router.get('/ads/:id', controllers.AdController.get)
router.post('/ads', controllers.AdController.create)
router.put('/ads/:id', controllers.AdController.update)
router.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchase
 **/
router.post('/purchases', controllers.PurchaseController.create)

module.exports = router