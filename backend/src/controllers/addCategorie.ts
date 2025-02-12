import { Request, Response } from "express";
import Categorie from "../models/categorie";

const addCategorie = async(req:Request,res:Response) =>{
      try{
        const data = req.body;
          await Categorie.create({
            'idUser':data.idUser,
            'nom':data.nom
          });
        return  res.status(201).json({
            'create':true,
            'message':'nouvelle categorie ajoute'
          })
      }catch(error){
        console.log(error);
        return res.status(500).json({
            'create':false,
            'message':'echec de la creation'
        })
      }
}

export default addCategorie;