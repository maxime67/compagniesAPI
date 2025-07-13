const COMPAGNIE = require('../models/compagnieModel')

class CompagnieRepository {
    async findAll(limit = 20, page = 1) {
        try {
            const skip = (page - 1) * limit;
            const maxLimit = 100;
            const effectiveLimit = Math.min(limit, maxLimit);

            return await COMPAGNIE.find()
                .limit(effectiveLimit)
                .skip(skip)
                .lean();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async findByMinimalCreationDate(date, limit = 20, page = 1) {
        try {
            const skip = (page - 1) * limit;
            const maxLimit = 100;
            const effectiveLimit = Math.min(limit, maxLimit);

            return await COMPAGNIE.find({
                dateCreationUniteLegale: { $gt: date }
            })
                .limit(effectiveLimit)
                .skip(skip)
                .lean();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    // Nouvelle méthode pour compter les résultats
    async countByMinimalCreationDate(date) {
        try {
            return await COMPAGNIE.countDocuments({
                anneeCategorieEntreprise: { $gt: date }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // Méthode pour traitement en streaming (pour de gros volumes)
    async streamByMinimalCreationDate(date, callback) {
        try {
            const cursor = COMPAGNIE.find({
                anneeCategorieEntreprise: { $gt: date }
            }).lean().cursor();

            cursor.on('data', callback);
            cursor.on('error', (error) => {
                console.error('Erreur dans le stream:', error);
                throw error;
            });

            return cursor;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new CompagnieRepository()