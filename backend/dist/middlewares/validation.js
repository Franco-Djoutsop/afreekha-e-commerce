"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adressUpdateValidation = exports.adresseValidation = exports.createInvoiceValidation = exports.changeInvoiceStatus = exports.addpaiement = exports.addMessage = exports.updatesousCategorie = exports.createSousCategorie = exports.updatecategorie = exports.addcategorie = exports.createCommandeValidation = exports.createImgValidation = exports.updateArticleImg = exports.updateArticleValidation = exports.createArticleValidation = void 0;
const express_validator_1 = require("express-validator");
function handleValidationErrors(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        req.body.errors = errors.array();
    }
    next();
}
//middleware pour les categorie, sous-categorie paiement et message
const addcategorie = [
    (0, express_validator_1.body)("nom").notEmpty().withMessage("nom de la categorie non definie"),
    (0, express_validator_1.body)("idUser").notEmpty().withMessage("fournir un identifiant"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.addcategorie = addcategorie;
const updatecategorie = [
    (0, express_validator_1.body)("nom").notEmpty().withMessage("nom de la categorie non definie"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.updatecategorie = updatecategorie;
const createSousCategorie = [
    (0, express_validator_1.body)("nom").notEmpty().withMessage("nom de la sous categorie non definie"),
    (0, express_validator_1.body)("idCategorie").notEmpty().withMessage("fournir un identifiant"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.createSousCategorie = createSousCategorie;
const updatesousCategorie = [
    (0, express_validator_1.body)("nom").notEmpty().withMessage("nom de la sous categorie non definie"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.updatesousCategorie = updatesousCategorie;
const addMessage = [
    (0, express_validator_1.body)("contenus").notEmpty().withMessage("veillez entrer un message"),
    (0, express_validator_1.body)("idUser").notEmpty().withMessage("fournir un identifiant"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.addMessage = addMessage;
const addpaiement = [
    (0, express_validator_1.body)("montant")
        .notEmpty()
        .withMessage("nom de la sous categorie non definie"),
    (0, express_validator_1.body)("methodePaiement")
        .notEmpty()
        .withMessage("entrer la methode de paiment "),
    (0, express_validator_1.body)("idUser").notEmpty().withMessage("fournir un identifiant"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.addpaiement = addpaiement;
//midleware pour les articles , les image, les commnde
const createArticleValidation = [
    (0, express_validator_1.body)("nom_article").notEmpty().withMessage("Nom de l'article non défini !"),
    (0, express_validator_1.body)("prix").notEmpty().withMessage("Prix darticle non défini"),
    (0, express_validator_1.body)("promo").notEmpty().withMessage("Instant promo non defini"),
    (0, express_validator_1.body)("inTrend").notEmpty().withMessage("Article en Tendances ? Non defini"),
    (0, express_validator_1.body)("featured").notEmpty().withMessage("Article en vedette ? Non defini"),
    (0, express_validator_1.body)("quantite").notEmpty().withMessage("Quantité de l'article non défini"),
    (0, express_validator_1.body)("caracteristiques").notEmpty().withMessage("Caractéristique non défini"),
    (0, express_validator_1.body)("pourcentage_promo").notEmpty().withMessage("Pourcentage de promotion non défini"),
    (0, express_validator_1.body)("garantie").notEmpty().withMessage("Veuillez definir la garantie"),
    (0, express_validator_1.body)("couleur").notEmpty().withMessage("Veuillez definir la couleur !"),
    (0, express_validator_1.body)("taille").notEmpty().withMessage("Veuillez definir la taille"),
    (0, express_validator_1.body)("imgsID").isArray({ min: 1 }).withMessage("Veuillez fourni les ids des images pour cette article !"),
    (0, express_validator_1.body)("idCategorie").notEmpty().withMessage("Veuillez choisir une categorie pour cet article"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.createArticleValidation = createArticleValidation;
const updateArticleValidation = [
    ...createArticleValidation,
    (0, express_validator_1.body)("idArticle").notEmpty().withMessage("id indéfini"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.updateArticleValidation = updateArticleValidation;
const createImgValidation = [
    (0, express_validator_1.body)("featured").notEmpty().withMessage(" article en vedette pas fourni !").custom((value, { req }) => {
        if (value && !req.body.collection && !req.body.position) {
            throw new Error("Si l'image est définie en vedette, la position et la collection doivent également être définie !");
        }
        return true;
    }),
    (0, express_validator_1.body)("base64Encryption")
        .notEmpty()
        .withMessage("Données de l'image non défini"),
    (0, express_validator_1.body)("contentType").notEmpty().withMessage(" Format du fichier non defini !"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.createImgValidation = createImgValidation;
const adresseValidation = [
    (0, express_validator_1.body)("adresse").notEmpty().withMessage("Adresse non fournie !"),
    (0, express_validator_1.body)("ville").notEmpty().withMessage("Ville non fournie !"),
    (0, express_validator_1.body)("pays").notEmpty().withMessage("Pays non fourni !"),
    (0, express_validator_1.body)("etat").notEmpty().withMessage("Etat du pays non fourni !"),
    (0, express_validator_1.body)("numero_telephone").notEmpty().withMessage("num de tel non fourni !"),
    (0, express_validator_1.body)("titre").notEmpty().withMessage("titre non fourni !"),
    (0, express_validator_1.body)("idUser").notEmpty().withMessage("ID user non fourni !"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.adresseValidation = adresseValidation;
const adressUpdateValidation = [
    ...adresseValidation,
    (0, express_validator_1.body)("idAdresse").notEmpty().withMessage("ID adresse non fourni !"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.adressUpdateValidation = adressUpdateValidation;
const updateArticleImg = [
    (0, express_validator_1.body)("collection").notEmpty().withMessage("Collection obligatoire"),
    (0, express_validator_1.body)("postition").notEmpty().withMessage("ID non fourni !"),
    (0, express_validator_1.body)("featured").notEmpty().withMessage("En vedette ?"),
    (0, express_validator_1.body)("idImage").notEmpty().withMessage("ID non fourni !"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.updateArticleImg = updateArticleImg;
const createCommandeValidation = [
    (0, express_validator_1.body)('article')
        .isArray({ min: 1 }).withMessage("Le champ 'article' doit être un tableau contenant au moins un article"),
    (0, express_validator_1.body)('article.*.product_id')
        .isInt({ gt: 0 }).withMessage("L'ID de l'article doit être un entier positif"),
    (0, express_validator_1.body)('article.*.quantity')
        .isInt({ gt: 0 }).withMessage("La quantité doit être un entier positif"),
    (0, express_validator_1.body)('idUser')
        .isInt({ gt: 0 }).withMessage("L'ID de l'utilisateur doit être un entier positif"),
    (0, express_validator_1.body)('idAdresse')
        .isInt({ gt: 0 }).withMessage("L'ID de l'adresse de livraisson doit être un entier positif"),
    (0, express_validator_1.body)('statut')
        .isIn(['payé', 'en cours']).withMessage("Le statut doit être 'payé' ou 'en cours'"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    }
];
exports.createCommandeValidation = createCommandeValidation;
const createInvoiceValidation = [
    (0, express_validator_1.body)("idCommande").notEmpty().withMessage("ID de la commande est obligatoire !"),
    (0, express_validator_1.body)('idArticles').notEmpty().withMessage("tableau d'id d'article est obligatoire"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.createInvoiceValidation = createInvoiceValidation;
const changeInvoiceStatus = [
    (0, express_validator_1.body)("status").notEmpty().withMessage("Nouveau status non fourni !"),
    (0, express_validator_1.body)("commandeId").notEmpty().withMessage("ID de la commande introuvable !"),
    (req, res, next) => {
        handleValidationErrors(req, res, next);
    },
];
exports.changeInvoiceStatus = changeInvoiceStatus;
