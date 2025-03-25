import { DataTypes, Model } from "sequelize";
import Article from "./Article";
import { sequelize } from "../config/database";
import Image from "./image";

class ArticleImage extends Model {
  public idArticleImage!: number;
  public idArticle!: number;
  public idImage!: number;
}
ArticleImage.init(
  {
    idArticleImage: {
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
    },
    idImage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Image,
        key: "idImage",
      },
    },
  },
  {
    sequelize,
    modelName: "ArticleImage",
    tableName: "article_image",
    timestamps: false,
  }
);
export default ArticleImage;
