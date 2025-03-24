import { Request } from "express";
import { GestionArticle } from "../repositry/gestion_articles";
import { crypt } from "../config/crypto-js";

const HomeController = {
    //@route /api/home
    //@method GET
    async getHomeData(req: Request, res: any){
        try {
            const offset = req.params.offset ? Number.parseInt(req.params.offset) : 0;

            const data = {
                articlesPromo: await GestionArticle.getArticleOnPromo(offset),
                articlesFeature : await GestionArticle.getArticleOnFeatured(offset),
                articlesBestSell: await GestionArticle.getTopArticleSeller(),
                articlesTrend: await GestionArticle.getArticleOnTrend(offset),
            };

            const response = {
                data: {
                    firt_section: {
                        // produit en vedette
                        title: 'En vedette',
                        description: "Ne manquer pas ces articles à prix reduit aujourd'hui...",
                        article: data.articlesFeature,
                    },
                    secode_section: {
                        //deal de la semaine
                        title: "Deal de la semaines",
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
                    /*list_categories: [{
                      ...attributs de la categorie
                      sous_categorie: SousCategorie[];
                    }],
                     v_img: image[]*/
                }
            }
            return res.status(200).json([{data: crypt.encode(response.data)}]);
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    }
}

export {HomeController};