import express from "express";
import { Request,Response } from "express";
import addCategorie from "../controllers/addCategorie";
import deleteCategorie from "../controllers/deleteCategorie";
import updateCategorie from "../controllers/updateCategorie";
import getCategorie from "../controllers/showCategorie";
import sousCategorie from "../controllers/sousCategorieOfCategorie";
import ArticleOfCategorie from "../controllers/articlesOfCategorie";

const router = express.Router();
//ajouter une categorie 
router.post('/addCategorie',(req:express.Request,res:express.Response) =>{
    addCategorie(req,res);
});

//supprimer une categorie
router.delete('/deleteCategorie/:id',(req:express.Request,res:express.Response) =>{
    deleteCategorie(req,res);
});

//mettre a jour les information d'une categorie
router.put('/updateCategorie/:id',(req:express.Request,res:express.Response) =>{
    updateCategorie(req,res);
});

//afficher toutes les categories
router.get('/getAllCategorie',(req:express.Request,res:express.Response) =>{
    getCategorie(req,res);
});

//afficher les sous categories d'une categorie
router.get('/sousCategorieOfCategorie/:id', (req:express.Request,res:express.Response) =>{
    sousCategorie(req,res);
})

//afficher les articles d'un categorie
router.get('/articleOfCategorie/:id', (req:express.Request,res:express.Response) =>{
    ArticleOfCategorie(req,res);
})
export default router;
