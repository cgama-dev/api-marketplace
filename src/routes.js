const express = require('express')

const router = express.Router()

const { create, query } = require('./../src/app/controllers/User')

router.get('/users', query)
router.post('/users', create)

module.exports = router