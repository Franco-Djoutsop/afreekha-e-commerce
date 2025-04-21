import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Role from "./Role";

class UserRole extends Model {
  public idUserRole!: number;
  public idUser!: number;
  public idRole!: number;
}

// Initialisation du modèle
UserRole.init(
  {
    idUserRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "idUser",
      },
    },
    idRole: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Role,
        key: "idRole",
      },
    },
  },
  {
    sequelize,
    modelName: "UserRole",
    tableName: "users_roles",
    timestamps: false, // Pas de `createdAt` ni `updatedAt`
  }
);

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

export default UserRole;
