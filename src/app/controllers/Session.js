const UserModel = require('./../models/User')

class SessionController {

    async create(req, res) {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })

        if (!user) {
            return res.status(400).json({ error: 'User not found' })
        }
    }
}

module.exports = new SessionController()