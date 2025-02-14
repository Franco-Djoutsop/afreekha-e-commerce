import { Request,Response } from "express";
import Categorie from "../models/categorie";

//@route /categorie/deleteCategorie
//@method delete
//@response true ? false

//suppression d'une categorie

const deleteCategorie = async(req:Request,res:Response) =>{
    try{
         let id = req.params.id;
         const deleteC = await Categorie.findByPk(id);
         if(!deleteC){
            return res.status(404).json({
                'delete':false,
                'message':'aucune categorie trouve',
            });
         }
            await Categorie.destroy({
                where:{
                    idCategorie:id
                }
            })
            return res.status(200).json({
                'delete':true
            });
            
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            'delete': false,
            'message':'erreur sur le serveur'
        })
    }
}
export default deleteCategorie;