import Article from "../models/Article"
import { Articles } from "./objets/article";
import Image from "../models/image";
import { fn, col, literal, Sequelize } from "sequelize";
import {sequelize} from "../config/database"; // Adjust the path as necessary
import Commande from "../models/Commande";
import CommandArticle from "../models/CommandArticle";

const GestionArticle ={

     async save(artilce: Articles){
    
           const dataRetrieves = await Article.create(artilce);
            
           return dataRetrieves.dataValues;
        }, 

    async update(article: Articles){
            const dataRetrieve = await Article.update(
                article,
                {
                    where: {
                        idArticle: article.idArticle
                    },

                    returning: true
                }
            );

            return dataRetrieve;
       },

        async destroy(id: number){
            const dataRetrieve = await Article.destroy({
                where: {
                    idArticle: id
                } 
            });

            return dataRetrieve;
        },

        async getOne(id: number){
            const dataRetrieve = await Article.findAll({
                where: {
                    idArticle : id
                },
                include: [{
                    model: Image,
                    required: true,
                }]
            });
            
            return dataRetrieve;
        },

        async getArticleOnPromo(offset: number){
            const data = await Article.findAll(
                {
                    where: {
                        promo : true
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

        async getArticleOnFeatured(offset: number){
            const data = await Article.findAll(
                {
                    where: {
                        featured : true
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
                        trend : true
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

        async getAll(offset: number){
            const data = await Article.findAll(
                {
                    offset: offset,
                    limit: 15,
                    include:[
                        {
                            model: Image,
                            required: true,
                        }
                    ]

                }
            );

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

        async getTopArticleSeller(){
            const topArticles = await Article.findAll({
                attributes: [
                    'id',
                    'nom_article',
                    [fn('SUM', col('CommandArticle.quantite')), 'total_vendu']
                ],
                include: [
                    {
                        model: CommandArticle,
                        as: 'CommandArticle',
                        attributes: [],
                        include: [
                            {
                                model: Commande,
                                as: 'Commande',
                                attributes: [],
                                where: {
                                    statut: 'payé'
                                }
                            }
                        ]
                    }
                ],
                group: ['Article.id'],
                order: [[literal('total_vendu'), 'DESC']],
                limit: 10 
            });
    
            return topArticles;
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

