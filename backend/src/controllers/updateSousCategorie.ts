import { Request,Response } from "express";
import updatesouscategorie from "../models/SousCategorie";

//@route /sousCategorie/updateSousCategorie
//@method put
//@response true ? false

//mise a jour des information des sous categorie
const updateSousCategorie = async(req:Request,res:Response) =>{
    try{
        let id = req.params.id;
        const data = req.body;
        const checkid = await updatesouscategorie.findByPk(id);
        if(!checkid){
            return res.status(404).json({'message':'echec de le modification','update':false});
        }
        await updatesouscategorie.update({'nom':data.nom},
            { 
            where:{
                idSousCategorie:id
           }});

    }catch(error){
        console.log(error);
        return res.status(500).json({'messade':'erreur sur le server'});
    }
}
export default updateSousCategorie;