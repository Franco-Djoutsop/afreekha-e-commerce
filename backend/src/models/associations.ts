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

// One-to-Many Relationship
User.hasMany(Message, { foreignKey: "idUser", onDelete: "CASCADE" }); //a user can have many Message
Message.belongsTo(User, { foreignKey: "idUser" }); //each message beyongs to one user

// One User has Many Commands
User.hasMany(Commande, { foreignKey: "idUser", onDelete: "CASCADE" });
Commande.belongsTo(User, { foreignKey: "idUser" });

// One User has Many Categories
User.hasMany(Categorie, { foreignKey: "idUser", onDelete: "CASCADE" });
Categorie.belongsTo(User, { foreignKey: "idUser" });

// One User has Many Categories
Categorie.hasMany(Article, { foreignKey: "idCategorie", onDelete: "CASCADE" });
Article.belongsTo(Categorie, { foreignKey: "idCategorie" });

// One User has Many Categories
Article.hasMany(Image, { foreignKey: "idArticle", onDelete: "CASCADE" });
Image.belongsTo(Article, { foreignKey: "idArticle" });

// One User has Many Categories
Categorie.hasMany(SousCategorie, {
  foreignKey: "idCategorie",
  onDelete: "CASCADE",
});
SousCategorie.belongsTo(Categorie, { foreignKey: "idCategorie" });

// Many-to-Many: A Command has many Articles and an Article can be in many Commands
Commande.belongsToMany(Article, {
  through: CommandArticle,
  foreignKey: "idCommande",
});
Article.belongsToMany(Commande, {
  through: CommandArticle,
  foreignKey: "idArticle",
});

// Define Many-to-Many Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: "idUser" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "idRole" });
