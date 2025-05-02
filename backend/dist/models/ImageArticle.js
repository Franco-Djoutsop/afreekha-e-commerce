"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const Article_1 = __importDefault(require("./Article"));
const image_1 = __importDefault(require("./image"));
class ImageArticle extends sequelize_1.Model {
}
// Initialisation du modèle
ImageArticle.init({
    idImageArticle: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    idArticle: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Article_1.default,
            key: "idArticle",
        },
    },
    idImage: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: image_1.default,
            key: "idImage",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "ImageArticle",
    tableName: "image_article",
    timestamps: false, // Pas de `createdAt` ni `updatedAt`
});
exports.default = ImageArticle;
