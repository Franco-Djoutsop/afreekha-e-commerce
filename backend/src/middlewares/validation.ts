import { body, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.body.errors = errors.array();
  }
  next();
}

//middleware pour les categorie, sous-categorie paiement et message
const addcategorie = [
  body("nom").notEmpty().withMessage("nom de la categorie non definie"),
  body("idUser").notEmpty().withMessage("fournir un identifiant"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const updatecategorie = [
  body("nom").notEmpty().withMessage("nom de la categorie non definie"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const createSousCategorie = [
  body("nom").notEmpty().withMessage("nom de la sous categorie non definie"),
  body("idCategorie").notEmpty().withMessage("fournir un identifiant"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const updatesousCategorie = [
  body("nom").notEmpty().withMessage("nom de la sous categorie non definie"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const addMessage = [
  body("contenus").notEmpty().withMessage("veillez entrer un message"),
  body("idUser").notEmpty().withMessage("fournir un identifiant"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const addpaiement = [
  body("montant")
    .notEmpty()
    .withMessage("nom de la sous categorie non definie"),
  body("methodePaiement")
    .notEmpty()
    .withMessage("entrer la methode de paiment "),
  body("idUser").notEmpty().withMessage("fournir un identifiant"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

//midleware pour les articles , les image, les commnde
const createArticleValidation = [
  body("nom_article").notEmpty().withMessage("Nom de l'article non défini !"),
  body("prix").notEmpty().withMessage("Prix darticle non défini"),
  body("promo").notEmpty().withMessage("Instant promo non defini"),
  body("inTrend").notEmpty().withMessage("Article en Tendances ? Non defini"),
  body("featured").notEmpty().withMessage("Article en vedette ? Non defini"),
  body("quantite").notEmpty().withMessage("Quantité de l'article non défini"),
  body("caracteristiques").notEmpty().withMessage("Caractéristique non défini"),
  body("pourcentage_promo")
    .notEmpty()
    .withMessage("Pourcentage de promotion non défini"),
  body("garantie").notEmpty().withMessage("Veuillez definir la garantie"),
  // body("couleur").notEmpty().withMessage("Veuillez definir la couleur !"),
  // body("taille").notEmpty().withMessage("Veuillez definir la taille"),
  body("imgsID")
    .isArray({ min: 1 })
    .withMessage("Veuillez fourni les ids des images pour cette article !"),
  body("idCategorie")
    .notEmpty()
    .withMessage("Veuillez choisir une categorie pour cet article"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const updateArticleValidation = [
  ...createArticleValidation,
  body("idArticle").notEmpty().withMessage("id indéfini"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const createImgValidation = [
  body("featured").notEmpty().withMessage(" article en vedette pas fourni !").custom((value, { req }) => {
    if (value === true) {
      if (!req.body.collection || !req.body.position) {
        throw new Error(
          "Si l'image est définie en vedette, la position et la collection doivent également être définies !"
        );
      }
    }
    return true;
  }),
  body("base64Encryption")
    .notEmpty()
    .withMessage("Données de l'image non défini"),
  body("contentType").notEmpty().withMessage(" Format du fichier non defini !"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const adresseValidation = [
  body("adresse").notEmpty().withMessage("Adresse non fournie !"),
  body("ville").notEmpty().withMessage("Ville non fournie !"),
  body("pays").notEmpty().withMessage("Pays non fourni !"),
  body("etat").notEmpty().withMessage("Etat du pays non fourni !"),
  body("numero_telephone").notEmpty().withMessage("num de tel non fourni !"),
  body("titre").notEmpty().withMessage("titre non fourni !"),
  body("idUser").notEmpty().withMessage("ID user non fourni !"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const adressUpdateValidation = [
  ...adresseValidation,
  body("idAdresse").notEmpty().withMessage("ID adresse non fourni !"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];
const updateArticleImg = [
  body("collection").notEmpty().withMessage("Collection obligatoire"),
  body("position").notEmpty().withMessage("Position non défini"),
  body("featured").notEmpty().withMessage(" article en vedette pas fourni !").custom((value, { req }) => {
    if (value === true) {
      if (!req.body.collection || !req.body.position) {
        throw new Error(
          "Si l'image est définie en vedette, la position et la collection doivent également être définies !"
        );
      }
    }
    return true;
  }),
  body("idImage").notEmpty().withMessage("ID non fourni !"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const createCommandeValidation = [
  body("article")
    .isArray({ min: 1 })
    .withMessage(
      "Le champ 'article' doit être un tableau contenant au moins un article"
    ),

  body("article.*.product_id")
    .isInt({ gt: 0 })
    .withMessage("L'ID de l'article doit être un entier positif"),

  body("article.*.quantity")
    .isInt({ gt: 0 })
    .withMessage("La quantité doit être un entier positif"),

  body("idUser")
    .isInt({ gt: 0 })
    .withMessage("L'ID de l'utilisateur doit être un entier positif"),

  body("idAdresse")
    .isInt({ gt: 0 })
    .withMessage("L'ID de l'adresse de livraisson doit être un entier positif"),

  body("statut")
    .isIn(["payé", "en cours"])
    .withMessage("Le statut doit être 'payé' ou 'En cours'"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const createInvoiceValidation = [
  body("idCommande")
    .notEmpty()
    .withMessage("ID de la commande est obligatoire !"),
  body("idArticles")
    .notEmpty()
    .withMessage("tableau d'id d'article est obligatoire"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

const changeInvoiceStatus = [
  body("status").notEmpty().withMessage("Nouveau status non fourni !"),
  body("commandeId").notEmpty().withMessage("ID de la commande introuvable !"),
  (req: Request, res: Response, next: NextFunction) => {
    handleValidationErrors(req, res, next);
  },
];

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
  addpaiement,
  changeInvoiceStatus,
  createInvoiceValidation,
  adresseValidation,
  adressUpdateValidation,
};
