import { GestionAdresse } from "../repositry/gestion_adresse";
import { Request } from "express";
import { crypt } from "../config/crypto-js";

const AdresseController = {
  async create(req: Request, res: any) {
    try {
      console.log("before");
      if (!req.body.errors) {
        const resp = await GestionAdresse.create(req.body);
        console.log("response", resp);
        return res.status(200).json([{ data: crypt.encode(resp.dataValues) }]);
      } else {
        return res.status(404).json({ messageError: "something wrong" });
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  async update(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        const resp = await GestionAdresse.update(req.body);
        return res.status(200).json([{ data: crypt.encode(resp) }]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  async delete(req: Request, res: any) {
    try {
      if (req.params.id) {
        const resp = await GestionAdresse.delete(
          Number.parseInt(req.params.id)
        );
        return res.status(200).json([{ data: crypt.encode(resp) }]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },
};

export { AdresseController };
