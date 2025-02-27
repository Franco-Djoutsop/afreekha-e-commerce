import User from "./User";
import Role from "./Role";
import UserRole from "./userRoles";
import Commande from "./Commande";
import Categorie from "./categorie";
import SousCategorie from "./SousCategorie";
import Message from "./Message";
import Article from "./Article";
import Image from "./image";
import CommandArticle from "./CommandArticle";

// One-to-Many Rel0-89+ (User, { foreignKey: "idUser" }); //each message beyongs to one user

// One User has Many Commands
User.hasMany(Categorie, {
  foreignKey: "idUser",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
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

// One User has Many Categories
Article.hasMany(Image, {
  foreignKey: "idArticle",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Image.belongsTo(Article, {
  foreignKey: "idArticle",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// One User has Many Categories
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

// Define Many-to-Many Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: "idUser" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "idRole" });

//article - commande
// Many-to-Many: A Command has many Articles and an Article can be in many Commands
Commande.belongsToMany(Article, {
  through: CommandArticle,
  foreignKey: "idCommande",
});
Article.belongsToMany(Commande, {
  through: CommandArticle,
  foreignKey: "idArticle",
});
