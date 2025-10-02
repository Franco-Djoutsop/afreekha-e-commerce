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
exports.GestionFacture = void 0;
const Adresse_1 = __importDefault(require("../models/Adresse"));
const Article_1 = __importDefault(require("../models/Article"));
const CommandArticle_1 = __importDefault(require("../models/CommandArticle"));
const Commande_1 = __importDefault(require("../models/Commande"));
const image_1 = __importDefault(require("../models/image"));
const User_1 = __importDefault(require("../models/User"));
const GestionFacture = {
    create(facture) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const records = facture.idArtice.map((id) => ({
                    idCommande: facture.idCommande,
                    idArticle: id,
                }));
                const queryRslt = yield CommandArticle_1.default.bulkCreate(records);
                return queryRslt;
            }
            catch (error) {
                console.log('erreur de creation', error.message);
            }
        });
    },
    getFactureCommandUser(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const articlesWithFacturesAndUsers = yield Commande_1.default.findAll({
                offset: offset,
                order: [
                    ['idCommande', 'DESC']
                ],
                include: [
                    {
                        model: User_1.default,
                        attributes: ["idUser", "nom", "prenom", "email", "tel", "express_adresse"], // Sélectionne uniquement ces colonnes
                    },
                    {
                        model: Article_1.default,
                        attributes: ["idArticle", "nom_article", "prix"],
                        through: {
                            attributes: ['quantite', 'prix_achat', 'prix_total'],
                            as: "total_article" // Récupérer la quantité de chaque article commandé
                        },
                        include: [
                            {
                                model: image_1.default,
                                attributes: ['lien'],
                            }
                        ],
                        as: 'articles',
                    },
                    {
                        model: Adresse_1.default
                    }
                ]
            });
            return articlesWithFacturesAndUsers;
        });
    },
    getFactureOfUser(offset, idUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const facturesOfUser = yield Commande_1.default.findAll({
                limit: 30,
                offset: offset,
                where: { idUser: idUser },
                include: [
                    {
                        model: User_1.default,
                        //required: true,
                        attributes: ["idUser", "nom", "prenom", "tel"],
                    },
                    {
                        model: Article_1.default,
                        // INNER JOIN avec Article
                        through: {
                            attributes: ['quantite'],
                            as: "total_article"
                        },
                        include: [
                            {
                                model: image_1.default,
                                attributes: ['lien']
                            },
                        ],
                        as: 'articles',
                    }
                ],
            });
            return facturesOfUser;
        });
    },
};
exports.GestionFacture = GestionFacture;
