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
import Adresse from "./Adresse";

// One-to-Many Rel0-89+ (User, { foreignKey: "idUser" }); //each message beyongs to one user

// One User has Many Commands
//<<<<<<< HEAD
User.hasMany(Commande, { foreignKey: "idUser", onDelete: "CASCADE" });
Commande.belongsTo(User, { foreignKey: "idUser" });

// One User has Many Categories
User.hasMany(Categorie, { foreignKey: "idUser", onDelete: "CASCADE" });
Categorie.belongsTo(User, { foreignKey: "idUser" });

//<<<<<<< HEAD
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

// One User has Many Categories
Categorie.hasMany(Article, { foreignKey: "idCategorie" });
Article.belongsTo(Categorie, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

User.hasMany(Adresse, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Adresse.belongsTo(User, { foreignKey: "idUser" });

// One User has Many Categories
//Article.belongsToMany(Image, {  through: ImageArticle, foreignKey: "idArticle"});
//Image.belongsToMany(Article, {through:ImageArticle,foreignKey:"idImage" });

// One User has Many Categories
Categorie.hasMany(SousCategorie, { foreignKey: "idCategorie" });
SousCategorie.belongsTo(Categorie, {
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
Commande.belongsToMany(Article, {
  through: CommandArticle,
  foreignKey: "idCommande",
});
///=======
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
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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
  as: "articles",
});
Article.belongsToMany(Commande, {
  through: CommandArticle,
  foreignKey: "idArticle",
  otherKey: "idCommande",
});
