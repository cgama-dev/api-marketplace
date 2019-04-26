const express = require('express')

const validate = require('express-validation')

const router = express.Router()

const controllers = require('./app/controllers')

const middlewares = require('./app/middlewares')

const validators = require('./app/validators')

//users
router.get('/users', controllers.UserController.query)
router.post('/users', validate(validators.User), controllers.UserController.create)
router.delete('/users/:id', controllers.UserController.destroy)

/**
 * Sessions
 **/
router.post('/sessions', validate(validators.Session), controllers.SessionController.create)

/**
 * Middleware
 **/

router.use(middlewares.AuthMiddleware.isAthenticate)

/**
 * Ads
 **/
router.get('/ads', controllers.AdController.query)
router.get('/ads/:id', controllers.AdController.get)
router.post('/ads', validate(validators.Session), controllers.AdController.create)
router.put('/ads/:id', controllers.AdController.update)
router.delete('/ads/:id', controllers.AdController.destroy)

/**
 * Purchase
 **/
router.post('/purchases', validate(validators.Purchase), controllers.PurchaseController.create)

module.exports = router