import { sequelize } from "../config/database";
import { DataTypes, Model } from "sequelize";
import User from "./User";

class Adresse extends Model {
  public idAdresse!: number;
  public titre!: string;
  public adresse!: string;
  public pays!: string;
  public etat!: string;
  public ville!: string;
  public numero_telephone!: string;
  public idUser!: number;
}

Adresse.init(
  {
    idAdresse: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adresse: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pays: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "120",
    },
    etat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt : {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt : {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
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
    modelName: "Adresse",
    tableName: "Adresse",
  }
);

export default Adresse;
