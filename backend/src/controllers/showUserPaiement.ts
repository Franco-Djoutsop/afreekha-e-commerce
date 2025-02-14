import { Request, Response } from "express";
import paiement from "../models/Paiment";
import User from "../models/User";
import { crypt } from "../config/crypto-js";

//@route /paiement/paimentUser
//@method get
//@response true ? false

//liste des paiment d'un utilisateur
const showDetailUserPaiement = async(req:Request,res:Response) =>{
    try{
        let id = req.params.id;
        
        const informationUser = await paiement.findAll({
            where:
            {
                idUser:id,
            },
               include: [
                {
                   model:User,
                   attributes:['nom','prenom','tel']
                }
              ],
            attributes:['montant','methodePaiement','date']
        });

        if(informationUser[0]== null){
           return res.status(404).json({
              'trouve':false,
              'message': 'aucun paiement disponible pour ce client'
            });
        }
        
        return res.status(200).json({
              'trouve':true,
              'data': crypt.encode(informationUser)
        })
        
    }catch(error){
        console.log(error);
       return res.status(500).json({
            'isDone': false,
            'message': 'erreur sur le serveur'
        })
    }
}
export default showDetailUserPaiement;