import { Request, Response } from "express";
import { GestionImage } from "../repositry/gestion_images";
import { crypt } from "../config/crypto-js";
import dotenv from "dotenv";

dotenv.config();

const ImageController = {
  //@route /api/admin/image
  //@method POST
  //@urlbody :true
  async create(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        const dossier = process.env.IMG_URL as string;

        const { base64Encryption, contentType, featured, collection, position } = req.body;

        const resp = await GestionImage.createImg(
          base64Encryption,
          dossier,
          contentType,
          featured,
          collection,
          position
        );
        //>>>>>>> vf0/vf0

        return typeof resp != "string"
          ? res.status(200).json([{ data: (resp.dataValues) }])
          : res.status(200).json([]);
      } else {
        return res
          .status(400)
          .json([
            { message: "Informations manquantes pour continuer l'opération ! ", msg: req.body.errors},
          ]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  //@route /api/admin/image
  //@method PUT
  //@urlbody :true
  async update(req: Request, res: any) {
    //remplacer ou changer l'image deja existante d'un article

    try {
      if (!req.body.errors) {
        const {collection, idImage, position, featured } = req.body;

        const resp = await GestionImage.update(
          collection,
          idImage,
          position,
          featured
        );
        console.log("controller verif if it work", resp);

        return typeof resp != "string"
          ? res.status(200).json([{ data: crypt.encode(resp) }])
          : res.status(200).json([]);
      } else {
        return res
          .status(400)
          .json([
            { message: "Informations manquantes pour continuer l'opération !", error: req.body.errors },
          ]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  //@route /api/admin/image
  //@method DELETE
  //@urlparams :true
  async destroy(req: Request, res: any) {
    try {
      const ids = req.body.ids; 
      
      if (Array.isArray(ids) && ids.length > 0) {
        const resp = await GestionImage.destroyMultiple(ids);
  
        const message =
          resp.deletedCount == 0 || !resp
            ? "Aucune Image supprimée"
            : `${resp.deletedCount} image(s) supprimée(s) avec succès !`;
  
        return res
          .status(200)
          .json([{ done: resp.deletedCount != 0, affectedRows: resp, message: message }]);
      } else {
        res.status(400).json([{message: "Aucun ID fourni pour la suppression."}]);
        return;
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  async destroyOne(req : Request, res: any){
      try {
        return res.status(200).json([{done: GestionImage.destroyOne(Number.parseInt(req.params.id)) }])
      } catch (error: any) {
        return res.status(400).json([{ message: error.message }]);    
      }
  },

  async getImage(req: Request, res: any) {
    try {
      const imgNbr = await GestionImage.countImage();
      if(req.query.paginate && req.query.page){
            const paginate = Number.parseInt(req.query.paginate as string);
            const page = Number.parseInt(req.query.page as string);
            const offset = ((page - 1) * paginate);
            const imgData = await GestionImage.getAll(offset, paginate);

            return res.status(200).json([{data: imgData, total: imgNbr}]);
      }else{
        const imgData = await GestionImage.getAll();

        return res.status(200).json([{data: imgData, total: imgNbr}]);

      }
      
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },
};

export { ImageController };
