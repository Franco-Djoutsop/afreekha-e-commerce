import { Request,Response } from "express";
import Image from "../models/image";
import Article from "../models/Article";
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";

const articleOfSousCategorie = async(req:Request,res:Response) =>{
    try{
        let id = req.params.id;
        const result = await Article.findAll({
           attributes:['nom_article','prix','quantite','promo','caracteristiques','pourcentage_promo','marque','garantie'],
           include:[{
            model:Image,
            attributes:['lien'],
           },{
            model:Categorie,
            attributes:['nom'],
            include:[
                {
                    model:SousCategorie,
                    attributes:['nom']
                   }
            ]
           }],where:{idCategorie:id}
        });

        if(result[0]== null){
          return  res.status(404).json({'message':'aucun article trouve','data':[]});
        }
        return res.status(200).json({'data':result,'isDone':true});

    }catch(error){
        console.log(error);
        return res.status(500).json({"message":"erreur du server"});
    }
    
}
export default articleOfSousCategorie;