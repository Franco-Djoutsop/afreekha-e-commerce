import express from "express";
import { Request, response } from "express";
// import addsousCategorie from '../controllers/addSousCategorie';
// import deleteSousCategorie from '../controllers/deleteSousCategorie';
// import updateSousCategorie from '../controllers/updateSousCategorie';
// import allSousCategorie from '../controllers/showSousCategorie';
// import articleOfSousCategorie from '../controllers/articleOfSousCategorie';
// import categorieAndSousCategorie from '../controllers/showCategorieAndSousCategorie';
import gest_sous_categorie from "../controllers/sousCategorieController";

const router = express.Router();

//creer une sous categorie
router.post(
  "/addSousCategorie",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.addsousCategorie(req, res);
  }
);

//suppression de la sous categorie
router.delete(
  "/deleteSousCategorie/:id",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.deleteSousCategorie(req, res);
  }
);

// mise a jour de la sous categorie
router.put(
  "/updateSousCategorie/:id",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.updateSousCategorie(req, res);
  }
);

// afficher tout les sous categories
router.get(
  "/allSousCategorie",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.allSousCategorie(req, res);
  }
);

// afficher les articles d'une sous categorie
router.get(
  "/articleOfSousCategorie/:id",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.articleOfSousCategorie(req, res);
  }
);

// afficher les categorie et sous categorie
router.get(
  "/categorieAndSousCategorie/:id",
  (req: express.Request, res: express.Response) => {
    gest_sous_categorie.categorieAndSousCategorie(req, res);
  }
);
export default router;
