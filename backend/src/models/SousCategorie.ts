import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Categorie from "./categorie";

class SousCategorie extends Model {
  public idSousCategorie!: number;
  public nom!: string;
  public idCategorie!: number;
}

// Initialisation du modèle
SousCategorie.init(
  {
    idSousCategorie: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    idCategorie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categorie,
        key: "idCategorie",
      },
    },
  },
  {
    sequelize,
    modelName: "SousCategorie",
    tableName: "sous_categories",
    timestamps: false, // Désactive `updatedAt` si non nécessaire
  }
);

// // Association avec `Categorie` (Une catégorie peut avoir plusieurs sous-catégories)
// Categorie.hasMany(SousCategorie, { foreignKey: "idCategorie", as: "sousCategories" });
// SousCategorie.belongsTo(Categorie, { foreignKey: "idCategorie", as: "categorie" });

export default SousCategorie;
