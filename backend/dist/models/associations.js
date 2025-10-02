"use strict";
//lorsque l'on veux recuperer des donnees dans des tables associees avec sequelize, on doit ajouter les alias pour bien les indexes. Et les alias sont differents des tableName et c'est tres important.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("./User"));
const Role_1 = __importDefault(require("./Role"));
const userRoles_1 = __importDefault(require("./userRoles"));
const Commande_1 = __importDefault(require("./Commande"));
const categorie_1 = __importDefault(require("./categorie"));
const SousCategorie_1 = __importDefault(require("./SousCategorie"));
const Message_1 = __importDefault(require("./Message"));
const Article_1 = __importDefault(require("./Article"));
const image_1 = __importDefault(require("./image"));
const CommandArticle_1 = __importDefault(require("./CommandArticle"));
const Paiment_1 = __importDefault(require("./Paiment"));
const ArticleImage_1 = __importDefault(require("./ArticleImage"));
const Adresse_1 = __importDefault(require("./Adresse"));
// One-to-Many Rel0-89+ (User, { foreignKey: "idUser" }); //each message beyongs to one user
// One User has Many Commands
//<<<<<<< HEAD
User_1.default.hasMany(Commande_1.default, { foreignKey: "idUser", onDelete: "CASCADE" });
Commande_1.default.belongsTo(User_1.default, { foreignKey: "idUser" });
// One User has Many Categories
User_1.default.hasMany(categorie_1.default, { foreignKey: "idUser", onDelete: "CASCADE" });
categorie_1.default.belongsTo(User_1.default, { foreignKey: "idUser" });
//<<<<<<< HEAD
// One User has Many Paiement
User_1.default.hasMany(Paiment_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Paiment_1.default.belongsTo(User_1.default, { foreignKey: "idUser" });
//One User has Many message
User_1.default.hasMany(Message_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Message_1.default.belongsTo(User_1.default, { foreignKey: "idUser" });
// One User has Many Categories
categorie_1.default.hasMany(Article_1.default, { foreignKey: "idCategorie" });
Article_1.default.belongsTo(categorie_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
User_1.default.hasMany(Adresse_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    as: "adresses",
});
Adresse_1.default.belongsTo(User_1.default, { foreignKey: "idUser", as: "user" });
// One User has Many Categories
//Article.belongsToMany(Image, {  through: ImageArticle, foreignKey: "idArticle"});
//Image.belongsToMany(Article, {through:ImageArticle,foreignKey:"idImage" });
// One User has Many Categories
categorie_1.default.hasMany(SousCategorie_1.default, { foreignKey: "idCategorie" });
SousCategorie_1.default.belongsTo(categorie_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
//=======
// One User has Many Categories
//Categorie.hasMany(Article, { foreignKey: "idCategorie"});
//Article.belongsTo(Categorie, { foreignKey: "idCategorie", onDelete: "CASCADE",onUpdate:"CASCADE"  });
// One User has Many Categories
//Article.hasMany(Image, { foreignKey: "idArticle" });
//Image.belongsTo(Article, { foreignKey: "idArticle",onDelete:"CASCADE",onUpdate:"CASCADE" });
// One User has Many Categories
//Categorie.hasMany(SousCategorie, {foreignKey: "idCategorie"});
//SousCategorie.belongsTo(Categorie, { foreignKey: "idCategorie", onDelete:"CASCADE",onUpdate:"CASCADE" });
//>>>>>>> vf1/vf1
// Many-to-Many: A Command has many Articles and an Article can be in many Commands
///=======
User_1.default.hasMany(categorie_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    //>>>>>>> vf1/vf1
});
categorie_1.default.belongsTo(User_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
User_1.default.hasMany(Commande_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Commande_1.default.belongsTo(User_1.default, {
    foreignKey: "idUser",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Adresse_1.default.hasMany(Commande_1.default, {
    foreignKey: "idAdresse",
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
});
Commande_1.default.belongsTo(Adresse_1.default, {
    foreignKey: "idAdresse",
    onDelete: 'SET NULL',
    onUpdate: "CASCADE",
});
// One categorie has Many article
categorie_1.default.hasMany(Article_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Article_1.default.belongsTo(categorie_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// One categorie has Many sub-Categories
categorie_1.default.hasMany(SousCategorie_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
SousCategorie_1.default.belongsTo(categorie_1.default, {
    foreignKey: "idCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
SousCategorie_1.default.hasMany(Article_1.default, {
    foreignKey: "idSousCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
Article_1.default.belongsTo(SousCategorie_1.default, {
    foreignKey: "idSousCategorie",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
});
// Define Many-to-Many Associations
//Article - Image
Article_1.default.belongsToMany(image_1.default, {
    through: ArticleImage_1.default,
    foreignKey: "idArticle",
});
image_1.default.belongsToMany(Article_1.default, { through: ArticleImage_1.default, foreignKey: "idImage" });
//user - role
User_1.default.belongsToMany(Role_1.default, {
    through: userRoles_1.default,
    foreignKey: "idUser",
    as: "roles",
});
Role_1.default.belongsToMany(User_1.default, {
    through: userRoles_1.default,
    foreignKey: "idRole",
    as: "users",
});
//article - commande
// Many-to-Many: A Command has many Articles and an Article can be in many Commands
Commande_1.default.belongsToMany(Article_1.default, {
    through: CommandArticle_1.default,
    foreignKey: "idCommande",
    otherKey: "idArticle",
    as: "articles",
});
Article_1.default.belongsToMany(Commande_1.default, {
    through: CommandArticle_1.default,
    foreignKey: "idArticle",
    otherKey: "idCommande",
});
