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
exports.CommandeController = void 0;
const gestion_commande_1 = require("../repositry/gestion_commande");
const Commande_1 = __importDefault(require("../models/Commande"));
const gestion_commandeArticle_1 = require("../repositry/gestion_commandeArticle");
const gestion_articles_1 = require("../repositry/gestion_articles");
const CommandeController = {
    //@route /api/commande
    //@method POST
    //@bodyparam :true
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    const data = req.body;
                    let commande_toSave = new Commande_1.default();
                    let articlesID = [];
                    let ids = [];
                    let commande_article = [];
                    if (data.article.length != 0) {
                        let quantite_articles = data.article.length;
                        let total = 0;
                        data.article.forEach((art) => {
                            ids.push(art.product_id);
                        });
                        commande_toSave.quantite_articles = quantite_articles;
                        commande_toSave.idUser = data.idUser;
                        commande_toSave.statut = data.statut;
                        commande_toSave.idAdresse = data.idAdresse;
                        //verification de l'existence des articles
                        const verificationRslt = yield gestion_commande_1.GestionCommande.verifyArticlesExist(ids);
                        // Vérifier les stok
                        for (const { product_id, quantity } of data.article) {
                            const article = verificationRslt.articles.find(a => a.idArticle === product_id);
                            if (!article) {
                                throw new Error(`Un Article introuvable dans votre commande !`);
                            }
                            if (article.quantite < quantity) {
                                throw new Error(`Stock insuffisant pour l'article '${article.nom_article}', quantité disponible: ${article.quantite}`);
                            }
                        }
                        if (verificationRslt.exist) {
                            //tous les articles existent dans la bd, proceder au calcule du montant de chque article et du montant total 
                            verificationRslt.articles.forEach((art) => {
                                const index = data.article.findIndex((val) => val.product_id === art.idArticle);
                                if (art.promo && art.pourcentage_promo) {
                                    const price_promo = art.prix - ((art.prix * art.pourcentage_promo) / 100);
                                    total += (price_promo * data.article[index].quantity);
                                }
                                else {
                                    //article pas du tout en promo
                                    total += (art.prix * data.article[index].quantity);
                                }
                            });
                            commande_toSave.Montant_total = total;
                            const resp = yield gestion_commande_1.GestionCommande.create(commande_toSave.dataValues);
                            if (resp) {
                                data.article.forEach((art) => {
                                    articlesID.push({ idArticle: art.product_id, qty: art.quantity });
                                    commande_article.push({ idArticle: art.product_id, idCommande: resp.idCommande, quantite: art.quantity });
                                });
                                const commandPivotInsertion = yield gestion_commandeArticle_1.GestionCommandeArticle.create(commande_article);
                                const updateProductQty = (yield gestion_articles_1.GestionArticle.updateMultipleArticlesQty(articlesID, verificationRslt.articles)).message;
                                return res.status(200).json([{ message: "Commande crée !", data: (resp), updateMsg: updateProductQty, amountToBuy: total }]);
                            }
                        }
                        else {
                            throw new Error("Un Article Indisponible dans votre commande !");
                        }
                    }
                    else {
                        throw new Error("Aucun Article présent dans la commande !");
                    }
                }
                else {
                    return res.status(400).json([{ message: "Erreurs sur les données de traitement!" }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/commande
    //@method DELETE
    //@urlparam :true
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const rslt = yield gestion_commande_1.GestionCommande.supprimer(Number(req.params.id));
                    return rslt != 0 ? res.status(200).json([{ done: true }]) : res.status(200).json([]);
                }
            }
            catch (error) {
                res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/commande
    //@method GET
    //@bodyparams :true
    getCommad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.idUser) {
                    const result = yield gestion_commande_1.GestionCommande.getCommandOwner(Number.parseInt(req.params.idUser));
                    return result.length != 0 ? res.status(200).json([{ data: (result) }]) : res.status(200).json([]);
                }
                else {
                    res.status(400).json([{ message: "Informations manquantes" }]);
                }
            }
            catch (error) {
                res.status(400).json([{ message: error.message }]);
            }
        });
    }
};
exports.CommandeController = CommandeController;
