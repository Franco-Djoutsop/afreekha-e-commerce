import Article from "../models/Article";
import { Articles } from "./objets/article";
import Image from "../models/image";

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
};

export { GestionArticle };
