import { Request,Response } from "express";
import Image from "../models/image";
import Article from "../models/Article";
import Categorie from "../models/categorie";

const ArticleOfCategorie = async(req:Request,res:Response) =>{
    try{
        let id = req.params.id;
        const showarticleOfCategorie = await Article.findAll({
            where:{
                idCategorie:id
            },
            attributes:['nom_article','prix','quantite','caracteristiques','marque','garantie','promo','pourcentage_promo'],
            include:[
            {model:Categorie, attributes:['nom']},
            {
                model:Image,
                attributes:['lien'],
            },   
        ],
        });

        if(showarticleOfCategorie[0]==null){
            return res.status(404).json({'message':'aucun article trouve','data':[]})
        }

        return res.status(200).json({'data':showarticleOfCategorie,'isDone':true});
    }catch(error){
        console.log(error);
        return res.status(500).json({'message':'erreur du serveur'});
    }
}
export default ArticleOfCategorie;