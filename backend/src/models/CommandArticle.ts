import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Commande from "./Commande";
import Article from "./Article";

class CommandArticle extends Model {
  public idCommandArticle!: number;
  public idCommande!: number;
  public idArticle!: number;
  public quantite!: string;
  public prix_achat!: number;
  public prix_total!: number;
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
    prix_achat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    prix_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite : {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "CommandArticle",
    tableName: "commandes_articles",
  }
);

export default CommandArticle;
