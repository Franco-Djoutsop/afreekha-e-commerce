import { Request } from "express";
import { GestionFacture } from "../repositry/gestion_facture";
import { crypt } from "../config/crypto-js";
import { GestionCommande } from "../repositry/gestion_commande";

const FactureController = {
  //@route /api/admin/facture
  //@methode POST
  //urlbody :true
  async create(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        const { idCommande, idArticles, statut } = req.body;

                const resp = await GestionFacture.create({idCommande: idCommande, idArtice: idArticles, statut: statut, date: null});

                return res.status(200).json([{data: crypt.encode(resp)}]);
            }    
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    },

    //@route /api/admin/facture
    //@methode PUT
    //urlbody :true
    async changeStatus(req: Request, res: any){
        try {
            if(!req.body.errors){
                const { status, commandeId } = req.body;

                const resp = await GestionCommande.changeStatus(status, commandeId);
                if(status == "payé"){
                    
                }
                return resp[0] != 0 ? res.status(200).json([{message: "Statut de la facture changé en : " + status}]): res.status(200).json([]);
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    },

    //@route /api/admin/facture
    //@methode GET
    //urlparams :true
    async getFactureWithArticleUser(req: Request, res: any){
        try {
            if(req.params.offset){
                const data = await GestionFacture.getFactureCommandUser(Number.parseInt(req.params.offset));
                
                return data.length != 0 ? res.status(200).json([{data: crypt.encode(data)}]):res.status(200).json([]);
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
    },

    //@route /api/my-facture
    //@methode GET
    //urlparams :true
    async getFactureOfUser(req: Request, res: any){
        try {
            if(req.params.offset && req.params.idUser){
                const data = await GestionFacture.getFactureOfUser(
                    Number.parseInt(req.params.offset),
                    Number.parseInt(req.params.idUser)
                    );

                return data.length != 0 ? res.status(200).json([{data: crypt.encode(data)}]):res.status(200).json([]);
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
        }
  }
};

export { FactureController };
