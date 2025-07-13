var compagnieService = require('../services/compagnieService');


class CompagnieController {
    async findAll(req, res) {
        try {
            res.send(await compagnieService.findAll(req.query.limit || null))


        } catch (error) {
            console.error(error)
            throw error
        }
    }

    async findByMinimalCreationDate(req, res) {
        try {
            const minimalDate = req.query.date
            if (minimalDate) {
                res.send(await compagnieService.findByMinimalCreationDate(req.query.date))
            } else {
                res.status(400).send({
                    error: true,
                    message: "La paramètre date est requis"
                })
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

module.exports = new CompagnieController()