import { Request , Response } from "express";
import messages from "../models/Message";

//@route /message/deleteMessage
//@method delete
//@response true ? false

//suppression dun message

const deleteMessage =  async (req:Request,res:Response) =>{
    try{
       let id = req.params.id
       const checkid = await messages.findByPk(id);
       if(!checkid){
        return res.status(404).json({
            "message":"aucun message trouve"
        });
       }
       await messages.destroy({
        where:{
            'idMessage': id
        }
       });
       return res.status(200).json({
        "message":"suppression reussi"
       });
       
    }catch(error){
      console.log(error);
      res.status(500).json({
        "message":"erreur sur le serveur"
      });
    }

}

export default deleteMessage;