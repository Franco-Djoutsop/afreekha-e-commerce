"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const categorie_1 = __importDefault(require("./categorie"));
//<<<<<<< HEAD
//=======
class SousCategorie extends sequelize_1.Model {
}
// Initialisation du modèle
SousCategorie.init(
//>>>>>>> vf1/vf1
{
    idSousCategorie: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    idCategorie: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: categorie_1.default,
            key: "idCategorie",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "SousCategorie",
    tableName: "sous_categories",
    timestamps: false, // Désactive `updatedAt` si non nécessaire
});
// // Association avec `Categorie` (Une catégorie peut avoir plusieurs sous-catégories)
// Categorie.hasMany(SousCategorie, { foreignKey: "idCategorie", as: "sousCategories" });
// SousCategorie.belongsTo(Categorie, { foreignKey: "idCategorie", as: "categorie" });
exports.default = SousCategorie;
