"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
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
exports.sequelize = sequelize;
// Import des modèles pour que Sequelize puisse les enregistrer avant de synchroniser
require("../models/Article");
require("../models/categorie");
require("../models/CommandArticle");
require("../models/Commande");
require("../models/image");
require("../models/Message");
require("../models/Paiment");
require("../models/Role");
require("../models/SousCategorie");
require("../models/User");
require("../models/userRoles");
require("../models/associations");
//test the connection
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.authenticate();
        console.log("All models were synchronized successfully!");
        yield sequelize.sync({ force: false, alter: false }); //sync models
        console.log("database connected succesfully !!");
    }
    catch (error) {
        console.log("Unable to connect to the database:", error);
    }
});
exports.connectDB = connectDB;
