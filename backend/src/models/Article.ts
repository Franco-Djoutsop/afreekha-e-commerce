import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Categorie from "./categorie"; // Import du modèle Categorie

class Article extends Model {
  public idArticle!: number;
  public nom_article!: string;
  public prix!: number;
  public promo!: boolean;
  public quantite!: number;
  public caracteristiques!: string;
  public pourcentage_promo?: number;
  public marque?: string;
  public garantie?: string;
  public idCategorie!: number;
}

// Initialisation du modèle
Article.init(
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
  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
  }
);

export default Article;
