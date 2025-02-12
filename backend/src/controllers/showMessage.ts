import { Request, Response } from "express";
import messages from "../models/Message";
import User from "../models/User";

const getMessage = async(req:Request, res:Response) =>{
    try{
        const id = req.params.id;
        const information = await messages.findAll(
            {  
                where:
                {
                    idUser:id,       
                },
            
                include:[
                    { 
                        model:User, attributes:['idUser','nom','prenom','tel']
                    },
                ],
                attributes:['contenus'],
            }
        )
        if(information[0]==null){
            return res.status(404).json({
                'data':[],
                'message':'aucun message trouve pour ce client'
            });
        }
            return res.status(200).json({
                'data': information
             })
       
    }catch(error){
       console.log(error);
       return res.status(500).json({
        'message':'erreur du serveur'
       })
    }
}
export default getMessage;