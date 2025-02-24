import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User"; // Import du modèle User

class Categorie extends Model {
  public idCategorie!: number;
  public nom!: string;
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
