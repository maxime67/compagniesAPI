var CompagnieRepository = require('../repositories/compagnieRepository')

class CompagnieService {
    async findAll(limit = 20) {
        try {
            return await CompagnieRepository.findAll(limit)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async findByMinimalCreationDate(date, limit = 20) {
        try {
            return await CompagnieRepository.findByMinimalCreationDate(date, limit)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}

module.exports = new CompagnieService()