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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactureController = void 0;
const gestion_facture_1 = require("../repositry/gestion_facture");
const crypto_js_1 = require("../config/crypto-js");
const gestion_commande_1 = require("../repositry/gestion_commande");
const FactureController = {
    //@route /api/admin/facture
    //@methode POST
    //urlbody :true
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    const { idCommande, idArticles, statut } = req.body;
                    const resp = yield gestion_facture_1.GestionFacture.create({
                        idCommande: idCommande,
                        idArtice: idArticles,
                        statut: statut,
                        date: null,
                    });
                    return res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/facture
    //@methode PUT
    //urlbody :true
    changeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    const { status, commandeId, reportDate } = req.body;
                    const resp = yield gestion_commande_1.GestionCommande.changeStatus(status, commandeId, reportDate);
                    return resp[0] != 0
                        ? res
                            .status(200)
                            .json([{ message: "Statut de la facture changé en : " + status }])
                        : res.status(200).json([]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/facture
    //@methode GET
    //urlparams :true
    getFactureWithArticleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.offset) {
                    const data = yield gestion_facture_1.GestionFacture.getFactureCommandUser(Number.parseInt(req.params.offset));
                    return data.length != 0
                        ? res.status(200).json([{ data: crypto_js_1.crypt.encode(data) }])
                        : res.status(200).json([]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/my-facture
    //@methode GET
    //urlparams :true
    getFactureOfUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.offset && req.params.idUser) {
                    const data = yield gestion_facture_1.GestionFacture.getFactureOfUser(Number.parseInt(req.params.offset), Number.parseInt(req.params.idUser));
                    return data.length != 0
                        ? res.status(200).json([{ data: data }])
                        : res.status(200).json([]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
};
exports.FactureController = FactureController;
