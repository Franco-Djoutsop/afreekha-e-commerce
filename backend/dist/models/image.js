"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Image extends sequelize_1.Model {
}
// Initialisation du modèle
Image.init({
    idImage: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    lien: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    //<<<<<<< HEAD
    //<<<<<<< HEAD
    //=======
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
    collection: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    position: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Image",
    tableName: "images",
});
// // Association avec `Article` (Un article peut avoir plusieurs images)
// Article.hasMany(Image, { foreignKey: "idArticle", as: "images" });
// Image.belongsTo(Article, { foreignKey: "idArticle", as: "article" });
exports.default = Image;
