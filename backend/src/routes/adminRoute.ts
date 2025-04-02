import express, { Express } from "express";
import { crypt } from "../config/crypto-js";
import gest_message from "../controllers/messageController";
import { ImageController } from "../controllers/imageContoller";
import gest_categorie from "../controllers/categorieController";
import { ArticleController } from "../controllers/articleController";
import gest_sous_categorie from "../controllers/sousCategorieController";

import {
  createArticleValidation,
  updateArticleValidation,
  createImgValidation,
  updateArticleImg,
} from "../middlewares/validation";
import {
  addcategorie,
  updatecategorie,
  updatesousCategorie,
  createSousCategorie,
} from "../middlewares/validation";
import gest_paiement from "../controllers/paiementController";

import { FactureController } from "../controllers/factureController";
import { validateToken } from "../middlewares/validateTokenHandler";
import {
  asignRoleToUser,
  deleteUsers,
  removeRoleToUser,
  updateUsers,
} from "../controllers/userControler";
import {
  createRole,
  deleteRole,
  roleUsers,
  updateRole,
} from "../controllers/roleControler";
import { HomeController } from "../controllers/homeController";

const routerAdmin = express.Router();

//<<<<<<< HEAD
//Admin route
//<<<<<<< HEAD
routerAdmin.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});

//<<<<<<< HEAD
routerAdmin.post(
  "/article",
  crypt.decode,
  createArticleValidation,
  ArticleController.create
);
routerAdmin.put(
  "/article",
  crypt.decode,
  updateArticleValidation,
  ArticleController.update
);
routerAdmin.delete("/article/:id", ArticleController.destroy);
routerAdmin.put(
  "/article-changes-categorie",
  crypt.decode,
  ArticleController.updateCategories
);
routerAdmin.post("/image", createImgValidation, ImageController.create);
routerAdmin.put("/image", updateArticleImg, ImageController.update);
routerAdmin.delete("/image/:id", ImageController.destroy);

//categorie
routerAdmin.post(
  "/categorie",
  crypt.decode,
  addcategorie,
  gest_categorie.addCategorie
);
routerAdmin.put(
  "/categorie/:id",
  updatecategorie,
  gest_categorie.updateCategorie
);
routerAdmin.delete("/categorie/:id", gest_categorie.deleteCategorie);
//=======
routerAdmin.post("/article", createArticleValidation, ArticleController.create);
routerAdmin.put('/article', crypt.decode, updateArticleValidation, ArticleController.update)
routerAdmin.delete('/article/:id', ArticleController.destroy);
routerAdmin.put('/article-changes-categorie', crypt.decode, ArticleController.updateCategories)
routerAdmin.post('/image', createImgValidation, ImageController.create);
routerAdmin.put('/image', updateArticleImg, ImageController.update);
routerAdmin.delete('/image/:id', ImageController.destroy);
routerAdmin.get('/image', ImageController.getImage);

//categorie
routerAdmin.post('/categorie', addcategorie, gest_categorie.addCategorie);
routerAdmin.put('/categorie/:id',updatecategorie, gest_categorie.updateCategorie);
routerAdmin.delete('/categorie/:id',gest_categorie.deleteCategorie);
//>>>>>>> vf0/vf0

//sous categorie
routerAdmin.post(
  "/sousCategorie",
  createSousCategorie,
  gest_sous_categorie.addsousCategorie
);
routerAdmin.put(
  "/sousCategorie/:id",
  crypt.decode,
  updatesousCategorie,
  gest_sous_categorie.updateSousCategorie
);
routerAdmin.delete(
  "/deleteSousCategorie/:id",
  gest_sous_categorie.deleteSousCategorie
);

//message
routerAdmin.get("/detail-message/:id", gest_message.getMessage);
routerAdmin.delete("/message/:id", gest_message.deleteMessage);
routerAdmin.get("/message", gest_message.getAllMessage);

//paiement
routerAdmin.get("/allpaiement", gest_paiement.showpaiement);
routerAdmin.get("/detail-paiement/:id", gest_paiement.showDetailUserPaiement);
//export default router;

