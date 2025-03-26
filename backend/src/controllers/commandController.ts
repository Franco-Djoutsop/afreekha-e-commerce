import { Request } from "express";
import { GestionCommande } from "../repositry/gestion_commande";
import { crypt } from "../config/crypto-js";
import Article from "../models/Article";
import Commande from "../models/Commande";
import { GestionCommandeArticle } from "../repositry/gestion_commandeArticle";
import { GestionArticle } from "../repositry/gestion_articles";

const CommandeController = {

    //@route /api/commande
    //@method POST
    //@bodyparam :true
    async create(req: Request, res: any){
        try {
            if(!req.body.errors){
                
                const data = req.body as  {article: Article[], idUser: number, statut: string};

                let commande_toSave : Commande = new Commande();
                let articlesID: {idArticle: number, qty: number}[] = [];
                let commande_article: {idArticle: number, idCommande: number, quantite: number}[] = [];

                if(data.article.length != 0){
                    let quantite_articles = data.article.length;
                    let total = 0;
                    
                        data.article.forEach((art: Article) => {
                            total += (art.prix * art.quantite);
                        });

                    
                    commande_toSave.Montant_total = total;
                    commande_toSave.quantite_articles = quantite_articles;
                    commande_toSave.idUser = data.idUser;
                    commande_toSave.statut = data.statut;

                    const resp = await GestionCommande.create(commande_toSave.dataValues);
                    if(resp){
                            data.article.forEach((art: Article) => {
                                articlesID.push({idArticle: art.idArticle, qty: art.quantite});
                                commande_article.push({idArticle: art.idArticle, idCommande: resp.idCommande, quantite: art.quantite})
                            });

                        const commandPivotInsertion = await GestionCommandeArticle.create(commande_article as any[]);
                        if(commandPivotInsertion && data.statut == "payé"){
                            for(const item of articlesID){
                                 await GestionArticle.updateArticleQty(item.idArticle, item.qty);
                            }
                        }

                    }
                    return res.status(200).json([{message: "Commande crée !", data: crypt.encode(resp), amountToBuy: total}]);

                } else{
                    throw new Error("Aucun Article présent dans la commande !")
                }               

            }else{
                return res.status(400).json([{message: "Erreurs sur les données de traitement!"}]);
            }
        } catch (error: any) {
            return res.status(400).json([{message: error.message}]);
            
        }
    },
    //@route /api/commande
    //@method DELETE
    //@urlparam :true
    async delete(req: Request, res: any){
        try{
            if(req.params.id){
                const rslt = await GestionCommande.supprimer(crypt.idOnUrlDecoder(req.params.id));

                return rslt!= 0 ? res.status(200).json([{done: true}]): res.status(200).json([]);
            }
        }catch(error:any){
            res.status(400).json([{message: error.message}]);
        }
    },

    //@route /api/commande
    //@method GET
    //@bodyparams :true
    async getCommad(req: Request, res: any){
        try {
            if(req.params.idArticle && req.params.idUser){
                
                const result = await GestionCommande.getCommandOwner(
                    Number.parseInt(req.params.idArticle),
                    Number.parseInt(req.params.idArticle)
                );

                return result.length != 0 ? res.status(200).json([{data: crypt.encode(result)}]):res.status(200).json([]);
                
            }else{
                res.status(400).json([{message: "Informations manquantes"}]);
            }
        } catch (error: any) {
            res.status(400).json([{message: error.message}]);
        }
    }
}

export { CommandeController };
