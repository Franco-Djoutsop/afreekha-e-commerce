import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User"; // Import du modèle User

class Categorie extends Model {
  public idCategorie!: number;
  public nom!: string;
  public urlLogo!: string;
  public featured!: boolean;
  public idUser!: number;
}

// Initialisation du modèle
Categorie.init(
  {
    idCategorie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    urlLogo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Valeur par défaut pour featured
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
    modelName: "Categorie",
    tableName: "categories",
  }
);

export default Categorie;
