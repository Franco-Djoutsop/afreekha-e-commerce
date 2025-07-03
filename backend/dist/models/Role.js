"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Role extends sequelize_1.Model {
}
Role.init({
    idRole: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nom: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "client",
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "Role",
    tableName: "roles",
});
exports.default = Role;
