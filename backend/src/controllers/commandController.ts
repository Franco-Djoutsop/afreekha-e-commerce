import { Request } from "express";
import { GestionCommande } from "../repositry/gestion_commande";
import { crypt } from "../config/crypto-js";

const CommandeController = {
  //@route /api/commande
  //@method POST
  //@bodyparam :true
  async create(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        const result = await GestionCommande.create(req.body);
        console.log("first");
        return res
          .status(200)
          .json([{ message: "Commande crée !", data: crypt.encode(result) }]);
      } else {
        return res
          .status(400)
          .json([{ message: "Erreurs sur les données de traitement!" }]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },
  //@route /api/commande
  //@method DELETE
  //@urlparam :true
  async delete(req: Request, res: any) {
    try {
      if (req.params.id) {
        const rslt = await GestionCommande.supprimer(
          crypt.idOnUrlDecoder(req.params.id)
        );

        return rslt != 0
          ? res.status(200).json([{ done: true }])
          : res.status(200).json([]);
      }
    } catch (error: any) {
      res.status(400).json([{ message: error.message }]);
    }
  },

  //@route /api/commande
  //@method GET
  //@bodyparams :true
  async getCommad(req: Request, res: any) {
    try {
      if (req.params.idArticle && req.params.idUser) {
        const result = await GestionCommande.getCommandOwner(
          Number.parseInt(req.params.idArticle),
          Number.parseInt(req.params.idArticle)
        );

        return result.length != 0
          ? res
              .status(200)
              .json({ data: crypt.encode(result) }, { data: result })
          : res.status(200).json([]);
      } else {
        res.status(400).json([{ message: "Informations manquantes" }]);
      }
    } catch (error: any) {
      res.status(400).json([{ message: error.message }]);
    }
  },
};

export { CommandeController };
