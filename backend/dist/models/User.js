"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class User extends sequelize_1.Model {
}
/**
 * @openapi
 * components:
 *  schemas:
 *    UsersInput:
 *      type: object
 *      required:
 *        - nom
 *        - prenom
 *        - email
 *        - date_naissance
 *        - tel
 *        - mot_de_passe
 *      properties:
 *        nom:
 *          type: string
 *          defaut: Le Futé
 *        prenom:
 *          type: string
 *          defaut: Franck
 *        date_naissance:
 *          type: date
 *          defaut: 2000/01/08
 *        email:
 *          type: string
 *          defaut: laval@gmail.com
 *        tel:
 *          type: string
 *          defaut: 655662233
 *        mot_de_passe:
 *          type: string
 *          defaut: password
 *    UsersInputResponse:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *        prenom:
 *          type: string
 *        date_naissance:
 *          type: date
 *        email:
 *          type: string
 *        tel:
 *          type: string
 *        done:
 *          type: boolean
 *    AuthInputs:
 *      type: object
 *      required:
 *        - email
 *        - tel
 *        - mot_de_passe
 *      properties:
 *        email:
 *          type: string
 *          defaut: laval@gmail.com
 *        tel:
 *          type: string
 *          defaut: 655662233
 *        mot_de_passe:
 *          type: string
 *          defaut: password
 *    AuthInputsResponse:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *        prenom:
 *          type: string
 *        date_naissance:
 *          type: date
 *        email:
 *          type: string
 *        tel:
 *          type: string
 *        done:
 *          type: boolean
 */
User.init({
    idUser: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    date_naissance: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    tel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    mot_de_passe: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    resetToken: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "users",
});
exports.default = User;
