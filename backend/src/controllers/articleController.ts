import { Request, Response } from "express";
import { GestionArticle } from "../repositry/gestion_articles";
import { crypt } from "../config/crypto-js";
import { Articles } from "../repositry/objets/article";

const ArticleController = {
    async create(req: Request, res: any){
      try{

        
        // Vérification, si des erreurs de validation sont présentes
        if (!req.body.errors) { // Si req.body.errors n'existe pas, alor la validation a réussi
            // Les données sont validées et disponibles dans req.body
            let article: any;
            
             article =  req.body as Articles;
             const resp = await GestionArticle.save(article);
            
           return res.status(200).json({reps: crypt.encode(resp), done: true});
    
        } else {
            // La validation a échoué, les erreurs sont dans req.body.errors
            return res.status(400).json({ message: req.body.errors[0].msg });
        }
        
        
      }catch(err: any){
       return res.status(400).send([{message: err.message}]);
      }
        
    },

    async update(req: Request, res: any){
        try {
            if(!req.body.errors){
                let article :any;

                article = req.body as Articles;
                
                const resp = await GestionArticle.update(article);

                return resp ? res.status(200).json([{isDone: true, data: resp, message:"Mise à jour effectué avec succés"}]): res.status(200).json([]);

            }else{

                return res.status(400).json({ message: req.body.errors[0].msg });
            }
        } catch (error: any) {
             return res.status(400).send([{message: error.message}]);
            
        }
    },

    async destroy(req: Request, res: any){
        try {
            if(req.params.id){
                const id = req.params.id;
                const resp = await GestionArticle.destroy(Number.parseInt(id));
                const message = resp == 0 ? "Aucun article supprimé":"Suppréssion éffectuer avec succés !"

                return res.status(200).json([{done: resp == 0, affectedRows: resp, message: message}]);
            }else{
                return res.status(400).json([{done: false, id: req.params.id, message: "ID indéfini"}]);
            }    
        } catch (error: any) {
            return res.status(400).send([{message: error.message}]);
        }
    },

    async getOne(req: Request, res: any){
        try {

              if(req.params.id){

                const id =  crypt.idOnUrlDecoder(req.params.id);

                const resp = await GestionArticle.getOne(id);

                return resp ? res.status(200).json([{ data : crypt.encode(resp) }]): res.status(200).json([]); 
              
              }else{

                return res.status(400).json([{message: "Id de l'article indefini "}]);
              }

        } catch (error: any) {
            return res.status(400).send([{message: error.message}]);            
        }
    },

    async getByCategorie(req: Request, res: any){
        try {

            if(req.params.id){
                const id = crypt.idOnUrlDecoder(req.params.id);

                const resp = await GestionArticle.getByCategories(id);
            
                return resp.length != 0 ? res.status(200).json([{ data : crypt.encode(resp) }]): res.status(200).json([]); 


            }else{
                return res.status(400).send([{message: "Id de la categorie indefini"}]);            
            }

        } catch (error: any) {

            return res.status(400).send([{message: error.message}]);            
        }
    }

}

export {ArticleController}