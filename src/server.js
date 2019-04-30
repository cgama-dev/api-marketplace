
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const Youch = require('youch')
const validate = require('express-validation')
const database = require('./app/config/database')
const Sentry = require('@sentry/node')
const ConfigSentry = require('./app/config/sentry')

class App {
    constructor() {
        
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middlewares()
        this.sentry()
        this.routes()
        this.exeption()
    }

    sentry() {
        Sentry.init(ConfigSentry)
    }

    database() {
        mongoose.connect(database.URI, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(Sentry.Handlers.requestHandler());
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exeption() {

        if (process.env.NODE_ENV === 'production') {
            this.express.use(Sentry.Handlers.errorHandler());
        }

        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            if (process.env.NODE_ENV !== 'production') {
                const youch = new Youch(err, req)
                return res.send(await youch.toHTML())
            }

            return res.status(err.status || 500)
                .json({ error: 'Internal Server Error' })
        })
    }
}

module.exports = new App().express