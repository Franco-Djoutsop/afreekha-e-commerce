"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const categorie_1 = __importDefault(require("./categorie")); // Import du modèle Categorie
const SousCategorie_1 = __importDefault(require("./SousCategorie"));
class Article extends sequelize_1.Model {
}
// Initialisation du modèle
Article.init({
    idArticle: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom_article: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    prix: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    promo: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    quantite: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 1,
    },
    caracteristiques: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pourcentage_promo: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true,
    },
    marque: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    couleur: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    taille: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    garantie: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    featured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    inTrend: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    statut: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "En stock",
    },
    quantite_critique: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    idCategorie: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: categorie_1.default,
            key: "idCategorie",
        },
    },
    idSousCategorie: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: SousCategorie_1.default, // Assurez-vous que le modèle SousCategorie est correctement importé
            key: "idSousCategorie",
        },
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Article",
    tableName: "articles",
});
exports.default = Article;
