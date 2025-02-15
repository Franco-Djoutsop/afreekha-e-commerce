import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Role from "./Role";

class User extends Model {
  public idUser!: number;
  public nom!: string;
  public prenom!: string;
  public date_naissance!: Date;
  public email!: string;
  public tel!: string;
  public mot_de_passe!: string;
  public Role?: Role[];
  public resetToken?: string | null;
  public resetTokenExpires?: Date | null;
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
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetTokenExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;
