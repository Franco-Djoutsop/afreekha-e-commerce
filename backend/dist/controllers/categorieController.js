"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const image_1 = __importDefault(require("../models/image"));
const Article_1 = __importDefault(require("../models/Article"));
const categorie_1 = __importDefault(require("../models/categorie"));
const crypto_js_1 = require("../config/crypto-js");
const SousCategorie_1 = __importDefault(require("../models/SousCategorie"));
const img_file_1 = require("../config/img_file");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const gest_categorie = {
    //@route/api/admin/categorie
    //@mathod post
    //@response true ? false
    //creation d'une categorie
    log(base64, contentType, featured) {
        return __awaiter(this, void 0, void 0, function* () {
            const dossier = process.env.IMG_URL;
            const result = yield this.LogoUrl(base64, contentType, dossier);
            if (result.create == true) {
                return result.link;
            }
            return '';
        });
    },
    addCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const { base64, contentType, featured } = req.body;
                const result = yield gest_categorie.log(base64, contentType, featured);
                const exitOrnotExist = yield categorie_1.default.findOne({
                    where: { nom: data.nom }
                });
                if (exitOrnotExist) {
                    return res.status(400).json({ 'message': 'cette categorie exite deja' });
                }
                else {
                    if (data && result) {
                        const categorie = yield categorie_1.default.create({
                            idUser: data.idUser,
                            nom: data.nom,
                            urlLogo: result
                        });
                        return res.status(201).json({
                            create: true,
                            message: "nouvelle categorie ajoutée",
                            reps: crypto_js_1.crypt.encode(categorie),
                        });
                    }
                }
                return res.status(404).json({ message: "veilez fournir les donnees" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    create: false,
                    message: "echec de la creation",
                    error: error.message,
                });
            }
        });
    },
    //@route /api/admin/categorie/
    //@method put
    //@response true ? false
    //mise a jour des information des  categorie
    updateCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const data = req.body;
                const { base64, contentType, featured } = req.body;
                const result = yield gest_categorie.log(base64, contentType, featured);
                console.log('le result', result);
                const updateData = yield categorie_1.default.findByPk(id);
                if (!updateData && !result && !id) {
                    return res.status(404).json({
                        message: "aucun utilisateur trouve",
                    });
                }
                yield categorie_1.default.update({ idUser: data.idUser, nom: data.nom, urlLogo: result }, {
                    //<<<<<<< HEAD
                    where: {
                        idCategorie: id
                    }
                });
                return res.status(200).json({
                    'update': true,
                    'message': 'mise a jour reussi'
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    'message': 'erreur sur le serveur'
                });
            }
        });
    },
    //@route /api/admin/categorie
    //@method delete
    //@response true ? false
    //suppression d'une categorie
    deleteCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const deleteC = yield categorie_1.default.findByPk(id);
                if (!deleteC) {
                    return res.status(404).json({
                        'delete': false,
                        'message': 'aucune categorie trouve',
                    });
                }
                yield categorie_1.default.destroy({
                    where: {
                        idCategorie: id
                    }
                });
                return res.status(200).json({
                    'delete': true
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    'delete': false,
                    'message': 'erreur sur le serveur'
                });
            }
        });
    },
    //@route/api/articleOfCategorie/:id
    //@mathod get
    //@id of a categorie
    //@response true data:result ? false data = []; result = objet
    //liste des articles de chaque des categories;
    ArticleOfCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const result = yield Article_1.default.findAll({
                    where: {
                        idCategorie: id
                    },
                    attributes: ['idArticle', 'nom_article', 'prix', 'quantite', 'caracteristiques', 'marque', 'garantie', 'promo', 'pourcentage_promo'],
                    include: [
                        {
                            model: categorie_1.default,
                            attributes: ['idCategorie', 'nom', 'urlLogo']
                        },
                        {
                            model: image_1.default,
                            attributes: ['idImage', 'lien'],
                        },
                    ],
                });
                if (result[0] == null) {
                    return res.status(404).json({ 'message': 'aucun article trouve', 'data': [] });
                    //=======
                    //>>>>>>> vf1/vf1
                }
                return res.status(200).json({
                    update: true,
                    message: "mise a jour reussi",
                    //data: updateData,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: "erreur sur le serveur",
                });
            }
        });
    },
    //@route/api/articleOfCategorie/:id
    //@mathod get
    //@id of a categorie
    //@response true data:result ? false data = []; result = objet
    //<<<<<<< HEAD
    //liste des sous categorie de chaqur categorie
    sousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const result = yield SousCategorie_1.default.findAll({
                    where: {
                        idCategorie: id
                    },
                    include: [
                        {
                            model: categorie_1.default, attributes: ['idCategorie', 'nom', 'urlLogo']
                        }
                    ],
                    attributes: ['idSousCategorie', 'nom']
                });
                if (result == null) {
                    return res.status(404).json({
                        'message': 'cette categorie na pas de sous categorie ', 'data': []
                    });
                }
                return res.status(200).json({
                    'isHere': true,
                    'data': result
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    'message': 'erreur sur le serveur'
                });
            }
        });
    },
    //@route /api/AllCategorie
    //@method get
    //@response true ? false
    //liste des categorie
    getCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allCategorie = yield categorie_1.default.findAll({
                    attributes: ['idCategorie', "nom", 'urlLogo'],
                });
                if (allCategorie[0] == null) {
                    return res.status(200).json({
                        data: [],
                        messages: "aucune categorie pour le moment",
                        //>>>>>>> vf1/vf1
                    });
                }
                return res.status(200).json({
                    // data: crypt.encode(allCategorie)
                    data: allCategorie,
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    message: "erreur du serveur",
                });
            }
        });
    },
    //methode pour gerer urlLogo
    LogoUrl(base64, contentType, dossier) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, img_file_1.MoveImg)({ data: base64, contentType: contentType }, dossier).then((lien) => {
                return { create: true, link: lien };
            }).catch((error) => {
                return { erreur: error.message, create: false };
            });
        });
    }
};
exports.default = gest_categorie;
