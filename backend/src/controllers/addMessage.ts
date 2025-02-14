import { Request, Response } from 'express';
import message from '../models/Message';

//@route/message/addMessage
//@mathod post
//@data = objet, response true ? false

//envoi d'un message

 const createMessage = async (req: Request,res:Response) => {
    try{
        const data = req.body;

        if(data != null){
            await message.create({
                'idUser': data.idUser,
                'contenus': data.contenus,
            });
          return  res.status(201).json({
            'send': true,
            'message': 'message envoyez avec sucess!!'
        });
        } 
        return res.status(404).json({message:'veuillez fournir les donnees'});
       
    }catch(error){
       return res.status(500).json({ 
        'message' : "echec de l'envoi",
        'erreur': console.log(error)
});
    }   
};

export default createMessage;