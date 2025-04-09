import Article from "../models/Article";
import { Articles } from "./objets/article";
import Image from "../models/image";
import { fn, col, literal, Sequelize, QueryTypes } from "sequelize";
import {sequelize} from "../config/database"; // Adjust the path as necessary
import Commande from "../models/Commande";
import CommandArticle from "../models/CommandArticle";
import UserRole from "../models/userRoles";

const GestionArticle = {
  async save(artilce: Articles) {
    
    const dataRetrieves = await Article.create(artilce);

    return dataRetrieves.dataValues;
  },

  async update(article: Articles) {
    const dataRetrieve = await Article.update(article, {
      where: {
        idArticle: article.idArticle,
      },

      returning: true,
    });

    return dataRetrieve;
  },

  async destroy(id: number) {
    const dataRetrieve = await Article.destroy({
      where: {
        idArticle: id,
      },
    });

    return dataRetrieve;
  },

  async getOne(id: number) {
    const dataRetrieve = await Article.findAll({
      where: {
        idArticle: id,
      },
      include: [
        {
          model: Image,
          required: true,
        },
      ],
    });

    return dataRetrieve;
  },

  async getArticleOnPromo(offset: number) {
    const data = await Article.findAll({
      where: {
        promo: 1,
      },
      offset: offset,
      limit: 15,
      include: [
        {
          model: Image,
          required: true,
        },
      ],
    });
    return data;
  },

  async getAll(offset: number) {
    const data = await Article.findAll({
      offset: offset,
      limit: 15,
      include: [
        {
          model: Image,
          required: true,
        },
      ],
    });

    return data;
  },

        async getArticleOnFeatured(offset: number){
            const data = await Article.findAll(
                {
                    where: {
                        featured : 1
                    },
                    offset: offset,
                    limit: 15,
                    include: [{
                        model: Image,
                        required: true
                    }]
                }
            )
            return data;
        },

        async getArticleOnTrend(offset: number){
            const data = await Article.findAll(
                {
                    where: {
                        inTrend : 1
                    },
                    offset: offset,
                    limit: 15,
                    include: [{
                        model: Image,
                        required: true
                    }]
                }
            )
            return data;
        },

        async getByCategories(categorieID: number){
          
            const data = await Article.findAll({

                where: {idCategorie : categorieID},

                include: [
                    {
                        model: Image,
                        required : true,
                    }
                ]
            }); 

            return data;
        },

        

        async updateCategories(articleID: number, new_categorieId: number){
            const queryResp = await Article.update(
                {idCategorie : new_categorieId},
                {
                    where: {
                         idArticle : articleID
                    },

                    returning: true
                }
            )
            
            return queryResp;
        },

        async getTopArticleSeller(limit: number){
            
            const topArticles = await sequelize.query(`
               SELECT 
                    a.idArticle,
                    a.nom_article,
                    a.prix,
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
                type: QueryTypes.SELECT,
                model: Article,
                mapToModel: true
              });
    
            return topArticles;
        },

        async countArticle(){
            const count = await Article.count();
            return count;
        },

        async updateArticleQty(articleID: number, qty: number){
            const transaction = await sequelize.transaction();
            
            const article = await Article.findByPk(articleID, { transaction });

            if (!article) {
                throw new Error(`Article ID ${articleID} non trouvé`);
            }

            // Vérifier que la quantité demandée ne dépasse pas le stock actuel
            if (article.quantite < qty) {
                throw new Error(`Stock insuffisant pour l'article ID ${articleID}`);
            }

            // Mettre à jour la quantité
            article.quantite -= qty;
            await article.save({ transaction });
            await transaction.commit(); // Valider la transaction
            
            return { success: true, message: "Stock mis à jour avec succès" };
        }

};

export { GestionArticle };
