"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User")); // Import du modèle User
class Categorie extends sequelize_1.Model {
}
// Initialisation du modèle
Categorie.init({
    idCategorie: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    urlLogo: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    featured: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false, // Valeur par défaut pour featured
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "idUser",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Categorie",
    tableName: "categories",
});
exports.default = Categorie;
