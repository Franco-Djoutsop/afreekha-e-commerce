import User from "./User";
import Role from "./Role";
import UserRole from "./userRoles";
import ImageArticle from "./ImageArticle";
import Commande from "./Commande";
import Categorie from "./categorie";
import SousCategorie from "./SousCategorie";
import Message from "./Message";
import Article from "./Article";
import Image from "./image";
import CommandArticle from "./CommandArticle";
import Paiement from "./Paiment";
import ArticleImage from "./ArticleImage";

// One User has Many Paiement
User.hasMany(Paiement, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Paiement.belongsTo(User, { foreignKey: "idUser" });

//One User has Many message
User.hasMany(Message, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Message.belongsTo(User, { foreignKey: "idUser" });

User.hasMany(Categorie, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
  //>>>>>>> vf1/vf1
});
Categorie.belongsTo(User, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Commande, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Commande.belongsTo(User, {
  foreignKey: "idUser",
});

// One categorie has Many article
Categorie.hasMany(Article, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Article.belongsTo(Categorie, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// One categorie has Many sub-Categories
Categorie.hasMany(SousCategorie, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

SousCategorie.belongsTo(Categorie, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
SousCategorie.hasMany(Article, {
  foreignKey: "idSousCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Article.belongsTo(SousCategorie, {
  foreignKey: "idSousCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// Define Many-to-Many Associations
//Article - Image
Article.belongsToMany(Image, {
  through: ArticleImage,
  foreignKey: "idArticle",
});
Image.belongsToMany(Article, { through: ArticleImage, foreignKey: "idImage" });

//user - role
User.belongsToMany(Role, { through: UserRole, foreignKey: "idUser" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "idRole" });

//article - commande
// Many-to-Many: A Command has many Articles and an Article can be in many Commands

Commande.belongsToMany(Article, {
  through: CommandArticle,
  foreignKey: "idCommande",
  otherKey: "idArticle",
//<<<<<<< HEAD
  as: "Article",
}); 
Article.belongsToMany(Commande, {
  through: CommandArticle,
  foreignKey: "idArticle",
  otherKey: "idCommande",
//<<<<<<< HEAD
  as:"Commandes"
//<<<<<<< HEAD
});

