import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

const Commande = sequelize.define(
  "commandes",
  {
    idCommande: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Montant_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantite_articles: {
      type: DataTypes.FLOAT,
      allowNull: false,
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
  { tableName: "commandes" }
);

export default Commande;
