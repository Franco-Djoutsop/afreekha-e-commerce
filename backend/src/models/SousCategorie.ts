import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Categorie from "./categorie";

const SousCategorie = sequelize.define(
  "sous_categories",
  {
    idSousCategorie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idCategorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categorie,
        key: "idCategorie",
      },
    },
  },
  { tableName: "sous_categories" }
);

export default SousCategorie;