//client route
//=======
//>>>>>>> vf1/vf1
routerAdmin.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});

routerAdmin.get("/home/:offset", HomeController.getHomeAdminData);

//<<<<<<< HEAD
routerAdmin.post(
  "/article",
  // validateToken,
  // crypt.decode,
  createArticleValidation,
  ArticleController.create
);

//=======
//>>>>>>> vf0/vf0
routerAdmin.put(
  "/article",
  crypt.decode,
  updateArticleValidation,
  ArticleController.update
);
routerAdmin.delete("/article/:id", ArticleController.destroy);
routerAdmin.put(
  "/article-changes-categorie",
  crypt.decode,
  ArticleController.updateCategories
);
routerAdmin.post("/image", createImgValidation, ImageController.create);
routerAdmin.put("/image", updateArticleImg, ImageController.update);
routerAdmin.delete("/image/:id", ImageController.destroy);

routerAdmin.put("/facture", crypt.decode, FactureController.changeStatus);
routerAdmin.get(
  "/facture/:offset",
  FactureController.getFactureWithArticleUser
);
routerAdmin.post("/facture", crypt.decode, FactureController.create);

//users route
routerAdmin
  .route("/users/roles/:id")
  .post(crypt.decode, validateToken, asignRoleToUser);
routerAdmin.route("/users/:id").patch(crypt.decode, updateUsers);
routerAdmin.route("/users/:id").delete(deleteUsers);
routerAdmin
  .route("/users/:idUser/:idRole")
  .delete(validateToken, removeRoleToUser);

//role route
/**
 * @openapi
 * /api/admin/roles:
 *  post:
 *    summary: creer un nouveau role
 *    tags:
 *      - Roles
 *    securiry:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - nom
 *            properties:
 *              nom:
 *                type: string
 *                description: Nom du nouveau role
 *    responses:
 *      201:
 *        description: Role cree avec succes
 *      400:
 *        description: Donnees invalides
 *      401:
 *        description: Non autorise, probleme d'authentification
 *      500:
 *        description: Erreur serveur
 */
routerAdmin.route("/roles").post( crypt.decode,createRole);

/**
 * @openapi
 * /api/admin/roles/{idRole}:
 *  put:
 *    summary: Mettre à jour un rôle
 *    tags:
 *      - Roles
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: idRole
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID du rôle à mettre à jour
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              nom:
 *                type: string
 *                description: Nouveau nom du rôle
 *    responses:
 *      200:
 *        description: Rôle mis à jour avec succès
 *      400:
 *        description: Données invalides
 *      401:
 *        description: Non autorisé, problème d'authentification
 *      404:
 *        description: Rôle non trouvé
 *      500:
 *        description: Erreur liée au serveur
 */

routerAdmin.route("/roles/:id").put(crypt.decode,updateRole);

/**
 * @openapi
 * /api/admin/roleUsers/{idRole}:
 *  get:
 *    summary: Afficher tous les utilisateur qui ont un meme role
 *    tags:
 *      - Roles
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: idRole
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          description : id du role
 *    responses:
 *      200:
 *        description: Liste des roles avec les utilisateurs y afferents
 *      400:
 *        description : Donnees invalides
 *      401:
 *        description : Nom autorise, probleme d'authentification
 *      404:
 *        description : Role non trouve
 */
routerAdmin.route("/roleUsers/:id").get(validateToken, roleUsers);

/**
 * @openapi
 * /api/admin/roles/{idRole}:
 *  delete:
 *    summary: Supprimer un role en fonction de son idRole
 *    tags:
 *      - Roles
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: idRole
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          description: id du role a supprime
 *    responses:
 *      200:
 *        description: Role avec id = idRole supprimer avec success
 *      400:
 *        description : Donnees invalides
 *      401:
 *        description : Nom autorise, probleme d'authentification
 *      404:
 *        description : Role non trouve
 */
routerAdmin.route("/roles/:id").delete(deleteRole);
export default routerAdmin;
//>>>>>>> vf1/vf1
