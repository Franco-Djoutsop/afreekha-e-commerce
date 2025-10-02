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
exports.GestionArticle = void 0;
const Article_1 = __importDefault(require("../models/Article"));
const image_1 = __importDefault(require("../models/image"));
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database"); // Adjust the path as necessary
const categorie_1 = __importDefault(require("../models/categorie"));
const SousCategorie_1 = __importDefault(require("../models/SousCategorie"));
const GestionArticle = {
    save(artilce) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieves = yield Article_1.default.create(artilce);
            return dataRetrieves.dataValues;
        });
    },
    update(article) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieve = yield Article_1.default.update(article, {
                where: {
                    idArticle: article.idArticle,
                },
                returning: true,
            });
            return dataRetrieve;
        });
    },
    destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieve = yield Article_1.default.destroy({
                where: {
                    idArticle: id,
                },
            });
            return dataRetrieve;
        });
    },
    search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query || query.trim() === "") {
                return [];
            }
            return yield Article_1.default.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        {
                            nom_article: {
                                [sequelize_1.Op.like]: `%${query}%`,
                            },
                        },
                        // Utilisation de SOUNDEX
                        (0, sequelize_1.where)((0, sequelize_1.fn)('SOUNDEX', (0, sequelize_1.col)('nom_article')), (0, sequelize_1.fn)('SOUNDEX', query)),
                    ],
                },
                include: [
                    {
                        model: image_1.default,
                        required: true,
                    },
                ],
            });
        });
    },
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dataRetrieve = yield Article_1.default.findAll({
                where: {
                    idArticle: id,
                },
                include: [
                    {
                        model: image_1.default,
                        required: true,
                    },
                ],
            });
            return dataRetrieve;
        });
    },
    getArticleOnPromo(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Article_1.default.findAll({
                where: {
                    promo: 1,
                },
                offset: offset,
                limit: 15,
                include: [
                    {
                        model: image_1.default,
                        required: true,
                    },
                ],
            });
            return data;
        });
    },
    getBySubCategorie(offset, idSousCategorie, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            console.log('offset', offset);
            console.log('filter', filter);
            console.log('idSousCategorie', idSousCategorie);
            if (filter) {
                const whereClause = {
                    idSousCategorie: idSousCategorie,
                };
                const includeClause = [{ model: image_1.default, required: true }];
                if (filter.attribute && filter.attribute.length > 0) {
                    whereClause[sequelize_1.Op.or] = [
                        { taille: { [sequelize_1.Op.in]: filter.attribute } },
                        { couleur: { [sequelize_1.Op.in]: filter.attribute } },
                    ];
                }
                if (filter.categories && filter.categories.length > 0) {
                    includeClause.push({
                        model: categorie_1.default,
                        attributes: ["nom"],
                        include: [
                            {
                                model: SousCategorie_1.default,
                                attributes: ["nom"],
                            },
                        ],
                        required: true,
                    });
                }
                else {
                    // Inclure les catégories sans filtre si besoin
                    includeClause.push({
                        model: SousCategorie_1.default,
                        attributes: ["nom"],
                        include: [
                            {
                                model: SousCategorie_1.default,
                                attributes: ["nom"],
                            },
                        ],
                        required: true,
                    });
                }
                data = yield Article_1.default.findAll({
                    offset: offset,
                    limit: 15,
                    where: whereClause,
                    include: includeClause,
                });
            }
            else {
                data = yield Article_1.default.findAll({
                    offset: offset,
                    limit: 15,
                    where: {
                        idSousCategorie: idSousCategorie,
                    },
                    include: [
                        {
                            model: image_1.default,
                            required: true,
                        },
                    ],
                });
            }
            return data;
        });
    },
    getAll(offset, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            let data;
            if (filter) {
                const whereClause = {};
                const includeClause = [{ model: image_1.default }];
                if (filter.attribute && filter.attribute.length > 0) {
                    whereClause[sequelize_1.Op.or] = [
                        { taille: { [sequelize_1.Op.in]: filter.attribute } },
                        { couleur: { [sequelize_1.Op.in]: filter.attribute } },
                    ];
                }
                if (filter.categories && filter.categories.length > 0) {
                    includeClause.push({
                        model: categorie_1.default,
                        where: { nom: { [sequelize_1.Op.in]: filter.categories } },
                    });
                }
                else {
                    // Inclure les catégories sans filtre si besoin
                    includeClause.push({ model: categorie_1.default });
                }
                data = yield Article_1.default.findAll({
                    offset: offset,
                    where: whereClause,
                    include: includeClause,
                });
            }
            else {
                data = yield Article_1.default.findAll({
                    offset: offset,
                    include: [
                        {
                            model: image_1.default,
                        },
                    ],
                });
            }
            return data;
        });
    },
    getArticleOnFeatured(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Article_1.default.findAll({
                where: {
                    featured: 1,
                },
                offset: offset,
                limit: 15,
                include: [
                    {
                        model: image_1.default,
                        required: true
                    },
                ],
            });
            return data;
        });
    },
    getArticleOnTrend(offset) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Article_1.default.findAll({
                where: {
                    inTrend: 1,
                },
                offset: offset,
                limit: 15,
                include: [
                    {
                        model: image_1.default,
                        required: true
                    },
                ],
            });
            return data;
        });
    },
    getByCategories(categorieID) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield Article_1.default.findAll({
                where: { idCategorie: categorieID },
                include: [
                    {
                        model: image_1.default,
                    },
                ],
            });
            return data;
        });
    },
    updateCategories(articleID, new_categorieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryResp = yield Article_1.default.update({ idCategorie: new_categorieId }, {
                where: {
                    idArticle: articleID,
                },
                returning: true,
            });
            return queryResp;
        });
    },
    getTopArticleSeller(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const topArticles = yield database_1.sequelize.query(`
               SELECT 
                    a.*,
                    SUM(ca.quantite) AS totalSold,
                    (
                    SELECT i.lien
                    FROM article_image ai
                    JOIN images i ON ai.idImage = i.idImage
                    WHERE ai.idArticle = a.idArticle
                    LIMIT 1
                    ) AS lien
                FROM articles a
                JOIN commandes_articles ca ON a.idArticle = ca.idArticle
                JOIN commandes c ON ca.idCommande = c.idCommande
                WHERE c.statut = 'payé'
                GROUP BY a.idArticle, a.nom_article
                HAVING SUM(ca.quantite) > 0
                ORDER BY totalSold DESC
                LIMIT ${limit}
                `, {
                type: sequelize_1.QueryTypes.SELECT,
                model: Article_1.default,
                mapToModel: true,
            });
            return topArticles;
        });
    },
    countArticle() {
        return __awaiter(this, void 0, void 0, function* () {
            const count = yield Article_1.default.count();
            return count;
        });
    },
    updateMultipleArticlesQty(articles, dbArticles) {
        return __awaiter(this, void 0, void 0, function* () {
            const transaction = yield database_1.sequelize.transaction();
            try {
                // Mettre à jour les quantités
                for (const { idArticle, qty } of articles) {
                    const article = dbArticles.find((a) => a.idArticle === idArticle);
                    if (article) {
                        article.quantite -= qty;
                        yield article.save({ transaction });
                    }
                }
                yield transaction.commit();
                return { success: true, message: "Stock mis à jour avec succès" };
            }
            catch (error) {
                yield transaction.rollback();
                return { success: false, message: error.message };
            }
        });
    },
    getAllArticles(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = options.offset || 0;
                // Gestion des filtres
                const attributesFilter = typeof options.attribute === "string"
                    ? options.attribute.split(",")
                    : Array.isArray(options.attribute)
                        ? options.attribute
                        : undefined;
                const categories = typeof options.idCategorie === "string"
                    ? options.idCategorie.split(",")
                    : Array.isArray(options.idCategorie)
                        ? options.idCategorie
                        : undefined;
                let data;
                let total;
                // Application des filtres si présents
                if (attributesFilter || categories) {
                    const filter = {
                        attribute: attributesFilter,
                        categories: categories,
                    };
                    if (options.isUniqueFilter) {
                        // Filtre sur les sous-catégories
                        const sousCategorieIDs = yield SousCategorie_1.default.findAll({
                            where: { nom: categories },
                            attributes: ["idSousCategorie"],
                        });
                        if (sousCategorieIDs.length === 0) {
                            return { data: [], total: 0 };
                        }
                        const idCategorie = sousCategorieIDs[0].idSousCategorie;
                        data = yield GestionArticle.getBySubCategorie(offset, idCategorie, filter);
                    }
                    else {
                        data = yield GestionArticle.getAll(offset, filter);
                    }
                }
                else {
                    data = yield GestionArticle.getAll(offset);
                }
                // Calcul du total si nécessaire
                if (data.length > 0 && offset === 0) {
                    total = yield GestionArticle.countArticle();
                }
                return {
                    data: data.length > 0 ? data : [],
                    total: total || data.length,
                };
            }
            catch (error) {
                console.error("Error in getAllArticles:", error);
                return { data: [], total: 0 };
            }
        });
    },
    getCategoriesAndSub() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield categorie_1.default.findAll({
                    include: [{ model: SousCategorie_1.default }],
                });
                if (result[0] === null) {
                    return;
                }
                return {
                    data: result,
                    isDone: true,
                };
            }
            catch (error) {
                console.log(error);
                return error;
            }
        });
    },
    getAllDefaultArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getAllArticles({ offset: 0 });
        });
    },
};
exports.GestionArticle = GestionArticle;
