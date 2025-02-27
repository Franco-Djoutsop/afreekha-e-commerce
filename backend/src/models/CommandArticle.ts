import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Commande from "./Commande";
import Article from "./Article";

class CommandArticle extends Model {
  public idCommandArticle!: number;
  public idCommande!: number;
  public idArticle!: number;
  public statut!: string;
  public date!: Date;
}

// Initialisation du modèle
CommandArticle.init(
  {
    idCommandArticle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idCommande: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Commande,
        key: "idCommande",
      },
    },
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Article,
        key: "idArticle",
      },
    },
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Encours", // Exemple : "Encours", "Paye"
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "CommandArticle",
    tableName: "commandes_articles",
  }
);

export default CommandArticle;
