import Article from "../models/Article";
import { Articles } from "./objets/article";
import Image from "../models/image";
import { fn, where, col, literal, Sequelize, QueryTypes, Op } from "sequelize";
import { sequelize } from "../config/database"; // Adjust the path as necessary
import Commande from "../models/Commande";
import CommandArticle from "../models/CommandArticle";
import UserRole from "../models/userRoles";
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

  async search(query: string): Promise<any[]> {
    if (!query || query.trim() === "") {
      return [];
    }
  
    return await Article.findAll({
      where: {
        [Op.or]: [
          {
            nom_article: {
              [Op.like]: `%${query}%`,
            },
          },
          // Utilisation de SOUNDEX
          where(fn('SOUNDEX', col('nom_article')), fn('SOUNDEX', query)),
        ],
      },
      include: [
        {
          model: Image,
          required: true,
        },
      ],
    });
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

  async getBySubCategorie(
    offset: number,
    idSousCategorie: number,
    filter?: { attribute?: string[]; categories?: string[] } | null
  ) {
    let data: any;
    console.log('offset', offset);
    console.log('filter', filter);
    console.log('idSousCategorie', idSousCategorie);
    if (filter) {
      const whereClause: any = {
        idSousCategorie: idSousCategorie,
      };
      const includeClause: any = [{ model: Image, required: true }];
     
      if (filter.attribute && filter.attribute.length > 0) {
        whereClause[Op.or] = [
          { taille: { [Op.in]: filter.attribute } },
          { couleur: { [Op.in]: filter.attribute } },
        ];
      }

      if (filter.categories && filter.categories.length > 0) {
        includeClause.push({
          model: Categorie,
          attributes: ["nom"],
          include: [
            {
              model: SousCategorie,
              attributes: ["nom"],
            },
          ],
          required: true,
        });
      } else {
        // Inclure les catégories sans filtre si besoin
        includeClause.push({
          model: SousCategorie,
          attributes: ["nom"],
          include: [
            {
              model: SousCategorie,
              attributes: ["nom"],
            },
          ],
          required: true,
        });
      }

      data = await Article.findAll({
        offset: offset,
        limit: 15,
        where: whereClause,
        include: includeClause,
      });
    } else {
      data = await Article.findAll({
        offset: offset,
        limit: 15,
        where: {
          idSousCategorie: idSousCategorie,
        },
        include: [
          {
            model: Image,
            required: true,
          },
        ],
      });
    }

    return data;
  },

  async getAll(
    offset: number,
    filter?: { attribute?: string[]; categories?: string[] }
  ) {
    let data: any;
    if (filter) {
      const whereClause: any = {};
      const includeClause: any = [{ model: Image, required: true }];

      if (filter.attribute && filter.attribute.length > 0) {
        whereClause[Op.or] = [
          { taille: { [Op.in]: filter.attribute } },
          { couleur: { [Op.in]: filter.attribute } },
        ];
      }

      if (filter.categories && filter.categories.length > 0) {
        includeClause.push({
          model: Categorie,
          where: { nom: { [Op.in]: filter.categories } },
          required: true,
        });
      } else {
        // Inclure les catégories sans filtre si besoin
        includeClause.push({ model: Categorie, required: false });
      }

      data = await Article.findAll({
        offset: offset,
        limit: 15,
        where: whereClause,
        include: includeClause,
      });
    } else {
      data = await Article.findAll({
        offset: offset,
        limit: 15,
        include: [
          {
            model: Image,
            required: true,
          },
        ],
      });
    }

    return data;
  },

  async getArticleOnFeatured(offset: number) {
    const data = await Article.findAll({
      where: {
        featured: 1,
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

  async getArticleOnTrend(offset: number) {
    const data = await Article.findAll({
      where: {
        inTrend: 1,
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

  async getByCategories(categorieID: number) {
    const data = await Article.findAll({
      where: { idCategorie: categorieID },

      include: [
        {
          model: Image,
          required: true,
        },
      ],
    });

    return data;
  },

  async updateCategories(articleID: number, new_categorieId: number) {
    const queryResp = await Article.update(
      { idCategorie: new_categorieId },
      {
        where: {
          idArticle: articleID,
        },

        returning: true,
      }
    );

    return queryResp;
  },

  async getTopArticleSeller(limit: number) {
    const topArticles = await sequelize.query(
      `
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
                `,
      {
        type: QueryTypes.SELECT,
        model: Article,
        mapToModel: true,
      }
    );

    return topArticles;
  },

  async countArticle() {
    const count = await Article.count();
    return count;
  },

  async updateMultipleArticlesQty(
    articles: { idArticle: number; qty: number }[],
    dbArticles: Article[]
  ) {
    const transaction = await sequelize.transaction();

    try {
      // Mettre à jour les quantités
      for (const { idArticle, qty } of articles) {
        const article = dbArticles.find((a) => a.idArticle === idArticle);
        if (article) {
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
  async getAllArticles(options: {
    offset?: number;
    attribute?: string | string[];
    idCategorie?: string | string[];
    isUniqueFilter?: boolean;
  }) {
    try {
      const offset = options.offset || 0;

      // Gestion des filtres
      const attributesFilter =
        typeof options.attribute === "string"
          ? options.attribute.split(",")
          : Array.isArray(options.attribute)
          ? options.attribute
          : undefined;

      const categories =
        typeof options.idCategorie === "string"
          ? options.idCategorie.split(",")
          : Array.isArray(options.idCategorie)
          ? options.idCategorie
          : undefined;

      let data: any;
      let total: number | undefined;

      // Application des filtres si présents
      if (attributesFilter || categories) {
        const filter = {
          attribute: attributesFilter,
          categories: categories,
        };

        if (options.isUniqueFilter) {
          // Filtre sur les sous-catégories
          const sousCategorieIDs = await SousCategorie.findAll({
            where: { nom: categories },
            attributes: ["idSousCategorie"],
          });

          if (sousCategorieIDs.length === 0) {
            return { data: [], total: 0 };
          }

          const idCategorie = sousCategorieIDs[0].idSousCategorie;
          data = await GestionArticle.getBySubCategorie(
            offset,
            idCategorie,
            filter
          );
        } else {
          data = await GestionArticle.getAll(offset, filter);
        }
      } else {
        data = await GestionArticle.getAll(offset);
      }

      // Calcul du total si nécessaire
      if (data.length > 0 && offset === 0) {
        total = await GestionArticle.countArticle();
      }

      return {
        data: data.length > 0 ? data : [],
        total: total || data.length,
      };
    } catch (error) {
      console.error("Error in getAllArticles:", error);
      return { data: [], total: 0 };
    }
  },
  async getCategoriesAndSub() {
    try {
      const result = await Categorie.findAll({
        include: [{ model: SousCategorie }],
      });
      if (result[0] === null) {
        return;
      }
      return {
        data: result,
        isDone: true,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
  async getAllDefaultArticles() {
    return this.getAllArticles({ offset: 0 });
  },
};

export { GestionArticle };
