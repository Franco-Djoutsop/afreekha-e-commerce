import User from "../models/User";
import message from "../models/Message";
import { Request, Response } from "express";
import { crypt } from "../config/crypto-js";

const gest_message = {
  //@route/api/message
  //@mathod post
  //@data = objet, response true ? false

  //envoi d'un message
  async createMessage(req: Request, res: any) {
    try {
      const data = req.body;

      if (data != null) {
        await message.create({
          idUser: data.idUser,
          contenus: data.contenus,
        });
        return res.status(201).json({
          send: true,
          message: "message envoyé avec sucèss!!",
        });
      }
      return res.status(404).json({ message: "veuillez fournir les donnees" });
    } catch (error) {
      return res.status(500).json({
        message: "echec de l'envoi",
        erreur: console.log(error),
      });
    }
  },

  //@route /api/admin/message
  //@method delete
  //@response true ? false

//<<<<<<< HEAD
//@route /api/admin/detail-message
//@method get
//@response true ? false

//liste des message d'un utilisateur

async getMessage(req:Request, res:any){
    try{
        const id = req.params.id;
        const information = await message.findOne(
            {  
                where:
                {
                    idUser:id,       
                },
            
                include:[
                    { 
                        model:User, attributes:['idUser','nom','tel']
                    },
                ],
                attributes:['contenus'],
            }
        )
        
        if(information==null){
            return res.status(404).json({
                'data':[],
                'message':'aucun message trouve pour ce client'
            });
        }
            return res.status(200).json({
                'data': crypt.encode(information)
             })
       
    }catch(error){
       console.log(error);
       return res.status(500).json({
        'message':'erreur du serveur'
       })
    }
},

async getAllMessage(req:Request, res:any){
    try{
        const getMessage = await message.findAll(
            {  
                include:[
                    { 
                        model:User, attributes:['idUser','nom','tel']
                    },
                ],
                attributes:['idMessage','contenus','createdAt'],
            }
        )
        
        // if(getMessage[0]==null){
        //     return res.status(404).json({
        //         'data':[],
        //         'message':'aucun message trouve'
        //     });
        // }
            return res.status(200).json({
                'data': (getMessage)
             })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            'get':false,
            'error': console.log('erreur sur le serveur:',error)
        })
    }
},
//=======
  async deleteMessage(req: Request, res: any) {
    try {
      let id = req.params.id;
      const checkid = await message.findByPk(id);
      if (!checkid) {
        return res.status(404).json({
          message: "aucun message trouve",
        });
      }
      await message.destroy({
        where:{
          idMessage:id
        }
      })
        return res.status(201).json({
          send: true,
          message: "message supprime avec sucess!!",
        });
    
      //return res.status(404).json({ message: "veuillez fournir les donnees" });
    } catch (error) {
      return res.status(500).json({
        message: "echec de l'envoi",
        erreur: console.log(error),
      });
    }
  },
//>>>>>>> vf1/vf1

  //@route /api/admin/message
  //@method delete
  //@response true ? false

  //suppression dun message

  //liste des message d'un utilisateur

  /*async getMessage(req: Request, res: any) {
    try {
      const id = req.params.id;
      const information = await message.findAll({
        where: {
          idUser: id,
        },

        include: [
          {
            model: User,
            attributes: ["idUser", "nom", "prenom", "tel"],
          },
        ],
        attributes: ["contenus"],
      });

      if (information[0] == null) {
        return res.status(404).json({
          data: [],
          message: "aucun message trouve pour ce client",
        });
      }
      return res.status(200).json({
        data: crypt.encode(information),
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "erreur du serveur",
      });
    }
  },*/

  //@route /api/admin/detail-message
  //@method get
  //@response true ? false
};
export default gest_message;
