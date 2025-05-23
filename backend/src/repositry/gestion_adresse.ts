import Adresse from "../models/Adresse";
import Role from "../models/Role";
import User from "../models/User";
import { AdresseModel } from "./objets/adresse";

const GestionAdresse = {
  async create(adress: AdresseModel) {
    const resp = await Adresse.create(adress as any);

    return resp;
  },

  async update(newAdresse: AdresseModel) {
    const resp = await Adresse.update(
      {
        titre: newAdresse.titre,
        adresse: newAdresse.adresse,
        pays: newAdresse.pays,
        ville: newAdresse.ville,
        etat: newAdresse.etat,
        numero_telepone: newAdresse.numero_telepone,
        quartier: newAdresse.quartier,
      },
      {
        where: {
          idAdresse: newAdresse.idAdresse,
          idUser: newAdresse.idUser,
        },
      }
    );
    return resp;
  },

  async delete(id: number) {
    const resp = await Adresse.destroy({
      where: {
        idAdresse: id,
      },
    });

    return resp;
  },
  async getAll(idUser: number) {
    const dataRetrieve = await Adresse.findAll({
      where: {
        idUser: idUser,
      },
    });

    return dataRetrieve;
  },
  async getUserDetails(idUser: number) {
    try {
      const user = await User.findByPk(idUser, {
        attributes: { exclude: ["mot_de_passe"] },
        include: [{ model: Role, as: "roles" }],
      });
      console.log("idUser dans quel infos:", idUser);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      return user;
    } catch (error) {
      console.error("Erreur dans getUserDetails:", error);
      throw error;
    }
  },
};

export { GestionAdresse };
