var CompagnieRepository = require('../repositories/compagnieRepository')

class CompagnieService {
    async findAll(limit = 20, page = 1) {
        try {
            const data = await CompagnieRepository.findAll(limit, page);

            return {
                data,
                pagination: {
                    page,
                    limit,
                    hasMore: data.length === limit
                }
            };
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async findByMinimalCreationDate(date, limit = 20, page = 1) {
        try {
            const [data, total] = await Promise.all([
                CompagnieRepository.findByMinimalCreationDate(date, limit, page),
                CompagnieRepository.countByMinimalCreationDate(date)
            ]);

            const totalPages = Math.ceil(total / limit);

            return {
                data,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages,
                    hasMore: page < totalPages
                }
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async processByMinimalCreationDateBatch(date, batchSize = 1000, processingFunction) {
        try {
            let page = 1;
            let hasMore = true;
            let processed = 0;

            while (hasMore) {
                const result = await this.findByMinimalCreationDate(date, batchSize, page);

                if (result.data.length === 0) {
                    hasMore = false;
                    break;
                }

                // Traitement du batch
                await processingFunction(result.data, page);

                processed += result.data.length;


                hasMore = result.pagination.hasMore;
                page++;
            }

            return processed;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }



}

module.exports = new CompagnieService()