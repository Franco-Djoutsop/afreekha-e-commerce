"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crypto_js_1 = require("../config/crypto-js");
const messageController_1 = __importDefault(require("../controllers/messageController"));
const imageContoller_1 = require("../controllers/imageContoller");
const categorieController_1 = __importDefault(require("../controllers/categorieController"));
const articleController_1 = require("../controllers/articleController");
const sousCategorieController_1 = __importDefault(require("../controllers/sousCategorieController"));
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../middlewares/validation");
const paiementController_1 = __importDefault(require("../controllers/paiementController"));
const factureController_1 = require("../controllers/factureController");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
const userControler_1 = require("../controllers/userControler");
const roleControler_1 = require("../controllers/roleControler");
const homeController_1 = require("../controllers/homeController");
const timerController_1 = require("../controllers/timerController");
const routerAdmin = express_1.default.Router();
//<<<<<<< HEAD
//Admin route
//<<<<<<< HEAD
routerAdmin.route("/").get((req, res) => {
    res.status(200).json({ message: "displays lists of users" });
});
//timer
routerAdmin.route("/timer").post(timerController_1.createTimer);
routerAdmin.route('/timer/:id').put(timerController_1.updateTimer);
routerAdmin.route("/timer").get(timerController_1.getTimer);
routerAdmin.post("/article", 
// crypt.decode,
validation_1.createArticleValidation, articleController_1.ArticleController.create);
routerAdmin.put("/article", 
// crypt.decode,
validation_1.updateArticleValidation, articleController_1.ArticleController.update);
routerAdmin.delete("/article/:id", articleController_1.ArticleController.destroy);
routerAdmin.put("/article-changes-categorie", crypto_js_1.crypt.decode, articleController_1.ArticleController.updateCategories);
routerAdmin.post("/image", validation_1.createImgValidation, imageContoller_1.ImageController.create);
routerAdmin.put("/image", validation_1.updateArticleImg, imageContoller_1.ImageController.update);
routerAdmin.post("/image-delete-collection", imageContoller_1.ImageController.destroy);
routerAdmin.delete("/image/:id", imageContoller_1.ImageController.destroyOne);
routerAdmin.get("/image", imageContoller_1.ImageController.getImage);
//categorie
routerAdmin.post("/categorie", 
// crypt.decode,
validation_2.addcategorie, categorieController_1.default.addCategorie);
routerAdmin.put("/categorie/:id", validation_2.updatecategorie, categorieController_1.default.updateCategorie);
routerAdmin.delete("/categorie/:id", categorieController_1.default.deleteCategorie);
//sous categorie
routerAdmin.post("/sousCategorie", validation_2.createSousCategorie, sousCategorieController_1.default.addsousCategorie);
routerAdmin.put("/sousCategorie/:id", 
//crypt.decode,
validation_2.updatesousCategorie, sousCategorieController_1.default.updateSousCategorie);
routerAdmin.delete("/deleteSousCategorie/:id", sousCategorieController_1.default.deleteSousCategorie);
//message
routerAdmin.get("/detail-message/:id", messageController_1.default.getMessage);
routerAdmin.delete("/message/:id", messageController_1.default.deleteMessage);
routerAdmin.get("/message", messageController_1.default.getAllMessage);
//paiement
routerAdmin.get("/allpaiement", paiementController_1.default.showpaiement);
routerAdmin.get("/detail-paiement/:id", paiementController_1.default.showDetailUserPaiement);
//export default router;
//client route
//=======
//>>>>>>> vf1/vf1
routerAdmin.route("/").get((req, res) => {
    res.status(200).json({ message: "displays lists of users" });
});
routerAdmin.get("/home/:offset", validateTokenHandler_1.validateToken, homeController_1.HomeController.getHomeAdminData);
routerAdmin.post("/article", 
// validateToken,
// crypt.decode,;
validation_1.createArticleValidation, articleController_1.ArticleController.create);
routerAdmin.put("/article", crypto_js_1.crypt.decode, validation_1.updateArticleValidation, articleController_1.ArticleController.update);
routerAdmin.delete("/article/:id", articleController_1.ArticleController.destroy);
routerAdmin.put("/article-changes-categorie", crypto_js_1.crypt.decode, articleController_1.ArticleController.updateCategories);
routerAdmin.post("/image", validation_1.createImgValidation, imageContoller_1.ImageController.create);
routerAdmin.put("/image", validation_1.updateArticleImg, imageContoller_1.ImageController.update);
routerAdmin.delete("/image/:id", imageContoller_1.ImageController.destroy);
routerAdmin.put("/facture", validateTokenHandler_1.validateToken, crypto_js_1.crypt.decode, factureController_1.FactureController.changeStatus);
routerAdmin.get("/facture/:offset", 
//validateToken,
factureController_1.FactureController.getFactureWithArticleUser);
routerAdmin.post("/facture", crypto_js_1.crypt.decode, factureController_1.FactureController.create);
//users route
routerAdmin
    .route("/users/roles/:id")
    .post(crypto_js_1.crypt.decode, validateTokenHandler_1.validateToken, userControler_1.asignRoleToUser);
routerAdmin.route("/users/:id").put(userControler_1.updateUsers);
routerAdmin.route("/users/:id").delete(userControler_1.deleteUsers);
routerAdmin
    .route("/users/:idUser/:idRole")
    .delete(validateTokenHandler_1.validateToken, userControler_1.removeRoleToUser);
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
routerAdmin.route("/roles").post(crypto_js_1.crypt.decode, roleControler_1.createRole);
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
routerAdmin.route("/roles/:id").put(roleControler_1.updateRole);
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
routerAdmin.route("/roleUsers/:id").get(validateTokenHandler_1.validateToken, roleControler_1.roleUsers);
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
routerAdmin.route("/roles/:id").delete(roleControler_1.deleteRole);
exports.default = routerAdmin;
//>>>>>>> vf1/vf1
