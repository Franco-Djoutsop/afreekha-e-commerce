import express from "express";
import { Request, Response } from "express";
// import addPaiement from "../controllers/addPaiement";//ajout d'un paiement
// import showAllPaiement from "../controllers/allPaiement";
// import showDetailUserPaiement from '../controllers/showUserPaiement';
import gest_paiement from "../controllers/paiementController";

const router = express.Router();

router.post("/addPaiement", (req: express.Request, res: express.Response) => {
  gest_paiement.addPaiement(req, res);
});

router.get(
  "/showallpaiement",
  (req: express.Request, res: express.Response) => {
    gest_paiement.showpaiement(req, res);
  }
);

router.get(
  "/paiementUser/:id",
  (req: express.Request, res: express.Response) => {
    gest_paiement.showDetailUserPaiement(req, res);
  }
);
export default router;
