const express = require('express')

const validate = require('express-validation')

const router = express.Router()

const controllers = require('./app/controllers')

const middlewares = require('./app/middlewares')

const validators = require('./app/validators')

const handle = require('express-async-handler')

//users
router.get('/users', handle(controllers.UserController.query))
router.post('/users', validate(validators.User), handle(controllers.UserController.create))
router.delete('/users/:id', handle(controllers.UserController.destroy))

/**
 * Sessions
 **/
router.post('/sessions', validate(validators.Session), handle(controllers.SessionController.create))

/**
 * Middleware
 **/

router.use(middlewares.AuthMiddleware.isAthenticate)

/**
 * Ads
 **/
router.get('/ads', handle(controllers.AdController.query))
router.get('/ads/:id', handle(controllers.AdController.get))
router.post('/ads', validate(validators.Session), handle(controllers.AdController.create))
router.put('/ads/:id', handle(controllers.AdController.update))
router.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * Purchase
 **/
router.post('/purchases', validate(validators.Purchase), handle(controllers.PurchaseController.create))

module.exports = router