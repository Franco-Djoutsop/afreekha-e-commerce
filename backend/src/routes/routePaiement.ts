import express from 'express';
import { Request, Response } from "express";
import addPaiement from "../controllers/addPaiement";//ajout d'un paiement
import showAllPaiement from "../controllers/allPaiement";
import showDetailUserPaiement from '../controllers/showUserPaiement';

const router = express.Router();

router.post('/addPaiement', (req:express.Request, res:express.Response) =>{
    addPaiement(req,res);
});

router.get('/showallpaiement', (req:express.Request,res:express.Response) =>{
    showAllPaiement(req,res);
});

router.get('/paiementUser/:id', (req:express.Request,res:express.Response) =>{
    showDetailUserPaiement(req,res);
})
export default router;