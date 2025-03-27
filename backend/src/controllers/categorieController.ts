import Image from "../models/image";
import Article from "../models/Article";
import { Request, Response } from "express";
import Categorie from "../models/categorie";
import { crypt } from "../config/crypto-js";
import SousCategorie from "../models/SousCategorie";
import { MoveImg } from "../config/img_file";
import dotenv from "dotenv"
dotenv.config()
const gest_categorie = {
  //@route/api/admin/categorie
  //@mathod post
  //@response true ? false

  //creation d'une categorie
  async log(base64:string,contentType:string,featured:boolean){
      const dossier = process.env.IMG_URL as string;
      const result = await this.LogoUrl(base64,contentType,dossier);
      if(result.create == true){
        return result.link;
      }
      return '';
  },
  async addCategorie(req: Request, res: any) {
    try {
      const data = req.body;
      const{base64,contentType,featured} = req.body;
      const result = await gest_categorie.log(base64,contentType,featured);
      const exitOrnotExist = await Categorie.findOne({
        where:{nom:data.nom}
      });
      if(exitOrnotExist){
          return res.status(400).json({'message':'cette categorie exite deja'})
      }else{
      if (data && result) {
        const categorie = await Categorie.create({
          idUser: data.idUser,
          nom: data.nom,
          urlLogo: result
        });
        return res.status(201).json({
          create: true,
          message: "nouvelle categorie ajoute",
          reps: crypt.encode(categorie),
        });
      }
    } 
      return res.status(404).json({ message: "veilez fournir les donnees" });
    } catch (error: any) {
      console.log(error);
      return res.status(500).json({
        create: false,
        message: "echec de la creation",
        error: error.message,
      });
    }
  },

  //@route /api/admin/categorie/
  //@method put
  //@response true ? false

  //mise a jour des information des  categorie
  async updateCategorie(req: Request, res: any) {
    try {
      let id = req.params.id;
      const data = req.body;
      const {base64,contentType,featured} = req.body;
      const result = await gest_categorie.log(base64,contentType,featured);
      console.log('le result',result);
      const updateData = await Categorie.findByPk(id);
      if (!updateData && !result && !id) {
        return res.status(404).json({
          message: "aucun utilisateur trouve",
        });
      }
      await Categorie.update(
        { idUser:data.idUser,nom: data.nom,urlLogo:result },
        {
//<<<<<<< HEAD
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
                  attributes:['idCategorie','nom','urlLogo']}, 
                  {
                  model:Image,
                  attributes:['idImage','lien'],
               },   
             ],
        });

        if(result[0]==null){
            return res.status(404).json({'message':'aucun article trouve','data':[]})
//=======
//>>>>>>> vf1/vf1
        }
      return res.status(200).json({
        update: true,
        message: "mise a jour reussi",
        //data: updateData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erreur sur le serveur",
      });
    }
  },



  //@route/api/articleOfCategorie/:id
  //@mathod get
  //@id of a categorie
  //@response true data:result ? false data = []; result = objet

//<<<<<<< HEAD
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
                    model:Categorie, attributes:['idCategorie','nom','urlLogo']
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
            'message':'erreur sur le serveur'})}
        },

  //@route /api/AllCategorie
  //@method get
  //@response true ? false

  //liste des categorie
  async getCategorie(req: Request, res: any) {
    try {
      const allCategorie = await Categorie.findAll({
        attributes: ['idCategorie',"nom",'urlLogo'],
      });

      if (allCategorie[0] == null) {
        return res.status(200).json({
          data: [],
          messages: "aucune categorie pour le moment",
//>>>>>>> vf1/vf1
        });
      }
      return res.status(200).json({
        // data: crypt.encode(allCategorie)
        data: allCategorie,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "erreur du serveur",
      });
    }
  },

  //methode pour gerer urlLogo
  async LogoUrl(base64:string,contentType:string,dossier:string):Promise<any>
  {
    return MoveImg({data:base64,contentType:contentType},dossier).then((lien)=>{
      return {create:true,link:lien}
    }).catch((error)=>{
      return {erreur:error.message,create:false}
    })
  }

};
export default gest_categorie;
