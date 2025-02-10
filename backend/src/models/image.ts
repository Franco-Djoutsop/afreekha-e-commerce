import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import Article from "./Article";

const Image = sequelize.define(
  "image",
  {
    idImage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    lien: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Article,
        key: "idArticle",
      },
    },
  },
  { tableName: "images" }
);

export default Image;
