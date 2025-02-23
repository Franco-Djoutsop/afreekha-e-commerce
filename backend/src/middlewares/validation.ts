import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";


function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.body.errors = errors.array();
    }
    next();
  }


  //middleware pour les categorie, sous-categorie paiement et message
const addcategorie = [
  body('nom').notEmpty().withMessage('nom de la categorie non definie'),
  body('idUser').notEmpty().withMessage('fournir un identifiant'),
  (req:Request,res:Response, next: NextFunction ) =>{
    handleValidationErrors(req, res, next);
  }
]

const updatecategorie = [
      body('nom').notEmpty().withMessage('nom de la categorie non definie'),
      (req:Request,res:Response, next: NextFunction ) =>{
         handleValidationErrors(req, res, next);
}
]

const createSousCategorie = [
      body('nom').notEmpty().withMessage('nom de la sous categorie non definie'),
      body('idCategorie').notEmpty().withMessage('fournir un identifiant'),
         (req:Request,res:Response, next: NextFunction ) =>{
           handleValidationErrors(req, res, next);
}
]

const updatesousCategorie = [
  body('nom').notEmpty().withMessage('nom de la sous categorie non definie'),
     (req:Request,res:Response, next: NextFunction ) =>{
       handleValidationErrors(req, res, next);
}
]

const addMessage = [
       body('contenus').notEmpty().withMessage('veillez entrer un message'),
       body('idUser').notEmpty().withMessage('fournir un identifiant'),
        (req:Request,res:Response, next: NextFunction ) =>{
          handleValidationErrors(req, res, next);
}
]

const addpaiement = [
  body('montant').notEmpty().withMessage('nom de la sous categorie non definie'),
  body('methodePaiement').notEmpty().withMessage('entrer la methode de paiment '),
  body('idUser').notEmpty().withMessage('fournir un identifiant'),
        (req:Request,res:Response, next: NextFunction ) =>{
          handleValidationErrors(req, res, next);
}
]

//midleware pour les articles , les image, les commnde
const createArticleValidation = 
    [
        body('nom_article').notEmpty().withMessage("Nom de l'article non défini !"),
        body('prix').notEmpty().withMessage('Prix darticle non défini'),
        body('promo').notEmpty().withMessage("Instant promo non defini"),
        body('quantite').notEmpty().withMessage("Quantité de l'article non défini"),
        body('caracteristiques').notEmpty().withMessage('Caractéristique non défini'),
        body('pourcentage_promo').notEmpty().withMessage('Pourcentage de promotion non défini'),
        body('garantie').notEmpty().withMessage('garantie non définie'),
        body('idCategorie').notEmpty().withMessage("Veuillez choisir une categorie pour cet article"),
        (req: Request, res: Response, next: NextFunction) => {
            handleValidationErrors(req, res, next);
          }
    ]


const updateArticleValidation = [
        ...createArticleValidation,
        body('idArticle').notEmpty().withMessage("id indéfini"),
        (req: Request, res: Response, next: NextFunction) => {
            handleValidationErrors(req, res, next);
          }
    ]

const createImgValidation = [
    body("idArticle").notEmpty().withMessage("ID article pas fourni !"),
    body('base64Encryption').notEmpty().withMessage("Données de l'image non défini")
]

const updateArticleImg = [
      ...createImgValidation,
      body("idImage").notEmpty().withMessage("ID non fourni !"),
]

const createCommandeValidation = [
  body("Montant_total").notEmpty().withMessage("Montant total pas fourni !"),
  body("quantite_articles").notEmpty().withMessage("Quantite d'article necessaire !"),
  body('idUser').notEmpty().withMessage("Id user non défini")
]

export { 
        createArticleValidation, 
        updateArticleValidation,
        updateArticleImg,
        createImgValidation,
        createCommandeValidation,
        addcategorie,
        updatecategorie,
        createSousCategorie,
        updatesousCategorie,
        addMessage,
        addpaiement
    
    }