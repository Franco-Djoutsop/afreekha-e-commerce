import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

class Role extends Model {
  public idRole!: number;
  public name!: string;
}

Role.init(
  {
    idRole: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Role",
    tableName: "roles",
  }
);

export default Role;
