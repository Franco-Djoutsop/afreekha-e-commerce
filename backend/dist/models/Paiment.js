"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
class Paiement extends sequelize_1.Model {
}
// Initialisation du modèle
Paiement.init({
    idPaiement: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "idUser",
        },
    },
    montant: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    methodePaiement: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false, // Ex: "MOMO", "OM", "Carte Bancaire"
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Paiement",
    tableName: "paiements",
    timestamps: false, // Désactive `updatedAt` si tu ne veux pas de mise à jour automatique
});
// // Association avec `User` (Un utilisateur peut effectuer plusieurs paiements)
// User.hasMany(Paiement, { foreignKey: "idUser", as: "paiements" });
// Paiement.belongsTo(User, { foreignKey: "idUser", as: "user" });
exports.default = Paiement;
