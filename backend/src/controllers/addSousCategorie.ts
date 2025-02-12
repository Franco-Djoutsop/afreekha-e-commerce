import { Request,Response } from "express";
import SousCategorie from "../models/SousCategorie";

const addsousCategorie = async(req:Request,res:Response) =>{
    try{
        const data = req.body;
        await SousCategorie.create({
            'idCategorie':data.idCategorie,
            'nom':data.nom
        });
        return res.status(201).json({
            'isCreate':true,
            'message':'sous categorie cree avec success'
        })

    }catch(error){
        console.log(error);
       return res.status(500).json({'message':'erreur du serveur'});
    }
}
export default addsousCategorie;