import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Article from "./Article";
import Image from "./image";

class ImageArticle extends Model {
  public idImageArticle!: number;
  public idArticle!: number;
  public idImage!: number;
}

// Initialisation du modèle
ImageArticle.init(
  {
    idImageArticle: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idArticle: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Article,
        key: "idArticle",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
    idImage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Image,
        key: "idImage",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    },
  },
  {
    sequelize,
    modelName: "ImageArticle",
    tableName: "image_article",
    timestamps: false, // Pas de `createdAt` ni `updatedAt`
    indexes:[
      {
        name:"idx_image_article",
        fields:["idImage","idArticle"]
      }
    ]
  }
);

export default ImageArticle;
