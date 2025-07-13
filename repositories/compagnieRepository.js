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

            const startDate = new Date(date, 0, 1);
            var endDate
            if(startDate.getFullYear() === new Date(Date.now()).getFullYear()){
                endDate = Date.now()
            } else {
                endDate = new Date(startDate.getFullYear() + 1, 0, 1);
            }

            return await COMPAGNIE.find({
                dateCreationUniteLegale: {
                    $gt: startDate,
                    $lt: endDate
                }
            })
                .limit(effectiveLimit)
                .skip(skip)
                .lean();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async countByMinimalCreationDate(date) {
        try {
            // CORRECTION: Utiliser le même champ que dans findByMinimalCreationDate
            const startDate = new Date(date, 0, 1); // 1er janvier de l'année spécifiée
            var endDate
            if(startDate.getFullYear() === new Date(Date.now()).getFullYear()){
                endDate = Date.now()
            } else {
                endDate = new Date(startDate.getFullYear() + 1, 0, 1);
            }

            return await COMPAGNIE.countDocuments({
                    dateCreationUniteLegale: {
                        $gt: startDate,
                        $lt: endDate
                    }
                }
            )
                ;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = new CompagnieRepository()