import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

class Commande extends Model {
  public idCommande!: number;
  public Montant_total!: number;
  public quantite_articles!: number;
  public idUser!: number;
}

// Initialisation du modèle
Commande.init(
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
  {
    sequelize,
    modelName: "Commande",
    tableName: "commandes",
  }
);

// // Association avec l'utilisateur (Un utilisateur peut avoir plusieurs commandes)
// User.hasMany(Commande, { foreignKey: "idUser" });
// Commande.belongsTo(User, { foreignKey: "idUser" });

export default Commande;
