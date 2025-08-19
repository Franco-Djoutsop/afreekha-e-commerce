"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//<<<<<<< HEAD
const messageController_1 = __importDefault(require("../controllers/messageController"));
const paiementController_1 = __importDefault(require("../controllers/paiementController"));
const categorieController_1 = __importDefault(require("../controllers/categorieController"));
const validation_1 = require("../middlewares/validation");
const validation_2 = require("../middlewares/validation");
const articleController_1 = require("../controllers/articleController");
//=======
const userControler_1 = require("../controllers/userControler");
const validationsRules_1 = require("../middlewares/validationsRules");
const validate_1 = require("../middlewares/validate");
const roleControler_1 = require("../controllers/roleControler");
const authUserControler_1 = require("../controllers/authUserControler");
const validateTokenHandler_1 = require("../middlewares/validateTokenHandler");
//import { ArticleController } from "../controllers/articleController";
//>>>>>>> vf1/vf1
const commandController_1 = require("../controllers/commandController");
const sousCategorieController_1 = __importDefault(require("../controllers/sousCategorieController"));
const crypto_js_1 = require("../config/crypto-js");
//<<<<<<< HEAD
//=======
//import { createCommandeValidation } from "../middlewares/validation";
const factureController_1 = require("../controllers/factureController");
const homeController_1 = require("../controllers/homeController");
const adresseController_1 = require("../controllers/adresseController");
const router = express_1.default.Router();
router.route("/").get((req, res) => {
    res.status(200).json({ message: "displays lists of users" });
});
router.get("/home-data", homeController_1.HomeController.getHomeData);
/**
 * @openapi
 * /api/users:
 *  get:
 *    summary: Récupérer tous les utilisateurs
 *    tags:
 *      - Utilisateurs
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Liste de tous les utilisateurs
 *      401:
 *        description: Non autorisé
 */
// router.route("/users").get(crypt.decode, allUSers);
router.route("/users").get(userControler_1.allUSers);
//update user by user
router.route("/profile").put(validateTokenHandler_1.validateToken, crypto_js_1.crypt.decode, userControler_1.updateUserByUser);
//<<<<<<< HEAD
//categorie
router.get("/allCategorie", categorieController_1.default.getCategorie);
router.get("/sousCategorieOfCategorie/:id", categorieController_1.default.sousCategorie);
router.get("/articleOfCategorie/:id", categorieController_1.default.ArticleOfCategorie);
//sous categorie
router.get("/allSousCategorie", sousCategorieController_1.default.allSousCategorie);
router.get("/articleOfSousCategorie/:id", sousCategorieController_1.default.articleOfSousCategorie);
router.get("/categorieAndSousCategorie", sousCategorieController_1.default.categorieAndSousCategorie);
//message
router.post("/message", crypto_js_1.crypt.decode, validation_1.addMessage, messageController_1.default.createMessage);
//paiement
router.post("/paiement", crypto_js_1.crypt.decode, validation_1.addpaiement, paiementController_1.default.addPaiement);
//=======
/**
 * @openapi
 * /api/usersRoles/{idUser}:
 *  get:
 *    summary: Récupérer les infos d'un user avec tous ses roles
 *    tags:
 *      - Utilisateurs
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: idUser
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          description: id de l'utilisateur
 *    responses:
 *      200:
 *        description: un user avec ses infofrmations
 *      401:
 *        description: Non autorisé
 *      404:
 *        description: l'utilisateur n'existe pas
 */
router.route("/usersRoles/:id").get(validateTokenHandler_1.validateToken, userControler_1.oneUsersRole);
//role route
/**
 * @openapi
 * /roles:
 *  get:
 *    summary: Recuperer tous les roles crees
 *    tags:
 *      - Roles
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: Liste de tous les roles
 *      404:
 *        description: une erreur est survenue
 */
router.route("/roles").get(roleControler_1.allRoles);
//authentification
/**
 * @openapi
 * /api/auth:
 *  post:
 *    summary: se connecter
 *    tags:
 *      - Authentification
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AuthInputs'
 *    responses:
 *      200:
 *        description: connexion reussie
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/AuthInputsResponse'
 *      400:
 *        description: Données invalides
 *      409:
 *        description: Email ou tel déjà utilisé
 *      500:
 *        description: Erreur serveur
 *
 */
router.route("/auth").post(crypto_js_1.crypt.decode, authUserControler_1.login);
/**
 * @openapi
 * /api/users/recovery-password:
 *  post:
 *    summary: Envoyer le mail de renitialisation du mot de passe
 *    tags:
 *      - Authentification
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                type: string
 *                description: email pour envoyer le lien de renitialisation
 *    responses:
 *      200:
 *        description: Le lien a ete cree avec succes, verifier vos mail
 *      400:
 *        description: Donnees invalides
 *      404:
 *        description: Not found
 */
