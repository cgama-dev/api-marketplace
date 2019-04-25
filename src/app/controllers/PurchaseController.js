const AdModel = require('./../models/Ad')
const UserModel = require('./../models/User')
const Mail = require('./../services/Mail')
class PurchaseController {

    async create(req, res) {

        const { ad, content } = req.body

        const purchaseAd = await AdModel.findById(ad).populate('author')

        const user = await UserModel.findById(req.userId)

        await Mail.sendMail({
            from: '"Cleyton Gama" <cleytongama@gmail.com>',
            to: purchaseAd.author.email,
            subject: `Solicitação de compra: ${purchaseAd.title}`,
            html: `<p>${content}</p>`
        })

        return res.status(200).send()
    }
}

module.exports = new PurchaseController()