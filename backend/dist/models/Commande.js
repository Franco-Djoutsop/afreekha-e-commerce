"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
const Adresse_1 = __importDefault(require("./Adresse"));
class Commande extends sequelize_1.Model {
}
// Initialisation du modèle
Commande.init({
    idCommande: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Montant_total: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantite_articles: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    statut: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "En attente", // Exemple "En entente", "payé"
    },
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User_1.default,
            key: "idUser",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    idAdresse: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Adresse_1.default,
            key: "idAdresse",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE"
    }
}, {
    sequelize: database_1.sequelize,
    modelName: "Commande",
    tableName: "commandes",
    indexes: [
        {
            name: "idx_user",
            fields: ['idUser']
        }
    ]
});
// // Association avec l'utilisateur (Un utilisateur peut avoir plusieurs commandes)
// User.hasMany(Commande, { foreignKey: "idUser" });
// Commande.belongsTo(User, { foreignKey: "idUser" });
exports.default = Commande;
