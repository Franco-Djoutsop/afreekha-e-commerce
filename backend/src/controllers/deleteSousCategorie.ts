import { Request,response,Response } from "express";
import SousCategorie from "../models/SousCategorie";

const deleteSousCategorie = async(req:Request,res:Response) =>{
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
}
export default deleteSousCategorie