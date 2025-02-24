import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

class Paiement extends Model {
  public idPaiement!: number;
  public idUser!: number;
  public montant!: number;
  public methodePaiement!: string;
  public date!: Date;
}

// Initialisation du modèle
Paiement.init(
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
      allowNull: false, // Ex: "MOMO", "OM", "Carte Bancaire"
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Paiement",
    tableName: "paiements",
    timestamps: false, // Désactive `updatedAt` si tu ne veux pas de mise à jour automatique
  }
);

// // Association avec `User` (Un utilisateur peut effectuer plusieurs paiements)
// User.hasMany(Paiement, { foreignKey: "idUser", as: "paiements" });
// Paiement.belongsTo(User, { foreignKey: "idUser", as: "user" });

export default Paiement;
