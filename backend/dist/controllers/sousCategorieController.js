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
const crypto_js_1 = require("../config/crypto-js");
const categorie_1 = __importDefault(require("../models/categorie"));
const SousCategorie_1 = __importDefault(require("../models/SousCategorie"));
const gest_sous_categorie = {
    //@route/api/admin/sousCategorie
    //@mathod post
    //@data = objet, response true ? false
    //creation d'une sous categorie
    addsousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (data != null) {
                    yield SousCategorie_1.default.create({
                        idCategorie: data.idCategorie,
                        nom: data.nom,
                    });
                    return res.status(201).json({
                        data: data,
                        isCreate: true,
                        message: "sous categorie cree avec success",
                    });
                }
                return res.status(404).json({ message: "veillez fournir les donnees" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "erreur du serveur" });
            }
        });
    },
    //@route /api/admin/sousCategorie
    //@method put
    //@response true ? false
    //mise a jour des information des sous categorie
    updateSousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const data = req.body;
                const checkid = yield SousCategorie_1.default.findByPk(id);
                if (!checkid) {
                    return res
                        .status(404)
                        .json({ message: "echec de le modification", update: false });
                }
                yield SousCategorie_1.default.update({ nom: data.nom }, {
                    where: {
                        idSousCategorie: id,
                    },
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ messade: "erreur sur le server" });
            }
        });
    },
    //@route /api/admin/sousCategorie
    //@method delete
    //@response true ? false
    //suppression d'une sous-categorie
    deleteSousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const checkid = yield SousCategorie_1.default.findByPk(id);
                if (!checkid) {
                    return res
                        .status(404)
                        .json({ message: "suppression impossible", delte: false });
                }
                yield SousCategorie_1.default.destroy({
                    where: {
                        idSousCategorie: id,
                    },
                });
                return res
                    .status(200)
                    .json({ delete: true, message: "suppression reussi" });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    delete: false,
                    message: "erreur sur le serveur",
                });
            }
        });
    },
    //@route/api/articleOfSousCategorie
    //@mathod get
    //@id of a categorie
    //@response true data:result? false data = []; result = objet
    //liste des articles de chaque sous categorie des categories;
    articleOfSousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const result = yield Article_1.default.findAll({
                    attributes: [
                        "nom_article",
                        "prix",
                        "quantite",
                        "promo",
                        "caracteristiques",
                        "pourcentage_promo",
                        "marque",
                        "garantie",
                    ],
                    include: [
                        {
                            model: image_1.default,
                            attributes: ["lien"],
                        },
                        {
                            model: categorie_1.default,
                            attributes: ["nom"],
                            include: [
                                {
                                    model: SousCategorie_1.default,
                                    attributes: ["nom"],
                                },
                            ],
                        },
                    ],
                    where: { idCategorie: id },
                });
                if (result[0] == null) {
                    return res
                        .status(404)
                        .json({ message: "aucun article trouve", data: [] });
                }
                return res.status(200).json({ data: crypto_js_1.crypt.encode(result), isDone: true });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "erreur du server" });
            }
        });
    },
    //@route /api/categorieAndSousCategorie
    //@method get
    //@response true ? false
    //liste des sous categorie et categorie
    categorieAndSousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   let id = req.params.id;
                const result = yield categorie_1.default.findAll({
                    include: [
                        {
                            model: SousCategorie_1.default,
                        },
                    ],
                    // where: {
                    //   idCategorie: id,
                    // },
                });
                if (result[0] == null) {
                    return res.status(404).json({
                        message: "aucune sous categire tourve pour cette categorie",
                    });
                }
                return res.status(200).json({
                    // data:crypt.encode(result),
                    data: result,
                    isDone: true,
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ messge: "erreur de server" });
            }
        });
    },
    //@route /api/allSousCategorie
    //@method get
    //@response true ? false
    //liste des toutes les sous categorie
    allSousCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield SousCategorie_1.default.findAll({
                    attributes: ["nom"],
                });
                if (result[0] == null) {
                    return res
                        .status(404)
                        .json({ message: "aucune sous categorie trouve", data: [] });
                }
                return res.status(200).json({ data: crypto_js_1.crypt.encode(result), getAll: true });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ message: "erreur sur le server" });
            }
        });
    },
};
exports.default = gest_sous_categorie;
