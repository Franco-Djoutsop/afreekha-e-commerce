import { Request, Response } from "express";
import Categorie from "../models/categorie";
import { crypt } from "../config/crypto-js";


//@route/categorie/addArticle
//@mathod post
//@data = objet, response true ? false

//creation d'une categorie
const addCategorie = async(req:Request,res:Response) =>{
      try{
        const data = req.body;
        //const decodeData  = crypt.encode(req,res,data);
        if(data != null)
        {
          await Categorie.create({
            'idUser':data.idUser,
            'nom':data.nom
          });
        return  res.status(201).json({
            'create':true,
            'message':'nouvelle categorie ajoute'
          });
        }
        return res.status(404).json({messages:'veilez fournir les donnees'});
         
      }catch(error){
        console.log(error);
        return res.status(500).json({
            'create':false,
            'message':'echec de la creation'
        })
      }
}

export default addCategorie;