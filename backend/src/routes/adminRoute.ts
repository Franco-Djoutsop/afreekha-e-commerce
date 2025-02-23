import express,{Express} from "express";
import { crypt } from "../config/crypto-js";
import gest_message from "../controllers/messageController";
import { ImageController } from "../controllers/imageContoller";
import gest_categorie  from "../controllers/categorieController";
import  {ArticleController}  from "../controllers/articleController";
import gest_sous_categorie from "../controllers/sousCategorieController";

import { createArticleValidation, updateArticleValidation, createImgValidation, updateArticleImg } from "../middlewares/validation";
import { addcategorie,updatecategorie,updatesousCategorie,createSousCategorie } from "../middlewares/validation";
import gest_paiement from "../controllers/paiementController";

const router = express.Router();

//Admin route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});

router.post("/article", crypt.decode, createArticleValidation, ArticleController.create);
router.put('/article', crypt.decode, updateArticleValidation, ArticleController.update)
router.delete('/article/:id', ArticleController.destroy);
router.put('/article-changes-categorie', crypt.decode, ArticleController.updateCategories)
router.post('/image', createImgValidation, ImageController.create);
router.put('/image', updateArticleImg, ImageController.update);
router.delete('/image/:id', ImageController.destroy);

//categorie
router.post('/categorie',crypt.decode,addcategorie, gest_categorie.addCategorie);
router.put('/categorie/:id',crypt.decode ,updatecategorie, gest_categorie.updateCategorie);
router.delete('/categorie/:id',gest_categorie.deleteCategorie);

//sous categorie
router.post('/sousCategorie',crypt.decode,createSousCategorie,gest_sous_categorie.addsousCategorie);
router.put('/sousCategorie/:id',crypt.decode,updatesousCategorie ,gest_sous_categorie.updateSousCategorie);
router.delete('/deleteSousCategorie/:id',gest_sous_categorie.deleteSousCategorie);

//message
router.get('/detail-message/:id',gest_message.getMessage);
router.delete('/message/:id', gest_message.deleteMessage);

 //paiement
 router.get('/allpaiement',gest_paiement.showpaiement);
router.get('/detail-paiement/:id',gest_paiement.showDetailUserPaiement)
export default router;
