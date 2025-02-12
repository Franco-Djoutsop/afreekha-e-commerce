import { Request,Response } from "express";
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";
import messages from "../models/Message";


const categorieAndSousCategorie = async(req:Request,res:Response) =>{
    try{
       let id = req.params.id;
       const result = await SousCategorie.findAll({
        attributes:['nom'],
        include:[{
            model:Categorie,
            attributes:['nom'],
        }], where:{
            idCategorie:id
        }
       });
       if (result[0] ==null) {
            return res.status(404).json({message:'aucune sous categire tourve pour cette categorie'});
       }
       return res.status(200).json({data:result,isDone:true});
    }catch(error){
        console.log(error);
        return res.status(500).json({'messge':'erreur de server'});
    }
}
export default categorieAndSousCategorie;