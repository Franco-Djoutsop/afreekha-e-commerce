import Article from "../models/Article";
import { Articles } from "./objets/article";
import Image from "../models/image";
import { QueryTypes, Op } from "sequelize";
import {sequelize} from "../config/database"; // Adjust the path as necessary
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";

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

  async getBySubCategorie(offset: number, idCategorie: number, filter?: {attribute?: string[], categories?: string[]}){
    let data: any;
    if(filter){
        const whereClause: any = {
            idCategorie: idCategorie
        };
        const includeClause : any = [
          { model: Image, required: true }
        ];

        if (filter.attribute && filter.attribute.length > 0) {
          whereClause[Op.or] = [
            { taille: { [Op.in]: filter.attribute } },
            { couleur: { [Op.in]: filter.attribute } }
          ];
        }

        if (filter.categories && filter.categories.length > 0) {
          includeClause.push({
            model: Categorie,
            attributes: ['nom'],
            include: [
              {
                model: SousCategorie,
                attributes: ['nom']
              }
            ],
            required: true
          });
        } else {
          // Inclure les catégories sans filtre si besoin
          includeClause.push({
            model: Categorie,
            attributes: ['nom'],
            include: [
              {
                model: SousCategorie,
                attributes: ['nom']
              }
            ],
            required: true
          });
        }

        data = await Article.findAll({
          offset: offset,
          limit: 15,
          where: whereClause,
          include: includeClause
        });

    }else{
      data = await Article.findAll({
        offset: offset,
        limit: 15,
        where:{
            idCategorie : idCategorie
        },
        include: [
          {
            model: Image,
            required: true,
          }
        ],
        
      });
    }

    return data;
  },

  async getAll(offset: number, filter?: {attribute?: string[], categories?: string[]}) {
    let data: any;
    if(filter){
        const whereClause: any = {};
        const includeClause : any = [
          { model: Image, required: true }
        ];

        if (filter.attribute && filter.attribute.length > 0) {
          whereClause[Op.or] = [
            { taille: { [Op.in]: filter.attribute } },
            { couleur: { [Op.in]: filter.attribute } }
          ];
        }

        if (filter.categories && filter.categories.length > 0) {
          includeClause.push({
            model: Categorie,
            where: { nom: { [Op.in]: filter.categories } },
            required: true
          });
        } else {
          // Inclure les catégories sans filtre si besoin
          includeClause.push({ model: Categorie, required: false });
        }

        data = await Article.findAll({
          offset: offset,
          limit: 15,
          where: whereClause,
          include: includeClause
        });

    }else{
      data = await Article.findAll({
        offset: offset,
        limit: 15,
        include: [
          {
            model: Image,
            required: true,
          }
        ],
        
      });
    }

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

        
        async updateMultipleArticlesQty(articles: { idArticle: number, qty: number }[], dbArticles: Article[]) {
          const transaction = await sequelize.transaction();
      
          try {
             
              // Mettre à jour les quantités
              for (const { idArticle, qty } of articles) {
                  const article = dbArticles.find(a => a.idArticle === idArticle);
                 if(article){
                  article.quantite -= qty;
                  await article.save({ transaction });
                 }
              }
      
              await transaction.commit();
              return { success: true, message: "Stock mis à jour avec succès" };
      
          } catch (error: any) {
              await transaction.rollback();
              return { success: false, message: error.message };
          }          
      },
      
          async updateMultipleArticlesQtyAdd(articles: { idArticle: number, qty: number }[], dbArticles: Article[]) {
            const transaction = await sequelize.transaction();
        
            try {
               
                // Mettre à jour les quantités
                for (const { idArticle, qty } of articles) {
                    const article = dbArticles.find(a => a.idArticle === idArticle);
                   if(article){
                    article.quantite += qty;
                    await article.save({ transaction });
                   }
                }
        
                await transaction.commit();
                return { success: true, message: "Stock mis à jour avec succès" };
        
            } catch (error: any) {
                await transaction.rollback();
                return { success: false, message: error.message };
            }
          }

};

export { GestionArticle };
