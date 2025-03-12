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
  public quartier!: string;
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
      defaultValue: "Cameroun",
    },
    etat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ville: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quartier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_telephone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "iduSer",
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
