import express, { Express } from "express";
import { createUser } from "../controllers/userControler";
import gest_message from "../controllers/messageController";
import gest_paiement from "../controllers/paiementController";
import gest_categorie from "../controllers/categorieController";
import { addMessage,addpaiement } from "../middlewares/validation";
import { createCommandeValidation } from "../middlewares/validation";
import  {ArticleController}  from "../controllers/articleController";
import { CommandeController } from "../controllers/commandController";
import gest_sous_categorie from "../controllers/sousCategorieController";

import { crypt } from "../config/crypto-js";

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

//categorie
router.get('/allCategorie',gest_categorie.getCategorie);
router.get('/sousCategorieOfCategorie/:id',gest_categorie.sousCategorie);
router.get('/articleOfCategorie/:id',gest_categorie.ArticleOfCategorie);

//sous categorie
router.get('/allSousCategorie',gest_sous_categorie.allSousCategorie);
router.get('/articleOfSousCategorie/:id',gest_sous_categorie.articleOfSousCategorie);
router.get('/categorieAndSousCategorie/:id',gest_sous_categorie.categorieAndSousCategorie);

//message
router.post('/message',crypt.decode,addMessage,gest_message.createMessage);

 //paiement
 router.post('/paiement',crypt.decode,addpaiement,gest_paiement.addPaiement);
export default router;
