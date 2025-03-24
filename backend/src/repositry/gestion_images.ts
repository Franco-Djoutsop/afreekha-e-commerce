import Image from "../models/image";
import { MoveImg, DeleteImg } from "../config/img_file";
import dotenv from 'dotenv';
import { Op } from "sequelize";

dotenv.config();

const GestionImage = {  
    async createImg(base64: string, idArticle: number, dossier: string, contentType: string){
            const result = await this.execCreationImg(base64, dossier, contentType);
            
            if(result.creationDone){
                //const img = await Image.cr
                const url = ""+process.env.HTTPS+process.env.DB_HOST+process.env.HTPP+result.link;
                const queryRslt = await Image.create({
                    lien: url,
                    idArticle: idArticle
                });

                return queryRslt;
            }
            
            return "";
    },

    async destroy(id: number){
        const resp = await Image.destroy({
            where: {
                idImage : id
            }
        });
        return resp;
    },

    async articleImageAssigment($idArticle: number, $idImage: number){
        const resp = await Image.update(
            {idArticle: $idArticle},
            {
                where: {
                    idImage: $idImage
                }
            }
        );

        return resp

    },

    async update(base64: string, idArticle: number, idImage: number, dossier: string, contentType: string, old_link?: string){
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
                const url = ""+process.env.HTTPS+process.env.DB_HOST+process.env.HTPP+creationResult.link;
                const queryRslt = await Image.update(
                    {lien : url},
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

    async getFeatured(){
        const data = await Image.findAll({
            attributes: ['id', 'lien'],
            limit: 8,
            where: {
                featured: true,
                idCategory: {
                    [Op.not]: null
                }
            }
        });

        return data;

    },

   async execCreationImg(base64: string, dossier: string, contentType: string): Promise<any>{
      return await MoveImg({data: base64, contentType: contentType}, dossier).then((lien) => {
            console.log('lien pour la base de donnée', lien);
            return {creationDone: true, link: lien};
        }).catch((error: any)=>{
            return {creationDone: false, error: error.message}
        });
    }
}

export {GestionImage}