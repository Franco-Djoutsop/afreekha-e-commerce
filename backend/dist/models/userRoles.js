"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
const User_1 = __importDefault(require("./User"));
const Role_1 = __importDefault(require("./Role"));
class UserRole extends sequelize_1.Model {
}
// Initialisation du modèle
UserRole.init({
    idUserRole: {
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
    idRole: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role_1.default,
            key: "idRole",
        },
    },
}, {
    sequelize: database_1.sequelize,
    modelName: "UserRole",
    tableName: "users_roles",
    timestamps: false, // Pas de `createdAt` ni `updatedAt`
});
// // Associations avec `User` et `Role`
// User.belongsToMany(Role, {
//   through: UserRole,
//   foreignKey: "idUser",
//   as: "roles",
// });
// Role.belongsToMany(User, {
//   through: UserRole,
//   foreignKey: "idRole",
//   as: "users",
// });
exports.default = UserRole;
