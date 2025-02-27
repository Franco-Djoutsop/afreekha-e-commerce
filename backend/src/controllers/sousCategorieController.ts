import Image from "../models/image";
import Article from "../models/Article";
import { Request,Response } from "express";
import { crypt } from "../config/crypto-js";
import Categorie from "../models/categorie";
import SousCategorie from "../models/SousCategorie";

const gest_sous_categorie = {

//@route/api/admin/sousCategorie
//@mathod post
//@data = objet, response true ? false

//creation d'une sous categorie
 async addsousCategorie(req:Request,res:Response){
    try{
        const data = req.body;

        if(data != null){
            await SousCategorie.create({
                'idCategorie':data.idCategorie,
                'nom':data.nom
            });
            return res.status(201).json({
                'isCreate':true,
                'message':'sous categorie cree avec success'
            })

        }
        return res.status(404).json({message:'veillez fournir les donnees'})
       

    }catch(error){
        console.log(error);
       return res.status(500).json({'message':'erreur du serveur'});
    }
},

//@route /api/admin/sousCategorie
//@method put
//@response true ? false

//mise a jour des information des sous categorie
async updateSousCategorie (req:Request,res:Response){
    try{
        let id = req.params.id;
        const data = req.body;
        const checkid = await SousCategorie.findByPk(id);
        if(!checkid){
            return res.status(404).json({'message':'echec de le modification','update':false});
        }
        await SousCategorie.update({'nom':data.nom},
            { 
            where:{
                idSousCategorie:id
           }});

    }catch(error){
        console.log(error);
        return res.status(500).json({'messade':'erreur sur le server'});
    }
},

//@route /api/admin/sousCategorie
//@method delete
//@response true ? false

//suppression d'une sous-categorie

async deleteSousCategorie (req:Request,res:Response){
    try{
        let id = req.params.id;
        const checkid = await SousCategorie.findByPk(id);
        if(!checkid){
            return res.status(404).json({'message':'suppression impossible','delte':false});
        }
        await SousCategorie.destroy({
            where:{
                idSousCategorie:id
            }
        });
        return res.status(200).json({'delete':true,'message':'suppression reussi'});
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'delete':false,
            'message':'erreur sur le serveur'
        });
    }
},

//@route/api/articleOfSousCategorie
//@mathod get
//@id of a categorie
//@response true data:result? false data = []; result = objet

//liste des articles de chaque sous categorie des categories;

async articleOfSousCategorie(req:Request,res:Response){
    try{
        let id = req.params.id;
        const result = await Article.findAll({
           attributes:['nom_article','prix','quantite','promo','caracteristiques','pourcentage_promo','marque','garantie'],
              include:[{
                model:Image,
                attributes:['lien'],
              },{
                model:Categorie,
              attributes:['nom'],
                 include:[
                   {
                       model:SousCategorie,
                       attributes:['nom']
                   }
               ]
            }],
           where:{idCategorie:id}
        });

        if(result[0]== null){
          return  res.status(404).json({'message':'aucun article trouve','data':[]});
        }
        return res.status(200).json({'data':crypt.encode(result),'isDone':true});

    }catch(error){
        console.log(error);
        return res.status(500).json({"message":"erreur du server"});
    }
    
},

//@route /api/categorieAndSousCategorie
//@method get
//@response true ? false

//liste des sous categorie et categorie
async categorieAndSousCategorie(req:Request,res:Response){
    try{
       let id = req.params.id;
       const result = await SousCategorie.findAll({
          attributes:['nom'],
            include:[{
            model:Categorie,
            attributes:['nom'],
          }], 
        where:{
            idCategorie:id
        }
       });

       if (result[0] ==null) {
            return res.status(404).json({message:'aucune sous categire tourve pour cette categorie'});
       }
       return res.status(200).json({data:crypt.encode(result),isDone:true});
    }catch(error){
        console.log(error);
        return res.status(500).json({'messge':'erreur de server'});
    }
},

//@route /api/allSousCategorie
//@method get
//@response true ? false

//liste des toutes les sous categorie
async allSousCategorie (req:Request,res:Response){
    try{
        const result = await SousCategorie.findAll({
            attributes:['nom']
        });

        if(result[0] == null){
            return res.status(404).json({'message':'aucune sous categorie trouve','data':[]});
        }
        
        return res.status(200).json({'data':crypt.encode(result),'getAll':true});
    }catch(error){
        console.log(error);
       return res.status(500).json({'message':'erreur sur le server'});
    }
}

}
export default gest_sous_categorie;
