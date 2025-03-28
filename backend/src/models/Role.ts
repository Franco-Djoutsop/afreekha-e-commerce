import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Role extends Model {
  public idRole!: number;
  public nom!: string;
}

Role.init(
  {
    idRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "client",
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
  }
);

export default Role;
