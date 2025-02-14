import { Request, Response } from "express";
import Paiement from "../models/Paiment";

//@route/paiement/addPaiement
//@mathod post
//@data = objet, response true ? false

//enregistrement d'un paiement

const addPaiement = async(req:Request,res:Response) =>{
    try{
        const data = req.body;
        
        if(data != null){
          await Paiement.create({
            'idUser':data.idUser,
            'montant': data.montant,
            'methodePaiement':data.methodePaiement
        });
        return res.status(201).json({
            'payer':true,
            'message':'paiement effectue avec success!'
        })
        }
        return res.status(404).json({message:'veillez fournir les informations'})

    }catch(error){
      console.log(error);
      res.status(500).json({
        'payer':false,
        'message': 'echec du paiement'
      });
    }
}
export default addPaiement;