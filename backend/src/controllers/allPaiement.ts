import { Request, Response } from "express";
import Paiement from "../models/Paiment";

const showpaiement = async(req:Request,res:Response) =>{
    try{
        const allPaiement = await Paiement.findAll({
            attributes:['montant','methodePaiement','date']
         });
         if(allPaiement[0]==null)
         {
            res.status(400).json({
                'data':[],
                'message':'aucun paiement trouve'
            });
         }
         return res.status(202).json({
            'data': allPaiement
         });
    }catch(error){
         console.log(error);
         res.status(500).json({
            'isDone': false,
            'message': 'erreur sur le serveur'
         }) 
   };
    
}
export default showpaiement;