const request = require('supertest');
const app = require('../app');
const COMPAGNIES = require('../models/compagnieModel')
const test = require("node:test");

describe('Compagnies', () => {
    describe('GET /export/minimalDate', () => {
        test('should return only compagnies created after a parameter date', async () => {
            date = '2025-01-01'
            const response = await request(app)
                .get('/export/minimalDate?date=' . date)
                .expect(200);
            count = 0
            for (let i = 0; i < response.body.data.length -1; i++) {
                // expect(response[i].dateCreationUniteLegale.greaterThan(1000))
                if (response[i] === undefined)
                    count++
            }
            console.log(count)
        })

    })
})