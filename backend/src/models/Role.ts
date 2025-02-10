import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

const Role = sequelize.define(
  "roles",
  {
    idRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { tableName: "roles" }
);

export default Role;
