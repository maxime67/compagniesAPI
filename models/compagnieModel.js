const mongoose = require('mongoose');

const uniteLegaleSchema = new mongoose.Schema({
    siren: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    statutDiffusionUniteLegale: {
        type: String,
        enum: ['O', 'N'], // O = Oui, N = Non
        required: true
    },
    dateCreationUniteLegale: {
        type: Date,
        required: true
    },
    sexeUniteLegale: {
        type: String,
        enum: ['M', 'F'], // M = Masculin, F = Féminin
        required: function() {
            return this.categorieJuridiqueUniteLegale === 1000; // Personne physique
        }
    },
    prenom1UniteLegale: {
        type: String,
        trim: true
    },
    prenomUsuelUniteLegale: {
        type: String,
        trim: true
    },
    dateDernierTraitementUniteLegale: {
        type: Date,
        required: true
    },
    nombrePeriodesUniteLegale: {
        type: Number,
        min: 0
    },
    categorieEntreprise: {
        type: String,
        enum: ['GE', 'ETI', 'PME', 'MIC'], // Grande Entreprise, ETI, PME, Micro-entreprise
        required: true
    },
    anneeCategorieEntreprise: {
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear()
    },
    dateDebut: {
        type: Date,
        required: true
    },
    etatAdministratifUniteLegale: {
        type: String,
        enum: ['A', 'C'], // A = Actif, C = Cessé
        required: true,
        default: 'A'
    },
    nomUniteLegale: {
        type: String,
        trim: true,
        uppercase: true
    },
    categorieJuridiqueUniteLegale: {
        type: Number,
        required: true
    },
    activitePrincipaleUniteLegale: {
        type: String,
        required: true,
        match: /^[0-9]{2}\.[0-9]{2}[A-Z]$/ // Format NAF (ex: 32.12Z)
    },
    nomenclatureActivitePrincipaleUniteLegale: {
        type: String,
        enum: ['NAFRev2', 'NAFRev1'],
        default: 'NAFRev2'
    },
    nicSiegeUniteLegale: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
    versionKey: false,
    collection: 'compagnie' // Spécifie le nom exact de ta collection existante
});

module.exports = mongoose.model('UniteLegale', uniteLegaleSchema, 'compagnie');
