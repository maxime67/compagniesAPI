const request = require('supertest');
const app = require('../app');
const COMPAGNIES = require('../models/compagnieModel');

describe('Compagnies', () => {
    describe('GET /export/minimalDate', () => {
        test('should return only compagnies created after a parameter date', async () => {
            const date = '2024-01-01';

            const response = await request(app)
                .get(`/export/minimalDate?date=${date}`)
                .expect(200);

            // Vérification que la réponse est bien structurée
            expect(response.body).toHaveProperty('data');
            expect(response.body).toHaveProperty('total');
            expect(Array.isArray(response.body.data)).toBe(true);

            let undefinedCount = 0;
            let validCount = 0;

            // Vérification de chaque élément
            for (let i = 0; i < response.body.data.length; i++) {
                const compagnie = response.body.data[i];
                if (compagnie === undefined || compagnie === null) {
                    undefinedCount++;
                } else {
                    validCount++;

                    // Vérifier que la compagnie a les propriétés attendues
                    expect(compagnie).toHaveProperty('siren');
                    expect(compagnie).toHaveProperty('dateCreationUniteLegale');

                    // Vérifier que la date de création est postérieure à la date spécifiée
                    const creationYear = new Date(compagnie.dateCreationUniteLegale).getFullYear();
                    expect(creationYear).toBeGreaterThanOrEqual(parseInt(date));
                }
            }

            console.log(`Éléments valides: ${validCount}`);
            console.log(`Éléments undefined: ${undefinedCount}`);

            expect(undefinedCount).toBe(0);

            expect(validCount).toBeGreaterThan(0);
        });

        test('should handle invalid date parameter', async () => {
            const response = await request(app)
                .get('/export/minimalDate?date=invalid')
                .expect(400);

            expect(response.body).toHaveProperty('error', true);
            expect(response.body).toHaveProperty('message');
        });

        test('should handle missing date parameter', async () => {
            const response = await request(app)
                .get('/export/minimalDate')
                .expect(400);

            expect(response.body).toHaveProperty('error', true);
            expect(response.body).toHaveProperty('message');
        });
    });
});