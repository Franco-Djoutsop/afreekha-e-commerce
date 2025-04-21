import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import Role from "./Role";
import Adresse from "./Adresse";
import Commande from "./Commande";

class User extends Model {
  public idUser!: number;
  public nom!: string;
  public prenom!: string;
  public date_naissance!: Date;
  public email!: string;
  public tel!: string;
  public mot_de_passe!: string;
  public roles?: Role[];
  public readonly adresses?: Adresse[];
  public readonly commandes?: Commande[];
  public resetToken?: string | null;
  public resetTokenExpires?: Date | null;
}

/**
 * @openapi
 * components:
 *  schemas:
 *    UsersInput:
 *      type: object
 *      required:
 *        - nom
 *        - prenom
 *        - email
 *        - date_naissance
 *        - tel
 *        - mot_de_passe
 *      properties:
 *        nom:
 *          type: string
 *          defaut: Le Futé
 *        prenom:
 *          type: string
 *          defaut: Franck
 *        date_naissance:
 *          type: date
 *          defaut: 2000/01/08
 *        email:
 *          type: string
 *          defaut: laval@gmail.com
 *        tel:
 *          type: string
 *          defaut: 655662233
 *        mot_de_passe:
 *          type: string
 *          defaut: password
 *    UsersInputResponse:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *        prenom:
 *          type: string
 *        date_naissance:
 *          type: date
 *        email:
 *          type: string
 *        tel:
 *          type: string
 *        done:
 *          type: boolean
 *    AuthInputs:
 *      type: object
 *      required:
 *        - email
 *        - tel
 *        - mot_de_passe
 *      properties:
 *        email:
 *          type: string
 *          defaut: laval@gmail.com
 *        tel:
 *          type: string
 *          defaut: 655662233
 *        mot_de_passe:
 *          type: string
 *          defaut: password
 *    AuthInputsResponse:
 *      type: object
 *      properties:
 *        nom:
 *          type: string
 *        prenom:
 *          type: string
 *        date_naissance:
 *          type: date
 *        email:
 *          type: string
 *        tel:
 *          type: string
 *        done:
 *          type: boolean
 */
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
