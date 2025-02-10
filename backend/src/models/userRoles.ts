import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Role from "./Role";

const UserRole = sequelize.define(
  "user_roles",
  {
    idUserRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    idUser: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "idUser",
      },
    },

    idRole: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: "idRole",
      },
    },
  },
  { tableName: "users_roles" }
);

export default UserRole;
