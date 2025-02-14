import { Request,Response } from "express";
import SousCategorie from "../models/SousCategorie";

//@route/sousCategorie/addSousCategorie
//@mathod post
//@data = objet, response true ? false

//creation d'une sous categorie
const addsousCategorie = async(req:Request,res:Response) =>{
    try{
        const data = req.body;

        if(data != null){
            await SousCategorie.create({
                'idCategorie':data.idCategorie,
                'nom':data.nom
            });
            return res.status(201).json({
                'isCreate':true,
                'message':'sous categorie cree avec success'
            })

        }
        return res.status(404).json({message:'veillez fournir les donnees'})
       

    }catch(error){
        console.log(error);
       return res.status(500).json({'message':'erreur du serveur'});
    }
}
export default addsousCategorie;