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
const User_1 = __importDefault(require("../models/User"));
const Paiment_1 = __importDefault(require("../models/Paiment"));
const crypto_js_1 = require("../config/crypto-js");
const gest_paiement = {
    //@route/api/paiement
    //@mathod post
    //@data = objet, response true ? false
    //enregistrement d'un paiement
    addPaiement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                if (data != null) {
                    yield Paiment_1.default.create({
                        'idUser': data.idUser,
                        'montant': data.montant,
                        'methodePaiement': data.methodePaiement
                    });
                    return res.status(201).json({
                        'payer': true,
                        'message': 'paiement effectue avec success!'
                    });
                }
                return res.status(404).json({ message: 'veillez fournir les informations' });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    'payer': false,
                    'message': 'echec du paiement'
                });
            }
        });
    },
    //@route/api/admin/allpaiement
    //@mathod get
    //@response true data:allPaiement? false data = []; allPaiement = objet
    //liste des paiements;
    showpaiement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allPaiement = yield Paiment_1.default.findAll({
                    attributes: ['montant', 'methodePaiement', 'date'],
                    include: [{
                            model: User_1.default,
                            attributes: ['nom', 'tel']
                        }]
                });
                if (allPaiement[0] == null) {
                    res.status(400).json({
                        'data': [],
                        'message': 'aucun paiement trouve'
                    });
                }
                return res.status(202).json({
                    'data': crypto_js_1.crypt.encode(allPaiement)
                });
            }
            catch (error) {
                console.log(error);
                res.status(500).json({
                    'isDone': false,
                    'message': 'erreur sur le serveur'
                });
            }
            ;
        });
    },
    //@route /api/admin/detail-paiement/:id
    //@method get
    //@response true ? false
    //liste des paiement d'un utilisateur
    showDetailUserPaiement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let id = req.params.id;
                const informationUser = yield Paiment_1.default.findAll({
                    where: {
                        idUser: id,
                    },
                    include: [
                        {
                            model: User_1.default,
                            attributes: ['nom', 'prenom', 'tel']
                        }
                    ],
                    attributes: ['montant', 'methodePaiement', 'date']
                });
                if (informationUser[0] == null) {
                    return res.status(404).json({
                        'trouve': false,
                        'message': 'aucun paiement disponible pour ce client'
                    });
                }
                return res.status(200).json({
                    'trouve': true,
                    'data': crypto_js_1.crypt.encode(informationUser)
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    'isDone': false,
                    'message': 'erreur sur le serveur'
                });
            }
        });
    }
};
exports.default = gest_paiement;
