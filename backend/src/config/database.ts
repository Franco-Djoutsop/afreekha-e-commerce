import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,

  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: console.log, //disable loging in production
  }
  // {
  //     dialect: "mysql",   // Assure-toi d'utiliser "mysql"
  //   host: "localhost",  // ou l'adresse de ton serveur MySQL
  //   username: "root",   // Utilise ton nom d'utilisateur MySQL
  //   password: "", // Utilise ton mot de passe MySQL
  //   database: "afreekha", // Le nom de ta base de données
  // }
);

// Import des modèles pour que Sequelize puisse les enregistrer avant de synchroniser
import "../models/Article";
import "../models/categorie";
import "../models/CommandArticle";
import "../models/Commande";
import "../models/image";
import "../models/Message";
import "../models/Paiment";
import "../models/Role";
import "../models/SousCategorie";
import "../models/User";
import "../models/userRoles";
import "../models/associations";

//test the connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("All models were synchronized successfully!");
    await sequelize.sync({ force: false, alter: false }); //sync models
    console.log("database connected succesfully !!");
  } catch (error: any) {
    console.log("Unable to connect to the database:", error);
  }
};

export { sequelize, connectDB };
