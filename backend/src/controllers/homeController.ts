import { Request } from "express";
import { GestionArticle } from "../repositry/gestion_articles";
import { GestionImage } from "../repositry/gestion_images";
import { GestionCommande } from "../repositry/gestion_commande";
import User from "../models/User";
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";
import { featuredImageFilter } from "../config/img_file";
import gest_categorie from "./categorieController";
import { ArticleController } from "./articleController";
import { GestionAdresse } from "../repositry/gestion_adresse";
import { crypt } from "../config/crypto-js";

const HomeController = {
  //@route /api/home-data ----FrontEnd, clientSide
  //@method GET
  //urlparams :true {offset}
  async getHomeData(req: Request, res: any) {
    try {
      const offset = req.params.offset ? Number.parseInt(req.params.offset) : 0;

      const data = {
        articlesPromo: await GestionArticle.getArticleOnPromo(offset),
        articlesFeature: await GestionArticle.getArticleOnFeatured(offset),
        articlesBestSell: await GestionArticle.getTopArticleSeller(12),
        articlesTrend: await GestionArticle.getArticleOnTrend(offset),
        imageFeatured: await GestionImage.getFeatured(),
        categories: await Categorie.findAll({
          include: [
            {
              model: SousCategorie,
            },
          ],
        }),
      };

      const response = {
        data: {
          firt_section: {
            // produit en vedette
            title: "En vedette",
            description:
              "Ne manquer pas ces articles à prix reduit aujourd'hui...",
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
          temp: featuredImageFilter(data.imageFeatured),
        },
      };
      return res.status(200).json([{ data: response.data }]);
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  //@route /api/home/{offset} ----adminSide
  //@method GET
  //urlparams :true
  async getHomeAdminData(req: Request, res: any) {
    try {
      const offset = req.params.offset ? Number.parseInt(req.params.offset) : 0;

      const resp = {
        data: {
          articles_nbr: await GestionArticle.countArticle(),
          topArticleSeller: await GestionArticle.getTopArticleSeller(offset),
          totalSeller: await GestionCommande.getTotalSeller(), //"commande payé"
          totalCommandePending: await GestionCommande.getTotalCommandePending(), //statut "en attente"
          general_amount: await GestionCommande.getGeneralAmount(), // montant total des facture payé
          total_user: await User.count(),
          totalCategorie: await GestionCommande.getTotalCategorie(),
          totalCommande: await GestionCommande.getTotalCommande(),
          allCommands: await GestionCommande.getAllCommande(),
          allArticles: crypt.encode(await GestionArticle.getAllDefaultArticles()),
          allCategories: await GestionArticle.getCategoriesAndSub(),
          allUsers: crypt.encode(await GestionCommande.getAllUser())
          // allUserInfos: await GestionAdresse.getUserDetails(req.user?.id ?? 3),
        },
      };

      return res.status(200).json([{ data: resp.data }]);
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },
};

export { HomeController };
