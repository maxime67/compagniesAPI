const COMPAGNIE = require('../models/compagnieModel')

class CompagnieRepository {
    async findAll(limit = 20){
        try{
            return await COMPAGNIE.find().limit(limit)
        } catch (error){
            console.error(error)
            throw error
        }
    }
    async findByMinimalCreationDate(date, limit = 20){
        try{
            return await COMPAGNIE.find({
                anneeCategorieEntreprise: { $gt: date}
            }).limit(limit)
        } catch(error){
            console.error(error)
            throw error
        }
    }
}

module.exports = new CompagnieRepository()