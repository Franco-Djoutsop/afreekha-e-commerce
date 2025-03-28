import express, { Express } from "express";
//<<<<<<< HEAD
import gest_message from "../controllers/messageController";
import gest_paiement from "../controllers/paiementController";
import gest_categorie from "../controllers/categorieController";
import {
  addMessage,
  addpaiement,
  adresseValidation,
  updateArticleValidation,
} from "../middlewares/validation";
import { createCommandeValidation } from "../middlewares/validation";
import { ArticleController } from "../controllers/articleController";
//=======
import {
  allUSers,
  getUserRole,
  oneUsersRole,
} from "../controllers/userControler";
import { userValidationRules } from "../middlewares/validationsRules";
import { validate } from "../middlewares/validate";
import { allRoles } from "../controllers/roleControler";
import {
  login,
  register,
  resetPassword,
  sendEmail,
} from "../controllers/authUserControler";
import { validateToken } from "../middlewares/validateTokenHandler";
//import { ArticleController } from "../controllers/articleController";
//>>>>>>> vf1/vf1
import { CommandeController } from "../controllers/commandController";
import gest_sous_categorie from "../controllers/sousCategorieController";

import { crypt } from "../config/crypto-js";
//<<<<<<< HEAD
//=======
//import { createCommandeValidation } from "../middlewares/validation";
import { FactureController } from "../controllers/factureController";
import { HomeController } from "../controllers/homeController";
import { AdresseController } from "../controllers/adresseController";

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});
router.get("/home-data", HomeController.getHomeData);

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
router.route("/users").get(allUSers);

//<<<<<<< HEAD
//categorie
router.get("/allCategorie", gest_categorie.getCategorie);
router.get("/sousCategorieOfCategorie/:id", gest_categorie.sousCategorie);
router.get("/articleOfCategorie/:id", gest_categorie.ArticleOfCategorie);

//sous categorie
router.get("/allSousCategorie", gest_sous_categorie.allSousCategorie);
router.get(
  "/articleOfSousCategorie/:id",
  gest_sous_categorie.articleOfSousCategorie
);
router.get(
  "/categorieAndSousCategorie",
  gest_sous_categorie.categorieAndSousCategorie
);

//message
router.post("/message", crypt.decode, addMessage, gest_message.createMessage);

//paiement
router.post("/paiement", crypt.decode, addpaiement, gest_paiement.addPaiement);
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
router.route("/usersRoles/:id").get(validateToken, oneUsersRole);

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
router.route("/roles").get(allRoles);

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
router.route("/auth").post(login, crypt.decode);
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
router.route("/users/recovery-password").post(sendEmail);
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
router.route("/users/reset-password/:token").post(resetPassword);
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
//<<<<<<< HEAD
router
  .route("/users")
  .post(userValidationRules, crypt.decode, validate, register);
//=======
router.route("/users").post(userValidationRules, validate, register);
router.route("/users/me").get(validateToken, getUserRole);
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
router.get("/article-categorie/:id", ArticleController.getByCategorie);

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
router.get("/article-promo/:offset", ArticleController.getArticlesOnPromo);

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
router.get("/article-details/:id", ArticleController.getOne);

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

router.delete("/adresse/:id", validateToken, AdresseController.delete);
router.post(
  "/adresse",
  validateToken,
  adresseValidation,
  AdresseController.create
);
router.put(
  "/adresse",
  validateToken,
  updateArticleValidation,
  AdresseController.update
);

router.get("/article/:offset", ArticleController.getAll);
router.get(
  "/commande/:idArticle/:idUser",
  validateToken,
  CommandeController.getCommad
);
router.delete("/commande/:id", CommandeController.delete);
router.post(
  "/commande",
  // validateToken,
  createCommandeValidation,
  CommandeController.create
);
router.get("/my-facture/:offset/:idUser", FactureController.getFactureOfUser);
//>>>>>>> vf1/vf1
export default router;
