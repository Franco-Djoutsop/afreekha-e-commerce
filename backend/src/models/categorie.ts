import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

const Categorie = sequelize.define(
  "categories",
  {
    idCategorie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "idUser",
      },
    },
  },
  { tableName: "categories" }
);

export default Categorie;
