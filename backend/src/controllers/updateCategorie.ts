import { Request,Response } from "express";
import Categorie from "../models/categorie";


const updateCategorie = async(req:Request,res:Response) =>{
    try{
        let id = req.params.id;
        const data = req.body;
        const updateData = await Categorie.findByPk(id);
        if(!updateData){
            return res.status(404).json({
                'message':'aucun utilisateur trouve'
            });
        }
        await Categorie.update({ nom:data.nom},
        {
            where:
            {
                idCategorie:id

            }});
             return res.status(200).json({
            'update':true,
            'message':'mise a jour reussi'
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'message':'erreur sur le serveur'
        });
    }
}
export default updateCategorie;