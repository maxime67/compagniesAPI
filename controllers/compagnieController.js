var compagnieService = require('../services/compagnieService');


class CompagnieController {
    async findAll(req, res) {
        try {
            const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100
            const page = Math.max(parseInt(req.query.page) || 1, 1); // Min 1

            const result = await compagnieService.findAll(limit, page);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: true,
                message: "Erreur interne du serveur"
            });
        }
    }

    async findByMinimalCreationDate(req, res) {
        try {
            const date = req.query.date || req.params.date;
            const limit = Math.min(parseInt(req.query.limit) || 20, 100); // Max 100
            const page = Math.max(parseInt(req.query.page) || 1, 1); // Min 1

            if (!date) {
                return res.status(400).json({
                    error: true,
                    message: "Le paramètre date est requis"
                });
            }

            // Validation de la date
            const dateNumber = parseInt(date);
            if (isNaN(dateNumber) || dateNumber < 2000 || dateNumber > new Date().getFullYear()) {
                return res.status(400).json({
                    error: true,
                    message: "La date doit être une année valide (2000 à aujourd'hui)"
                });
            }

            const result = await compagnieService.findByMinimalCreationDate(dateNumber, limit, page);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: true,
                message: "Erreur interne du serveur"
            });
        }
    }
    async exportByMinimalCreationDate(req, res) {
        try {
            const date = req.query.date;

            if (!date) {
                return res.status(400).json({
                    error: true,
                    message: "Le paramètre date est requis"
                });
            }

            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Transfer-Encoding', 'chunked');
            res.write('{"data":[');

            let isFirst = true;

            const processed = await compagnieService.processByMinimalCreationDateBatch(
                parseInt(date),
                1000, // batch de 1000
                async (batch, page) => {
                    for (const item of batch) {
                        if (!isFirst) {
                            res.write(',');
                        }
                        res.write(JSON.stringify(item));
                        isFirst = false;
                    }
                }
            );

            res.write(`],"total":${processed}}`);
            res.end();
        } catch (error) {
            console.error(error);
            if (!res.headersSent) {
                res.status(500).json({
                    error: true,
                    message: "Erreur interne du serveur"
                });
            }
        }
    }
}

module.exports = new CompagnieController()