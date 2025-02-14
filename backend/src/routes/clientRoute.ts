import express, { Express } from "express";
import { createUser } from "../controllers/userControler";
import  {ArticleController}  from "../controllers/articleController";
import { CommandeController } from "../controllers/commandController";
import { crypt } from "../config/crypto-js";
import { createCommandeValidation } from "../middlewares/validation";

const router = express.Router();

//client route
router.route("/users").post(createUser);
router.get('/article-categorie/:id', ArticleController.getByCategorie);
router.get('/article-promo/:offset', ArticleController.getByCategorie);
router.get('/article-details/:id', ArticleController.getOne);
router.get('/article/:offset', ArticleController.getAll);
router.get('/commande/:idArticle/:idUser', CommandeController.getCommad);
router.delete('/commande/:id', CommandeController.delete);
router.post('/commande', createCommandeValidation, CommandeController.create);

export default router;
