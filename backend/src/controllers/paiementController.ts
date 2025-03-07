import User from "../models/User";
import Paiement from "../models/Paiment";
import { crypt } from "../config/crypto-js";
import { Request, Response } from "express";



const gest_paiement = {

//@route/api/paiement
//@mathod post
//@data = objet, response true ? false

//enregistrement d'un paiement

async addPaiement(req:Request,res:any){
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
},

//@route/api/admin/allpaiement
//@mathod get
//@response true data:allPaiement? false data = []; allPaiement = objet

//liste des paiements;
async showpaiement(req:Request,res:any){
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
            'data': crypt.encode(allPaiement)
         });
    }catch(error){
         console.log(error);
         res.status(500).json({
            'isDone': false,
            'message': 'erreur sur le serveur'
         }) 
   };
    
},

//@route /api/admin/detail-paiement/:id
//@method get
//@response true ? false

//liste des paiement d'un utilisateur
async showDetailUserPaiement (req:Request,res:any){
    try{
        let id = req.params.id;
        
        const informationUser = await Paiement.findAll({
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
        });
        
    }catch(error){
        console.log(error);
       return res.status(500).json({
            'isDone': false,
            'message': 'erreur sur le serveur'
        })
    }
}
}
export default gest_paiement;