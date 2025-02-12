import { Request, Response } from 'express';
import message from '../models/Message';

 const createMessage = async (req: Request,res:Response) => {
    try{
        const data = req.body;
        await message.create({
            'idUser': data.idUser,
            'contenus': data.contenus,
        });
      return  res.status(201).json({
        'send': true,
        'message': 'message envoyez avec sucess!!'
    });
    }catch(error){
       return res.status(500).json({ 
        'message' : "echec de l'envoi",
        'erreur': console.log(error)
});
    }   
};

export default createMessage;