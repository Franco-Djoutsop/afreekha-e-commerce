import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Categorie from "./categorie"; // Import du modèle Categorie
import SousCategorie from "./SousCategorie";

class Article extends Model {
  public idArticle!: number;
  public nom_article!: string;
  public prix!: number;
  public promo!: boolean;
  public quantite!: number;
  public caracteristiques?: string;
  public pourcentage_promo?: number;
  public marque?: string;
  public garantie?: string;
  public couleur?: string;
  public taille?: string;
  public idCategorie!: number;
  public idSousCategorie!: number;
  public featured!: boolean;
  public inTrend!: boolean;
  public statut!: "En stock" | "Hors Stock";
  public quantite_critique!: number;
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
      defaultValue: 1,
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
    couleur: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    taille: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    garantie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    inTrend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "En stock",
    },
    quantite_critique: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5,
    },
    idCategorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categorie,
        key: "idCategorie",
      },
    },
    idSousCategorie: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: SousCategorie, // Assurez-vous que le modèle SousCategorie est correctement importé
        key: "idSousCategorie",
      },
    }
  },

  {
    sequelize,
    modelName: "Article",
    tableName: "articles",
  }
);

export default Article;
