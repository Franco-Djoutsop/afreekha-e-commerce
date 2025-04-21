import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Image extends Model {
  public idImage!: number;
  public lien!: string;
  //<<<<<<< HEAD
  //=======
  public idArticle!: number;
  public featured!: boolean;
  public collection!: string;
  public position!: string;
  //>>>>>>> vf1/vf1
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
    //<<<<<<< HEAD
    //<<<<<<< HEAD

    //=======
  featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

  inTrend: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
   },

    collection: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    position: {
      type: DataTypes.STRING,
      allowNull: true,
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
