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
import Paiement from "./Paiment";

// One-to-Many Rel0-89+ (User, { foreignKey: "idUser" }); //each message beyongs to one user

// One User has Many Commands
User.hasMany(Commande, { foreignKey: "idUser", onDelete: "CASCADE" });
Commande.belongsTo(User, { foreignKey: "idUser" });

// One User has Many Categories
User.hasMany(Categorie, { foreignKey: "idUser", onDelete: "CASCADE" });
Categorie.belongsTo(User, { foreignKey: "idUser" });

//<<<<<<< HEAD
// One User has Many Paiement
User.hasMany(Paiement,{foreignKey: "idUser", onDelete: "CASCADE", onUpdate:"CASCADE"});
Paiement.belongsTo(User,{foreignKey:"idUser"});

// One User has Many Categories
Categorie.hasMany(Article, { foreignKey: "idCategorie" });
Article.belongsTo(Categorie, { foreignKey: "idCategorie",onDelete: "CASCADE",onUpdate:"CASCADE" });

// One User has Many Categories
Article.hasMany(Image, { foreignKey: "idArticle" });
Image.belongsTo(Article, { foreignKey: "idArticle", onDelete: "CASCADE",onUpdate:"CASCADE" });

// One User has Many Categories
Categorie.hasMany(SousCategorie, {foreignKey: "idCategorie"});
SousCategorie.belongsTo(Categorie, { foreignKey: "idCategorie",onDelete: "CASCADE",onUpdate:"CASCADE"});
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
Article.belongsToMany(Commande, {
  through: CommandArticle,
  foreignKey: "idArticle",
});

// Define Many-to-Many Associations
User.belongsToMany(Role, { through: UserRole, foreignKey: "idUser" });
Role.belongsToMany(User, { through: UserRole, foreignKey: "idRole" });
