import Image from "../models/image";
import Article from "../models/Article";
import { Request,Response } from "express";
import Categorie from "../models/categorie";
import { crypt } from "../config/crypto-js";
import SousCategorie from "../models/SousCategorie"; 


const gest_categorie = {
//@route/api/admin/categorie
//@mathod post
//@response true ? false

//creation d'une categorie
   async addCategorie(req:Request, res:any){
    try{
      const data = req.body;
      console.log(data);
      //const dataDecode = crypt.decode(req,res,data)
     // console.log(dataDecode);
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
       
    }catch(error: any){
      console.log(error);
      return res.status(500).json({
          'create':false,
          'message':'echec de la creation',
          error:error.message
      })
    }
},

//@route /api/admin/categorie/
//@method put
//@response true ? false

//mise a jour des information des  categorie
async updateCategorie(req:Request,res:any){
    try{
        let id = req.params.id;
        const data = req.body;
        const updateData = await Categorie.findByPk(id);
        if(!updateData){
            return res.status(404).json({
                'message':'aucun utilisateur trouve'
            });
        }
        await Categorie.update({ nom:data.nom},
        {
            where:
            {
                idCategorie:id

            }});
             return res.status(200).json({
            'update':true,
            'message':'mise a jour reussi'
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'message':'erreur sur le serveur'
        });
    }
},

//@route /api/admin/categorie
//@method delete
//@response true ? false

//suppression d'une categorie
async deleteCategorie(req:Request,res:any){
    try{
         let id = req.params.id;
         const deleteC = await Categorie.findByPk(id);
         if(!deleteC){
            return res.status(404).json({
                'delete':false,
                'message':'aucune categorie trouve',
            });
         }
            await Categorie.destroy({
                where:{
                    idCategorie:id
                }
            })
            return res.status(200).json({
                'delete':true
            });
            
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            'delete': false,
            'message':'erreur sur le serveur'
        })
    }
},

//@route/api/articleOfCategorie/:id
//@mathod get
//@id of a categorie
//@response true data:result ? false data = []; result = objet

//liste des articles de chaque des categories;

async ArticleOfCategorie(req:Request,res:any){
    try{
        let id = req.params.id;
        const result = await Article.findAll({
          where:{
            idCategorie:id
         },
               attributes:['idArticle','nom_article','prix','quantite','caracteristiques','marque','garantie','promo','pourcentage_promo'],
                 include:[
                   {
                  model:Categorie, 
                  attributes:['idCategorie','nom']}, 
                  {
                  model:Image,
                  attributes:['idImage','lien'],
               },   
             ],
        });

        if(result[0]==null){
            return res.status(404).json({'message':'aucun article trouve','data':[]})
        }

        return res.status(200).json({'data':crypt.encode(result),'isDone':true});
    }catch(error){
        console.log(error);
        return res.status(500).json({'message':'erreur du serveur'});
    }
},

//@route /api/AllCategorie
//@method get
//@response true ? false

//liste des categorie
 async getCategorie(req:Request,res:any){
    try{
        const allCategorie = await Categorie.findAll({
            attributes:['nom']
        });
        
        if(allCategorie[0]== null){
            return res.status(200).json({
                data:[],
                messages:'aucune categorie pour le moment'
            });
        }
        return res.status(200).json({data:crypt.encode(allCategorie)});

    }catch(error){
        console.log(error);
        res.status(500).json({
            'message': 'erreur du serveur'
        })
    }
},

//@route /api/sousCategorieOfCategorie/:id
//@method get
//@response true ? false

//liste des sous categorie de chaqur categorie
async sousCategorie(req:Request,res:any){
    try{
         let id = req.params.id;
         const result = await SousCategorie.findAll({
            where:{
                idCategorie:id
            },
               include:[
                  {
                    model:Categorie, attributes:['idCategorie','nom']
                  }
               ],
               
           attributes:['idSousCategorie','nom']
         });

         if(result == null){
            return res.status(404).json({
                'message':'cette categorie na pas de sous categorie ','data':[]})
         }
         return res.status(200).json({
            'isHere':true,
            'data': result
         })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'message':'erreur sur le serveur'
        });
    }
}
}
export default gest_categorie;