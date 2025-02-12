import Article from "../models/Article"
import { Articles } from "./objets/article";

const GestionArticle ={

     async save(artilce: Articles){
           const dataRetrieves = await Article.create(artilce);
            
           return dataRetrieves;
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
                }
            });
            
            return dataRetrieve;
        },

        async getAll(offset: number){
           
        },

        async getByCategories(categorieID: number){
            const data = await Article.findAll({
                where:{
                    idCategorie: categorieID
                }
            });

            return data;
        },

        async updateCategories(articleID: number ){
            
        }
};

export { GestionArticle };

