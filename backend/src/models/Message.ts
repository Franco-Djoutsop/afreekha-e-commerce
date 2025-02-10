import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

const messages = sequelize.define(
  "messages",
  {
    idMessage: {
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
    contenus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "messages" }
);

export default messages;
