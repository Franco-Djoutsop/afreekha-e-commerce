import Commande from "../models/Commande";
import User from "../models/User";
import { Commande as Commande_model } from "./objets/commande";

const GestionCommande = {
  async create(commande: Commande_model) {
    const queryRslt = await Commande.create(commande);

    return queryRslt;
  },

  async supprimer(id: number) {
    const queryRslt = await Commande.destroy({
      where: {
        idCommande: id,
      },
    });

    return queryRslt;
  },

  async getCommandOwner(idCommande: number, idUser: number) {
    const commandsWithUsers = await Commande.findAll({
      where: { idCommande: idCommande },
      include: [
        {
          model: User,
          required: true,
        },
      ],
    });

    return commandsWithUsers;
  },
};

export { GestionCommande };
