import { Request, Response } from "express";
import Paiement from "../models/Paiment";

const addPaiement = async(req:Request,res:Response) =>{
    try{
        const data = req.body;

        await Paiement.create({
            'idUser':data.idUser,
            'montant': data.montant,
            'methodePaiement':data.methodePaiement
        });
        return res.status(201).json({
            'payer':true,
            'message':'paiement effectue avec success!'
        })

    }catch(error){
      console.log(error);
      res.status(500).json({
        'payer':false,
        'message': 'echec du paiement'
      });
    }
}
export default addPaiement;