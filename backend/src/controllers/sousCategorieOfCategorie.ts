import { Request,Response } from "express";
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";

const sousCategorie = async(req:Request,res:Response) =>{
    try{
         let id = req.params.id;
         const schearCategorie = await SousCategorie.findAll({
            where:{
                idCategorie:id
            },/*
            include:[
                {
                    model:Categorie, attributes:['nom']
                }
            ],*/
           attributes:['nom']
         });
         if(schearCategorie[0]==null){
            return res.status(404).json({
                'message':'cette categorie na pas de sous categorie ','data':[]})
         }
         return res.status(200).json({
            'isHere':true,
            'data': schearCategorie
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'message':'erreur sur le serveur'
        });
    }
}
export default sousCategorie;