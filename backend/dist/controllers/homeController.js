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
exports.HomeController = void 0;
const gestion_articles_1 = require("../repositry/gestion_articles");
const gestion_images_1 = require("../repositry/gestion_images");
const gestion_commande_1 = require("../repositry/gestion_commande");
const User_1 = __importDefault(require("../models/User"));
const categorie_1 = __importDefault(require("../models/categorie"));
const SousCategorie_1 = __importDefault(require("../models/SousCategorie"));
const img_file_1 = require("../config/img_file");
const crypto_js_1 = require("../config/crypto-js");
const HomeController = {
    //@route /api/home-data ----FrontEnd, clientSide
    //@method GET
    //urlparams :true {offset}
    getHomeData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = req.params.offset ? Number.parseInt(req.params.offset) : 0;
                const data = {
                    articlesPromo: yield gestion_articles_1.GestionArticle.getArticleOnPromo(offset),
                    articlesFeature: yield gestion_articles_1.GestionArticle.getArticleOnFeatured(offset),
                    articlesBestSell: yield gestion_articles_1.GestionArticle.getTopArticleSeller(12),
                    articlesTrend: yield gestion_articles_1.GestionArticle.getArticleOnTrend(offset),
                    imageFeatured: yield gestion_images_1.GestionImage.getFeatured(),
                    categories: yield categorie_1.default.findAll({
                        include: [
                            {
                                model: SousCategorie_1.default,
                            },
                        ],
                    }),
                };
                const response = {
                    data: {
                        firt_section: {
                            // produit en vedette
                            title: "En vedette",
                            description: "Ne manquer pas ces articles à prix reduit aujourd'hui...",
                            article: data.articlesFeature,
                        },
                        secode_section: {
                            //deal de la semaine
                            title: "Deal de la semaine",
                            description: "Ces articles à prix promo cette semaine...",
                            article: data.articlesPromo,
                        },
                        third_section: {
                            //meilleur vente,
                            title: "Nos meilleures ventes",
                            description: "les articles les plus vendus.",
                            article: data.articlesBestSell,
                        },
                        fourth_section: {
                            //tendances
                            title: "Article en tendance",
                            description: "Article en tendance",
                            article: data.articlesTrend,
                        },
                        list_categories: data.categories,
                        v_img: data.imageFeatured,
                        temp: (0, img_file_1.featuredImageFilter)(data.imageFeatured),
                    },
                };
                return res.status(200).json([{ data: response.data }]);
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/home/{offset} ----adminSide
    //@method GET
    //urlparams :true
    getHomeAdminData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = req.params.offset ? Number.parseInt(req.params.offset) : 0;
                const resp = {
                    data: {
                        articles_nbr: yield gestion_articles_1.GestionArticle.countArticle(),
                        topArticleSeller: yield gestion_articles_1.GestionArticle.getTopArticleSeller(offset),
                        totalSeller: yield gestion_commande_1.GestionCommande.getTotalSeller(), //"commande payé"
                        totalCommandePending: yield gestion_commande_1.GestionCommande.getTotalCommandePending(), //statut "en attente"
                        general_amount: yield gestion_commande_1.GestionCommande.getGeneralAmount(), // montant total des facture payé
                        total_user: yield User_1.default.count(),
                        totalCategorie: yield gestion_commande_1.GestionCommande.getTotalCategorie(),
                        totalCommande: yield gestion_commande_1.GestionCommande.getTotalCommande(),
                        allCommands: yield gestion_commande_1.GestionCommande.getAllCommande(),
                        allArticles: crypto_js_1.crypt.encode(yield gestion_articles_1.GestionArticle.getAllDefaultArticles()),
                        allCategories: yield gestion_articles_1.GestionArticle.getCategoriesAndSub(),
                        allUsers: crypto_js_1.crypt.encode(yield gestion_commande_1.GestionCommande.getAllUser())
                        // allUserInfos: await GestionAdresse.getUserDetails(req.user?.id ?? 3),
                    },
                };
                return res.status(200).json([{ data: resp.data }]);
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
};
exports.HomeController = HomeController;
