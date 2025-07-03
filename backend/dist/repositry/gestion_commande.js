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
exports.GestionCommande = void 0;
const sequelize_1 = require("sequelize");
const Article_1 = __importDefault(require("../models/Article"));
const Commande_1 = __importDefault(require("../models/Commande"));
const User_1 = __importDefault(require("../models/User"));
const categorie_1 = __importDefault(require("../models/categorie"));
const gestion_facture_1 = require("./gestion_facture");
const crypto_js_1 = require("../config/crypto-js");
const Role_1 = __importDefault(require("../models/Role"));
const GestionCommande = {
    create(commande) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRslt = yield Commande_1.default.create(commande);
            return queryRslt;
        });
    },
    verifyArticlesExist(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const articles = yield Article_1.default.findAll({
                attributes: [
                    "idArticle",
                    "nom_article",
                    "promo",
                    "pourcentage_promo",
                    "prix",
                    "quantite",
                ],
                where: {
                    idArticle: {
                        [sequelize_1.Op.in]: ids,
                    },
                },
            });
            return articles.length === ids.length
                ? { exist: true, articles: articles }
                : { exist: false, articles: [] };
        });
    },
    supprimer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRslt = yield Commande_1.default.destroy({
                where: {
                    idCommande: id,
                },
            });
            return queryRslt;
        });
    },
    changeStatus(status, id, reportDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRslt = yield Commande_1.default.update({
                statut: status,
                createdAt: reportDate
            }, {
                where: {
                    idCommande: id,
                },
            });
            return queryRslt;
        });
    },
    getUserTotalCommmadePay(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            //montant total d toutes les commandes payé de l'utilisateur
            const sommeTotal = yield Commande_1.default.sum("Montant_total", {
                where: { idUser: idUser, statut: "payé" },
            });
            return sommeTotal;
        });
    },
    getUserTotalCommmade(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            //toutes les commandes de l'utilisateur
            const nber = yield Commande_1.default.count({
                where: { idUser: idUser },
            });
            return nber;
        });
    },
    getUserTotalCommandeNotPay(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            //somme de toutes les commandes de l'utilisateur en attente de paiement
            const sommeTotal = yield Commande_1.default.sum("Montant_total", {
                where: { idUser: idUser, statut: "en cours" },
            });
            return sommeTotal;
        });
    },
    getCommandOwner(idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandsWithUsers = yield Commande_1.default.findAll({
                where: { idUser: idUser },
            });
            return commandsWithUsers;
        });
    },
    getAllCommande() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield gestion_facture_1.GestionFacture.getFactureCommandUser(0);
                return data.length != 0 ? [{ data: crypto_js_1.crypt.encode(data) }] : [];
            }
            catch (error) {
                return [{ message: error.message }];
            }
        });
    },
    getTotalSeller() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalVentes = yield Commande_1.default.count({
                    where: { statut: "payé" }, // Filtrer uniquement les commandes payées
                });
                console.log(`Nombre total de ventes : ${totalVentes}`);
                return totalVentes;
            }
            catch (error) {
                console.error("Erreur lors de la récupération du nombre de ventes:", error);
            }
        });
    },
    getTotalCommandePending() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalVentes = yield Commande_1.default.count({
                    where: { statut: "en attente" }, // Filtrer uniquement les commandes payées
                });
                console.log(`Nombre total de ventes en attente : ${totalVentes}`);
                return totalVentes;
            }
            catch (error) {
                console.error("Erreur lors de la récupération du nombre de ventes:", error);
            }
        });
    },
    getTotalCommande() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalVentes = yield Commande_1.default.count();
                console.log(`Nombre total de ventes : ${totalVentes}`);
                return totalVentes;
            }
            catch (error) {
                console.error("Erreur lors de la récupération du nombre de ventes:", error);
            }
        });
    },
    getGeneralAmount() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalAmount = yield Commande_1.default.sum("Montant_total", {
                    where: { statut: "payé" },
                });
                return totalAmount;
            }
            catch (error) {
                console.log("erreur lors du calcul", error.message);
            }
        });
    },
    getTotalCategorie() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const totalCategorie = categorie_1.default.count();
                return totalCategorie;
            }
            catch (error) {
                console.log("erreur lors du calcul", error.message);
            }
        });
    },
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield User_1.default.findAll({
                    attributes: ["idUser", "nom", "prenom", "email", "createdAt", "tel"],
                    include: [
                        {
                            model: Role_1.default,
                            as: "roles",
                            attributes: ["idRole", "nom"],
                        }
                    ]
                });
                return users;
            }
            catch (error) {
                console.log("erreur lors de la recuperation des utilisateurs", error.message);
            }
        });
    }
};
exports.GestionCommande = GestionCommande;
