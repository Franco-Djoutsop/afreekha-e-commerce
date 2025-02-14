import { Request,Response} from "express";
import allsouscategorie from "../models/SousCategorie";
import { crypt } from "../config/crypto-js";

//@route /souscategorie/allSousCategorie
//@method get
//@response true ? false

//liste des toutes les sous categorie
const allSousCategorie = async(req:Request,res:Response) =>{
    try{
        const result = await allsouscategorie.findAll({
            attributes:['nom']
        });

        if(result[0] == null){
            return res.status(404).json({'message':'aucune sous categorie trouve','data':[]});
        }
        
        return res.status(200).json({'data':crypt.encode(result),'getAll':true});
    }catch(error){
        console.log(error);
       return res.status(500).json({'message':'erreur sur le server'});
    }
}
export default allSousCategorie;