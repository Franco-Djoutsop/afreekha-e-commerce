import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

const Paiement = sequelize.define(
  "Paiement",
  {
    idPaiement: {
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
    montant: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    methodePaiement: {
      type: DataTypes.STRING,
      allowNull: false, // Example: "MOMO", "OM"
    },

    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { tableName: "paiements" }
);

export default Paiement;
