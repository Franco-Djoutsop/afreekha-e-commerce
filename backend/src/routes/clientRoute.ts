import express, { Express } from "express";
import { allUSers, oneUsersRole } from "../controllers/userControler";
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
import { ArticleController } from "../controllers/articleController";
import { CommandeController } from "../controllers/commandController";
import { crypt } from "../config/crypto-js";
import { createCommandeValidation } from "../middlewares/validation";
import { FactureController } from "../controllers/factureController";

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});
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
router.route("/users").get(validateToken, allUSers);

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
router.route("/roles").get(validateToken, allRoles);

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
router.route("/auth").post(login);
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
router.route("/users").post(userValidationRules, validate, register);

//client route
router.get("/article-categorie/:id", ArticleController.getByCategorie);
router.get("/article-promo/:offset", ArticleController.getByCategorie);
router.get("/article-details/:id", ArticleController.getOne);
router.get("/article/:offset", ArticleController.getAll);
router.get("/commande/:idArticle/:idUser", CommandeController.getCommad);
router.delete("/commande/:id", CommandeController.delete);
router.post("/commande", createCommandeValidation, CommandeController.create);
router.get("/my-facture/:offset/:idUser", FactureController.getFactureOfUser);
export default router;
