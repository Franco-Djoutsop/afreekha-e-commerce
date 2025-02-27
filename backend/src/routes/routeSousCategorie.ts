import express from 'express';
import { Request,response } from 'express';
import addsousCategorie from '../controllers/addSousCategorie';
import deleteSousCategorie from '../controllers/deleteSousCategorie';
import updateSousCategorie from '../controllers/updateSousCategorie';
import allSousCategorie from '../controllers/showSousCategorie';
import articleOfSousCategorie from '../controllers/articleOfSousCategorie';
import categorieAndSousCategorie from '../controllers/showCategorieAndSousCategorie';

const router = express.Router();

//creer une sous categorie
router.post('/addSousCategorie', (req:express.Request,res:express.Response) =>{
    addsousCategorie(req,res);
});

//suppression de la sous categorie
router.delete('/deleteSousCategorie/:id' ,(req:express.Request,res:express.Response) =>{
    deleteSousCategorie(req,res);
});

// mise a jour de la sous categorie
router.put('/updateSousCategorie/:id', (req:express.Request,res:express.Response) =>{
    updateSousCategorie(req,res);
});

// afficher tout les sous categories
router.get('/allSousCategorie', (req:express.Request,res:express.Response) =>{
    allSousCategorie(req,res);
})

// afficher les articles d'une sous categorie
router.get('/articleOfSousCategorie/:id',(req:express.Request,res:express.Response) =>{
    articleOfSousCategorie(req,res);
})

// afficher les categorie et sous categorie
router.get('/categorieAndSousCategorie/:id',(req:express.Request,res:express.Response) =>{
    categorieAndSousCategorie(req,res);
})
export default router;