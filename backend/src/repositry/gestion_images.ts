import Image from "../models/image";
import { MoveImg, DeleteImg } from "../config/img_file";
import dotenv from 'dotenv';
import { Op } from "sequelize";
import ArticleImage from "../models/ArticleImage";
import Article from "../models/Article";
import {sequelize} from "../config/database"; // Adjust the path as necessary


dotenv.config();

const GestionImage = {  
//<<<<<<< HEAD
//<<<<<<< HEAD
   // async createImg(base64: string, dossier: string, contentType: string){
//=======
  //  async createImg(base64: string, idArticle: number, dossier: string, contentType: string, featured: boolean){
//>>>>>>> vf0/vf0
//=======
    async createImg(base64: string, dossier: string, contentType: string, featured: boolean){
//>>>>>>> vf0/vf0
            const result = await this.execCreationImg(base64, dossier, contentType);
            
            if(result.creationDone){
                //const img = await Image.cr
                
                const queryRslt = await Image.create({
//<<<<<<< HEAD
                   // lien: url,
//<<<<<<< HEAD
//=======
                    //featured: featured,
                    //idArticle: idArticle
//>>>>>>> vf0/vf0
//=======
                    lien: result.link,
                    featured: featured
//>>>>>>> vf0/vf0
                });

                return queryRslt;
            }
            
            return "";
    },

    async destroy(id: number){
        const getImage = await Image.findByPk(id);
        if(getImage){

            const resp = await Image.destroy({
                where: {
                    idImage : id
                }
            });
            if(resp){
                if(await DeleteImg(getImage.lien)){
                    return resp;
                }
            }
            return null;
        }
      return null;  
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

    async update(base64: string, idArticle: number, idImage: number, dossier: string, contentType: string,featured: boolean, old_link?: string){
            let old_linkDeleted = false;

            if(old_link){
                //ancien lien de l'image à remplacer defini, alors supprimé son image dans le repertoire sur le serveur
               const del_result= await DeleteImg(old_link);
                if(del_result){
                    old_linkDeleted =true;                 
                }
            }

            const creationResult = await this.execCreationImg(base64, dossier, contentType);


            if(creationResult.creationDone){
                const url = ""+process.env.HTTPS+process.env.DB_HOST+process.env.PORT+creationResult.link;
                const queryRslt = await Image.update(
                    {lien : url, featured: featured},
                    {
                        where:{
                            idImage: idImage
                        }
                    }
                   
                );

                return queryRslt;
            }

            return "";
    },

    async getOne(id: number){
        const dataRetrieve = await Image.findAll({
            where: {
                idImage : id
            }
        });
        return dataRetrieve;
     },

     async getAll(){
        return await Image.findAll();
     },

    async getFeatured(){
        const data = await Image.findAll({
            attributes: ['idImage', 'lien'],
            limit: 8,
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