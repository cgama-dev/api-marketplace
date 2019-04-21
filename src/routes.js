const express = require('express')

const router = express.Router()

const UserController = require('./../src/app/controllers/User')
const SessionControler = require('./../src/app/controllers/Session')

//users
router.get('/users', UserController.query)
router.post('/users', UserController.create)

//sessions 
router.post('/sessions', SessionControler.create)


module.exports = router