import { Request, Response } from "express";
import { GestionImage } from "../repositry/gestion_images";
import { crypt } from "../config/crypto-js";
import dotenv from "dotenv"

dotenv.config();

const ImageController = {

    //@route /api/admin/image
    //@method POST
    //@urlbody :true
    async create(req: Request, res: any){
        try {
            if(!req.body.errors){
                const dossier = process.env.IMG_URL as string;
                const {  base64Encryption, contentType} = req.body;

                //const decryptedID = crypt.idOnUrlDecoder(idArticle);

                const resp = await GestionImage.createImg(base64Encryption, dossier, contentType);

                return typeof resp != "string" ?  res.status(200).json([{data: crypt.encode(resp)}]): res.status(200).json([]);
            }else{
                return res.status(400).json([{message: "Informations manquantes pour continuer l'opération !"}])
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    },

    //@route /api/admin/image
    //@method PUT
    //@urlbody :true
    async update(req: Request, res: any){
        //remplacer ou changer l'image deja existante d'un article

        try {
            if(!req.body.errors){
                const {idArticle,base64Encryption, idImage, contentType, old_link} = req.body;
                const dossier = process.env.IMG_URL as string;

                const resp = await GestionImage.update(base64Encryption, crypt.idOnUrlDecoder(idArticle), crypt.idOnUrlDecoder(idImage), dossier, contentType, old_link);
                console.log('controller verif if it work', resp);

                return typeof resp != "string" ?  res.status(200).json([{data: crypt.encode(resp)}]): res.status(200).json([]);
            }else{
                return res.status(400).json([{message: "Informations manquantes pour continuer l'opération !"}]);   
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}])
        }
    },

    //@route /api/admin/image
    //@method DELETE
    //@urlparams :true
    async destroy(req: Request, res: any){
        try {
            if(req.params.id){
                const resp = await GestionImage.destroy(crypt.idOnUrlDecoder(req.params.id));

                const message = resp == 0 ? "Aucune Image supprimée":"Suppréssion éffectuer avec succés !"

                return res.status(200).json([{done: resp != 0, affectedRows: resp, message: message}]);
            
            }else{
                return res.status(400).json([{message: "ID d'article introuvable !"}])
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    }
}

export {ImageController}