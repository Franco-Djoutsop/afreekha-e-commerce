import Image from "../models/image";
import { MoveImg, DeleteImg } from "../config/img_file";
import dotenv from 'dotenv';
import { Op } from "sequelize";
import ArticleImage from "../models/ArticleImage";
import Article from "../models/Article";
import {sequelize} from "../config/database"; // Adjust the path as necessary


dotenv.config();

const GestionImage = {  

    async createImg(base64: string, dossier: string, contentType: string, featured: boolean, collection : string, position: string){

            const result = await this.execCreationImg(base64, dossier, contentType);
            if(position && position == "MAIN_BANNER"){
                await Image.update({

                    position: null,

                }, {where:
                     {position: "MAIN_BANNER"}
                    }
                );
                //car il ne peut avoir qu'une seul banner principale dans le main
            }
            if(result.creationDone){
                
                const queryRslt = await Image.create({

                    collection: collection ? collection: null,
                    position: position ? position:null,
                    lien: result.link,
                    featured: featured
                });

                return queryRslt;
            }
            
            return "";
    },

    async destroyMultiple(ids: number[]) {
        // Récupérer toutes les images correspondant aux IDs
        const images = await Image.findAll({
            where: {
                idImage: ids,
            },
        });
    
        if (images.length === 0) {
            throw new Error("Aucune image trouvée pour les IDs fournis.");
        }
    
        // Supprimer les fichiers associés aux images
        for (const image of images) {
            await DeleteImg(image.lien); // Supprime physiquement l'image
        }
    
        // Supprimer les enregistrements dans la base de données
        const resp = await Image.destroy({
            where: {
                idImage: ids,
            },
        });
    
        return {
            deletedCount: resp,
            deletedImages: images,
        };
    },

    async destroyOne(id: number){
        const resp = await Image.destroy({
            where: {idImage: id}
        });
        return resp;
    },
    async updateImageAssigment(idArticle: number, idImage: number[]){
        const transaction = await sequelize.transaction(); // Gérer la transaction

        const article = await Article.findByPk(idArticle);
        if (!article) {
            throw new Error('Article introuvable');
        }
    
        // Vérifier si les images existent
        const images = await Image.findAll({
          where: { idImage: idImage }, 
        });
    
        if (images.length !== idImage.length) {
          throw new Error("Une ou plusieurs images sont introuvables");
        }
        
        // Supprimer les associations existantes pour l'article
        await ArticleImage.destroy({
            where: { idArticle: idArticle },
            transaction,
        });

        // Créer de nouvelles associations
        const articleImagesData = idImage.map((imageId) => ({
            idArticle: idArticle,
            idImage: imageId,
          }));
    
        const resp = await ArticleImage.bulkCreate(articleImagesData, { transaction });

        await transaction.commit();

        return resp;
    },
    async articleImageAssigment(idArticle: number, idImage: number[]){
        const transaction = await sequelize.transaction(); // Gérer la transaction

        const article = await Article.findByPk(idArticle);
        if (!article) {
            throw new Error('Article introuvable');
        }
    
        // Vérifier si les images existent
        const images = await Image.findAll({
          where: { idImage: idImage }, 
        });
    
        if (images.length !== idImage.length) {
          throw new Error("Une ou plusieurs images sont introuvables");
        }
        
        const articleImagesData = idImage.map((imageId) => ({
            idArticle: idArticle,
            idImage: imageId,
          }));
    
        const resp = await ArticleImage.bulkCreate(articleImagesData, { transaction });

        await transaction.commit();

        return resp;
    },

    async update(collection: string, idImage: number, position: string, featured: boolean){
        // if(position && position == "MAIN_BANNER"){
        //     await Image.update({

        //         position: null,

        //     }, {where:
        //          {position: "MAIN_BANNER"}
        //         }
        //     );
        //     //car il ne peut avoir qu'une seul banner principale dans le main
        // }
                const queryRslt = await Image.update(
                    { featured: featured, position: position, collection: collection},
                    {
                        where:{
                            idImage: idImage
                        }
                    }
                   
                );

                return queryRslt ? queryRslt: "";
    },

    async getOne(id: number){
        const dataRetrieve = await Image.findAll({
            where: {
                idImage : id
            }
        });
        return dataRetrieve;
     },

     async getAll(offset?: number, limit?: number){
        return await Image.findAll({
            offset: offset ? offset : 0,
            limit: limit ? limit : 100,
            order: [
                ['idImage', 'DESC']
            ],
            attributes: ['idImage', 'lien', 'collection', 'position', "featured", "createdAt", "updatedAt"],
        }).then((data) => {
            return data;
        }).catch((error) => {
            return error.message;
        });
     },

     async countImage(){
        const data = await Image.count();
        return data;
     },

    async getFeatured(){
        const data = await Image.findAll({
            attributes: ['idImage', 'lien', 'collection', 'position'],
            limit: 15,
            where: {
                featured: true
            }
        });

        return data;

    },

   async execCreationImg(base64: string, dossier: string, contentType: string): Promise<any>{
      return await MoveImg({data: base64, contentType: contentType}, dossier).then((lien) => {
            
            return {creationDone: true, link: lien};
        }).catch((error: any)=>{
            return {creationDone: false, error: error.message}
        });
    }
}

export {GestionImage}