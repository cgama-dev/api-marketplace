const AdModel = require('./../models/Ad')

class AdController {

    async create(req, res) {

        const ad = await AdModel.create({ ...req.body, author: req.userId })

        return res.status(201).json(ad)

    }
    async get(req, res) {
        const idAd = req.params.id

        const ad = await AdModel.findById(idAd)

        if (!ad) {
            return res.status(400).json({ error: 'Ad Not found' })
        }

        return res.status(200).json(ad)

    }
    async query(req, res) {

        const filters = {}

        if (req.query.price_min || req.query.price_max) {
            filters.price = {}
            if (req.query.price_min) {
                filters.price.$gte = req.query.price_min
            }
            if (req.query.price_max) {
                filters.price.$lte = req.query.price_max
            }
        }

        if (req.query.title) {
            filters.title = new RegExp(req.query.title, 'i')
        }

        const ads = await AdModel.paginate(filters, {
            page: req.query.page || 1,
            limit: 20,
            populate: ['author'],
            sort: '-createdAt'
        })
        return res.status(200).json(ads)

    }
    async destroy(req, res) {
        await AdModel.findByIdAndDelete({ _id: req.params.id })

        return res.send()
    }
    async update(req, res) {

        const ad = await AdModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        
        return res.status(200).json(ad)
    }
}

module.exports = new AdController()