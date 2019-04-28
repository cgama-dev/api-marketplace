const UserModel = require('../models/User')

class UserController {

    async query(req, res) {
        
        const users = await UserModel.find()

        return res.status(200).json(users)
    }

    async create(req, res) {
        const { email } = req.body

        if (await UserModel.findOne({ email })) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const user = await UserModel.create(req.body)

        return res.status(201).json(user)
    }

    async destroy(req, res) {
        const idUser = req.params.id

        const user = await UserModel.findOneAndDelete({ _id: idUser })

        return res.status(200).json({ message: 'User deleted' })
    }
}

module.exports = new UserController()