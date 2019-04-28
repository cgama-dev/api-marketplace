const AdModel = require('./../models/Ad')
const UserModel = require('./../models/User')
const Mail = require('./../services/Mail')
const PurchaseMail = require('./../jobs/PurchaseMail')
const Queue = require('./../services/Queue')
class PurchaseController {

    async create(req, res) {

        const { ad, content } = req.body

        const purchaseAd = await AdModel.findById(ad).populate('author')

        const user = await UserModel.findById(req.userId)

        Queue.create(PurchaseMail.key, {
            ad: purchaseAd,
            user,
            content
        }).save()

        return res.status(200).send()

    }
}

module.exports = new PurchaseController()