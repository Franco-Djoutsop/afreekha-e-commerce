import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";
import Adresse from "./Adresse";

class Commande extends Model {
  public idCommande!: number;
  public Montant_total!: number;
  public quantite_articles!: number;
  public statut!: string;
  public idUser!: number;
  public idAdresse!: number | null;
  public createdAt?: string;
  public updatedAt?: string;
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
    statut: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "En attente", // Exemple "En entente", "payé"
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "idUser",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    idAdresse: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Adresse,
        key: "idAdresse",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE"
    }
  },
  {
    sequelize,
    modelName: "Commande",
    tableName: "commandes",
    indexes: [
      {
        name: "idx_user",
        fields: ['idUser']
      }
    ]
  }
);

// // Association avec l'utilisateur (Un utilisateur peut avoir plusieurs commandes)
// User.hasMany(Commande, { foreignKey: "idUser" });
// Commande.belongsTo(User, { foreignKey: "idUser" });

export default Commande;
