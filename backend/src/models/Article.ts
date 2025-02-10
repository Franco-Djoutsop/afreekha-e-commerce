import { sequelize } from "../config/database";
import { DataTypes } from "sequelize";
import Categorie from "./categorie";

const Article = sequelize.define(
  "article",
  {
    idArticle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom_article: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    prix: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    promo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    quantite: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    caracteristiques: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    pourcentage_promo: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },

    marque: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    garantie: {
      type: DataTypes.STRING,
      allowNull: true,
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
  { tableName: "articles" }
);

export default Article;
