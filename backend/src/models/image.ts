import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Image extends Model {
  public idImage!: number;
  public lien!: string;
//<<<<<<< HEAD
  //<<<<<<< HEAD
  //=======
  public idArticle!: number;
  public isVogue!: string;
//=======
  //public idArticle!: number;
  public featured!: boolean;

//>>>>>>> vf0/vf0
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
    //<<<<<<< HEAD

    //=======
    isVogue: {
      type: DataTypes.STRING,
      //=======
      //featured: {
      // type: DataTypes.BOOLEAN,
      //>>>>>>> vf0/vf0
      allowNull: false,
      defaultValue: false,
      //},
    },
      // inTrend: {
      //type: DataTypes.BOOLEAN,
      //allowNull: false,
      //defaultValue: false,
      // },
//=======
//<<<<<<< HEAD
//<<<<<<< HEAD
   
//=======
    featured: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
//>>>>>>> vf0/vf0
    },

    // idArticle: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Article,
    //     key: "idArticle",
    //   },
    // },
    //>>>>>>> vf1/vf1
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
  });

// // Association avec `Article` (Un article peut avoir plusieurs images)
// Article.hasMany(Image, { foreignKey: "idArticle", as: "images" });
// Image.belongsTo(Article, { foreignKey: "idArticle", as: "article" });

export default Image;
