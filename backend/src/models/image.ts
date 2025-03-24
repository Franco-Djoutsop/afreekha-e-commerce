import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Image extends Model {
  public idImage!: number;
  public lien!: string;
}

// Initialisation du modèle
Image.init(
  {
    idImage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    lien: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
  }
);

// // Association avec `Article` (Un article peut avoir plusieurs images)
// Article.hasMany(Image, { foreignKey: "idArticle", as: "images" });
// Image.belongsTo(Article, { foreignKey: "idArticle", as: "article" });

export default Image;
