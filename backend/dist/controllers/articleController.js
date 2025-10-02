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
exports.ArticleController = void 0;
const gestion_articles_1 = require("../repositry/gestion_articles");
const crypto_js_1 = require("../config/crypto-js");
const gestion_images_1 = require("../repositry/gestion_images");
const SousCategorie_1 = __importDefault(require("../models/SousCategorie"));
//@route /api/admin/article
//@method POST
//@bodyparams :true
const ArticleController = {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Vérification, si des erreurs de validation sont présentes
                if (!req.body.errors) {
                    // Si req.body.errors n'existe pas, alor la validation a réussi
                    // Les données sont validées et disponibles dans req.body
                    let article;
                    article = req.body;
                    const resp = yield gestion_articles_1.GestionArticle.save(article);
                    const imgAssigment = yield gestion_images_1.GestionImage.articleImageAssigment(resp.idArticle, article.imgsID);
                    const recentlyArticleAdded = yield gestion_articles_1.GestionArticle.getOne(resp.idArticle);
                    return res
                        .status(200)
                        .json([{ data: crypto_js_1.crypt.encode(recentlyArticleAdded), done: true }]);
                }
                else {
                    // La validation a échoué, les erreurs sont dans req.body.errors
                    return res.status(403).json({ message: req.body.errors[0].msg });
                }
            }
            catch (err) {
                return res.status(400).send([{ ErrorMessage: err.message }]);
            }
        });
    },
    //@route /api/article
    //@method PUT
    //@bodyparam :true
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.errors) {
                    let article;
                    article = req.body;
                    const resp = yield gestion_articles_1.GestionArticle.update(article);
                    const imgAssigment = yield gestion_images_1.GestionImage.updateImageAssigment(article.idArticle, article.imgsID);
                    let productAdded;
                    if (imgAssigment instanceof Error) {
                        return res.status(400).json({ message: imgAssigment.message, of: imgAssigment });
                    }
                    else {
                        productAdded = yield gestion_articles_1.GestionArticle.getOne(article.idArticle);
                    }
                    return resp
                        ? res.status(200).json([
                            {
                                isDone: true,
                                data: crypto_js_1.crypt.encode(productAdded),
                                message: "Mise à jour effectué avec succés",
                            },
                        ])
                        : res.status(200).json([]);
                }
                else {
                    return res.status(400).json({ message: req.body.errors[0].msg });
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/article
    //@method delete
    //@urlparams :id
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = req.params.id;
                    const resp = yield gestion_articles_1.GestionArticle.destroy(Number.parseInt(id));
                    const message = resp == 0
                        ? "Aucun article supprimé"
                        : "Suppréssion éffectuer avec succés !";
                    return res
                        .status(200)
                        .json([{ done: resp != 0, affectedRows: resp, message: message }]);
                }
                else {
                    return res
                        .status(400)
                        .json([{ done: false, id: req.params.id, message: "ID indéfini" }]);
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message }]);
            }
        });
    },
    //@route /api/article-details
    //@method GET
    //@urlparams :id
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = Number.parseInt(req.params.id);
                    const resp = yield gestion_articles_1.GestionArticle.getOne(id);
                    return resp.length != 0
                        ? res.status(200).json([{ data: crypto_js_1.crypt.encode(resp) }])
                        : res.status(200).json([]);
                }
                else {
                    return res.status(400).json([{ message: "Id de l'article indefini " }]);
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message }]);
            }
        });
    },
    //@route /api/article-promo
    //@method GET
    //@urlparams :offset
    getArticlesOnPromo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //Obtention des articles sous promo
            try {
                if (req.params.offset) {
                    const data = yield gestion_articles_1.GestionArticle.getArticleOnPromo(Number.parseInt(req.params.offset));
                    return data
                        ? res.status(200).json([{ data: crypto_js_1.crypt.encode(data) }])
                        : res.status(200).json([]);
                }
                else {
                    //numéro de debut de selection d'article pas défini
                    const data = yield gestion_articles_1.GestionArticle.getArticleOnPromo(1);
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
    //@route /api/article-categorie
    //@method GET
    //@urlparams :id
    getByCategorie(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.id) {
                    const id = req.params.id;
                    const resp = yield gestion_articles_1.GestionArticle.getByCategories(Number.parseInt(id));
                    return resp.length != 0
                        ? res.status(200).json([{ data: resp }])
                        : res.status(200).json([]);
                }
                else {
                    return res
                        .status(400)
                        .send([{ message: "Id de la categorie indefini" }]);
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message, err: error }]);
            }
        });
    },
    //@route /api/article
    //@method GET
    //@urlparams :offset
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data;
                if (req.params.offset && req.query) {
                    const params = req.query;
                    const attributesFilter = typeof params.attribute === "string"
                        ? params.attribute.split(",")
                        : undefined;
                    const categories = typeof params.category === "string"
                        ? params.category.split(",")
                        : undefined;
                    const filter = {
                        attribute: attributesFilter,
                        categories: categories,
                    };
                    console.log('categorie get', params);
                    const subCategoryLoader = (optionalFilter) => __awaiter(this, void 0, void 0, function* () {
                        const sousCategorieIDs = yield SousCategorie_1.default.findAll({
                            where: {
                                nom: params.category,
                            },
                            attributes: ["idSousCategorie"],
                        });
                        const idSousCategorie = sousCategorieIDs[0].idSousCategorie ? sousCategorieIDs[0].idSousCategorie : null;
                        return idSousCategorie ? yield gestion_articles_1.GestionArticle.getBySubCategorie(Number.parseInt(req.params.offset), idSousCategorie, optionalFilter ? optionalFilter : null) : [];
                    });
                    if (attributesFilter || categories) {
                        if (params.isUniqueFilter && params.category) {
                            //filtre sur les sous categories en excluant les categorie
                            data = yield subCategoryLoader(filter);
                        }
                        else {
                            data = yield gestion_articles_1.GestionArticle.getAll(Number.parseInt(req.params.offset), filter, true);
                        }
                    }
                    else {
                        //pas de parametre de filtre alors test s'il s'agit d'une sous categorie
                        if (params.isUniqueFilter && params.category) {
                            data = yield subCategoryLoader();
                        }
                        data = yield gestion_articles_1.GestionArticle.getAll(Number.parseInt(req.params.offset), undefined, true);
                    }
                    return data.length != 0
                        ? res
                            .status(200)
                            .json([
                            { data: data, total: yield gestion_articles_1.GestionArticle.countArticle() },
                        ])
                        : res.status(200).json([]);
                }
                else {
                    const params = req.query;
                    const data = yield gestion_articles_1.GestionArticle.getAll(0, undefined, true);
                    return data.length != 0
                        ? res.status(200).json([{ data: crypto_js_1.crypt.encode(data) }])
                        : res.status(200).json([]);
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message }]);
            }
        });
    },
    //@route /api/admin/article-changes-categorie
    //@method PUT
    //@bodyparams :true
    updateCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //changer la catégorie d'un article
            try {
                if (!req.body.errors) {
                    const { idArticle, new_categorieId } = req.body;
                    const resp = yield gestion_articles_1.GestionArticle.updateCategories(idArticle, new_categorieId);
                    return resp
                        ? res
                            .status(200)
                            .json([{ message: "Mise à jour effectué !", resp: resp }])
                        : res
                            .status(201)
                            .json([{ message: "Aucune Modification éffectué !" }]);
                }
                else {
                    return res.status(400).json([{ message: "IDs manquants !" }]);
                }
            }
            catch (error) {
                return res.status(400).json([{ message: error.message }]);
            }
        });
    },
    //@route /api/search
    //@method GET
    //@queryparams :article
    search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.params.article) {
                    const query = req.params.article;
                    const resp = yield gestion_articles_1.GestionArticle.search(query);
                    return resp.length != 0 ? res.status(200).json([{ data: resp }]) : res.status(200).json([]);
                }
                else {
                    return res.status(400).json([{ message: "Requête de recherche vide" }]);
                }
            }
            catch (error) {
                return res.status(400).send([{ message: error.message }]);
            }
        });
    },
};
exports.ArticleController = ArticleController;
