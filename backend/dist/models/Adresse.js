"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
const User_1 = __importDefault(require("./User"));
class Adresse extends sequelize_1.Model {
}
Adresse.init({
    idAdresse: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    titre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    adresse: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pays: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "120",
    },
    etat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    ville: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    numero_telephone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW,
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
    modelName: "Adresse",
    tableName: "Adresse",
});
exports.default = Adresse;