router.route("/users/recovery-password").post(authUserControler_1.sendEmail);
/**
 * @openapi
 * /api/users/reset-password/{token}:
 *  post:
 *    summary: renitialiser son mot de passe
 *    tags:
 *      - Authentification
 *    parameters:
 *      - name: token
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *          description: token pour renitialiser le mot de passe
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              newPassword:
 *                type: string
 *                description: Nouveau mot de passe
 *    responses:
 *      200:
 *        description: Mot de passe renitialise avec success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersInputResponse'
 *      400:
 *        description: Données invalides
 *      404:
 *        description: token expire
 *      500:
 *        description: Erreur liée au serveur
 */
router.route("/users/reset-password").post(authUserControler_1.resetPassword);
/**
 * @openapi
 * /api/users:
 *  post:
 *    summary: S'inscrire
 *    tags:
 *      - Authentification
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsersInput'
 *    responses:
 *      201:
 *        description: success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersInputResponse'
 *      400:
 *        description: Données invalides
 *      409:
 *        description: Email déjà utilisé
 *      500:
 *        description: Erreur serveur
 *
 */
router.route("/users").post(crypto_js_1.crypt.decode, validationsRules_1.userValidationRules, validate_1.validate, authUserControler_1.register);
router.route("/registerByUser").post(crypto_js_1.crypt.decode, authUserControler_1.registerByUser);
router.route("/users/me").get(validateTokenHandler_1.validateToken, userControler_1.getUserRole);
//endpoint change password
router.route("/password/:id").put(userControler_1.modifyPassword);
//>>>>>>> vf1/vf1
//client route
/**
 * @openapi
 * /article-categorie/{id}:
 *  get:
 *    summary: Récupérer tous les articles par sa categorie
 *    tags:
 *      - Article
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: requete executée
 *      400:
 *        description: id de la categorie indefini
 */
router.get("/article-categorie/:id", articleController_1.ArticleController.getByCategorie);
/**
 * @openapi
 * /article-promo/{offset}:
 *  get:
 *    summary: liste des articles en promo
 *    tags:
 *     - Article
 *     - name: limite de sélection des articles
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          description: limite de selection
 *      required: true
 *      content:
 *        application/json:
 *         schema:
             type: object
 *          schema:
 *            $ref: '#/components/schemas/UsersInput'
 *    responses:
 *      200:
 *        description: Requete executée et resultat renvoyé
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersInputResponse'
 *      400:
 *        description: Données invalides
 *
 *      500:
 *        description: Erreur serveur
 *
 */
router.get("/article-promo/:offset", articleController_1.ArticleController.getArticlesOnPromo);
/**
 * @openapi
 * /article-details/{id}:
 *  get:
 *    summary: Information sur un article
 *    tags:
 *      - Article
 *      - name: id de l'article
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *          description: id de l'article
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsersInput'
 *    responses:
 *           [
 *              {
 *                "data": "ecryptedData with crypto-js",
 *               }
 *            ]
 *      200:
 *        description: Requete executée et resultat renvoyé
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersInputResponse'
 *      400:
 *        description: Données invalides
 *
 *      500:
 *        description: Erreur serveur
 *
 */
router.get("/article-details/:id", articleController_1.ArticleController.getOne);
/**
 * @openapi
 * /article/{offset}:
 *  get:
 *    summary: liste des articles
 *    tags:
 *      - Article
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UsersInput'
 *    responses:
 *      200:
 *        description: Requete executée et resultat renvoyé
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UsersInputResponse'
 *      400:
 *        description: Données invalides
 *
 *      500:
 *        description: Erreur serveur
 *
 */
router.delete("/adresse/:id", adresseController_1.AdresseController.delete);
router.post("/adresse", validateTokenHandler_1.validateToken, crypto_js_1.crypt.decode, validation_1.adresseValidation, adresseController_1.AdresseController.create);
router.put("/adresse", validation_1.updateArticleValidation, adresseController_1.AdresseController.update);
// router.get("/article/:offset", crypt.decode, ArticleController.getAll);
router.get("/article/:offset", articleController_1.ArticleController.getAll);
router.get("/commande/:idUser", commandController_1.CommandeController.getCommad);
router.get('/article-search/:article', articleController_1.ArticleController.search);
router.delete("/commande/:id", commandController_1.CommandeController.delete);
router.post("/commande", 
//validateToken,
crypto_js_1.crypt.decode, validation_2.createCommandeValidation, commandController_1.CommandeController.create);
router.get("/my-facture/:offset/:idUser", factureController_1.FactureController.getFactureOfUser);
//>>>>>>> vf1/vf1
exports.default = router;
