import { Op } from "sequelize";
import Article from "../models/Article";
import Commande from "../models/Commande";
import User from "../models/User";
import { Commande as Commande_model } from "./objets/commande";

const GestionCommande = {
    async create(commande: Commande_model){
        const queryRslt = await Commande.create(commande);

    return queryRslt;
  },

  async verifyArticlesExist(ids: number[]) {
    const articles = await Article.findAll({
        where: {
            idArticle: {
                [Op.in]: ids
            }
        }
    });

    return articles.length === ids.length;
},

  async supprimer(id: number) {
    const queryRslt = await Commande.destroy({
      where: {
        idCommande: id,
      },
    });

    return queryRslt;
  },

    async changeStatus(status: string, id: number){
      const queryRslt = await Commande.update(
          {statut: status},
          {
              where: {
                  idCommande: id
              }
          }
      );

      return queryRslt;
  },

    async getCommandOwner(idCommande: number, idUser: number){
     const commandsWithUsers = await Commande.findAll({
            where: { idCommande: idCommande}, 
            include: [
              {
                model: User,
                required: true,
              },
            ],
          });

    return commandsWithUsers;
  },

  async getTotalSeller() {
    try {
        const totalVentes = await Commande.count({
            where: { statut: 'payé' } // Filtrer uniquement les commandes payées
            
        });

        console.log(`Nombre total de ventes : ${totalVentes}`);
        return totalVentes;
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre de ventes:', error);
    }
  },

  async getTotalCommande() {
    try {
        const totalVentes = await Commande.count({
            where: { statut: 'en attente' } // Filtrer uniquement les commandes payées
            
        });

        console.log(`Nombre total de ventes : ${totalVentes}`);
        return totalVentes;
    } catch (error) {
        console.error('Erreur lors de la récupération du nombre de ventes:', error);
    }
  },

  async getGeneralAmount(){

    try {
      const totalAmount = await Commande.sum('Montant_total', {
        where: { statut: 'payé' }
      });
     
      return totalAmount;
    } catch (error: any) {
      console.log('erreur lors du calcul', error.message)
    }
  }
};

export { GestionCommande };
