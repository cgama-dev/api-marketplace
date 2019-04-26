const express = require('express')
const mongoose = require('mongoose')
const validate = require('express-validation')
const database = require('./app/config/database')
class App {
    constructor() {
        this.express = express()
        this.isDev = process.env.NODE_ENV !== 'production'

        this.database()
        this.middlewares()
        this.routes()
        this.exeption()
    }

    database() {
        mongoose.connect(database.URI, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exeption() {
        this.express.use((err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            return res.status(err.status || 500)
                .json({ error: 'Internal Server Error' })
        })
    }
}

module.exports = new App().express