const AdModel = require('./../models/Ad')

class AdController {

    async create(req, res) {
        try {
            const ad = await AdModel.create({ ...req.body, author: req.userId })
            return res.status(201).json(ad)
        } catch (err) {
            return res.status(400).json({ error: 'Falid create ad' })
        }
    }
    async get(req, res) {
        const idAd = req.params.id

        try {
            const ad = await AdModel.findById(idAd)

            if (!ad) {
                return res.status(400).json({ error: 'Ad Not found' })
            }

            return res.status(200).json(ad)

        } catch (err) {
            return res.status(400).json({ error: 'Erro to find ad' })
        }
    }
    async query(req, res) {
        try {
            const ads = await AdModel.find()
            return res.status(200).json(ads)
        } catch (err) {
            return res.status(400).json({ error: 'Erro to findAll Ads' })
        }
    }
    async destroy(req, res) {
        try {
            await AdModel.findByIdAndDelete({ _id: req.params.id })
            return res.send()
        } catch (err) {
            return res.status(400).json({ error: 'Deleted faild' })
        }
    }
    async update(req, res) {
        try {
            const ad = await AdModel.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            })
            return res.status(200).json(ad)
        } catch (err) {
            return res.status(400).json({ error: 'Erro to findAll Ads' })
        }
    }
}

module.exports = new AdController()