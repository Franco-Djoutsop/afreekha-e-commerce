import { Request,Response } from "express";
import Categorie from "../models/categorie";
import { crypt } from "../config/crypto-js";

//@route /categorie/getAllCategorie
//@method get
//@response true ? false

//liste d'une categorie

const getCategorie = async(req:Request,res:Response) =>{
    try{
        const allCategorie = await Categorie.findAll({
            attributes:['nom']
        });
        
        if(allCategorie[0]== null){
            return res.status(200).json({
                data:[],
                messages:'aucune categorie pour le moment'
            });
        }
        return res.status(200).json({data:crypt.encode(allCategorie)});

    }catch(error){
        console.log(error);
        res.status(500).json({
            'message': 'erreur du serveur'
        })
    }
}
export default getCategorie;