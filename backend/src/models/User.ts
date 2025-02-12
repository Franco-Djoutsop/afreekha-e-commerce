import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import messages from "./Message";

class User extends Model {
  public idUser!: number;
  public nom!: string;
  public prenom!: string;
  public date_naissance!: Date;
  public email!: string;
  public tel!: string;
  public mot_de_passe!: string;
}
User.init(
  {
    idUser: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_naissance: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    mot_de_passe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  },
);

export default User;
