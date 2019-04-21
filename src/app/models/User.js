const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./../config/auth')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//Hocks
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 8)
})

UserSchema.methods = {
    compareHash(password) {
        return bcrypt.compare(password, this.password)
    }
}

UserSchema.statics = {
    generateToken({ id }) {
        return jwt.sign({ id }, auth.secreteKey, {
            expiresIn: auth.expiresIn
        })
    }
}

const UserModel = mongoose.model('User', UserSchema)

module.exports = UserModel