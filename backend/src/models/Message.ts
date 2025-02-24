import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
import User from "./User";

class Message extends Model {
  public idMessage!: number;
  public idUser!: number;
  public contenus!: string;
  public createdAt!: Date;
}

// Initialisation du modèle
Message.init(
  {
    idMessage: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "idUser",
      },
    },
    contenus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Message",
    tableName: "messages",
    timestamps: false, // Désactive `updatedAt` si tu ne veux pas de mise à jour automatique
  }
);

// // Association avec `User` (Un utilisateur peut envoyer plusieurs messages)
// User.hasMany(Message, { foreignKey: "idUser", as: "messages" });
// Message.belongsTo(User, { foreignKey: "idUser", as: "user" });

export default Message;
