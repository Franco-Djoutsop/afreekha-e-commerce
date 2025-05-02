"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Commande_1 = __importDefault(require("./Commande"));
const Article_1 = __importDefault(require("./Article"));
class CommandArticle extends sequelize_1.Model {
}
// Initialisation du modèle
CommandArticle.init({
    idCommandArticle: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idCommande: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Commande_1.default,
            key: "idCommande",
        },
    },
    idArticle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Article_1.default,
            key: "idArticle",
        },
    },
    quantite: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "CommandArticle",
    tableName: "commandes_articles",
});
exports.default = CommandArticle;
