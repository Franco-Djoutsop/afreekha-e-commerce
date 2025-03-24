import { body, validationResult } from 'express-validator';
import { NextFunction, Request, Response } from "express";


function handleValidationErrors(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.body.errors = errors.array();
    }
    next();
  }


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
     body('article')
        .isArray({ min: 1 }).withMessage("Le champ 'article' doit être un tableau contenant au moins un article"),

    body('article.*.idArticle')
        .isInt({ gt: 0 }).withMessage("L'ID de l'article doit être un entier positif"),

    body('article.*.quantite')
        .isInt({ gt: 0 }).withMessage("La quantité doit être un entier positif"),

    body('idUser')
        .isInt({ gt: 0 }).withMessage("L'ID de l'utilisateur doit être un entier positif"),

    body('statut')
        .isIn(['payé', 'en attente']).withMessage("Le statut doit être 'payé' ou 'en attente'")
      
]

const createInvoiceValidation = [
  body("idCommande").notEmpty().withMessage("ID de la commande est obligatoire !"),
  body('idArticles').notEmpty().withMessage("tableau d'id d'article est obligatoire"),
]

const changeInvoiceStatus = [
  body("status").notEmpty().withMessage("Nouveau status non fourni !"),
  body("commandeId").notEmpty().withMessage("ID de la commande introuvable !")
]


export { 
        createArticleValidation, 
        updateArticleValidation,
        updateArticleImg,
        createImgValidation,
        createCommandeValidation,
        changeInvoiceStatus,
        createInvoiceValidation
    
    }