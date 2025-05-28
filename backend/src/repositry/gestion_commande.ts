import { Op, where } from "sequelize";
import Article from "../models/Article";
import Commande from "../models/Commande";
import User from "../models/User";
import { Commande as Commande_model } from "./objets/commande";
import Categorie from "../models/categorie";
import { GestionFacture } from "./gestion_facture";
import { crypt } from "../config/crypto-js";

const GestionCommande = {
  async create(commande: Commande_model) {
    const queryRslt = await Commande.create(commande);

    return queryRslt;
  },

  async verifyArticlesExist(ids: number[]) {
    const articles = await Article.findAll({
      attributes: [
        "idArticle",
        "nom_article",
        "promo",
        "pourcentage_promo",
        "prix",
        "quantite",
      ],
      where: {
        idArticle: {
          [Op.in]: ids,
        },
      },
    });

    return articles.length === ids.length
      ? { exist: true, articles: articles }
      : { exist: false, articles: [] };
  },

  async supprimer(id: number) {
    const queryRslt = await Commande.destroy({
      where: {
        idCommande: id,
      },
    });

    return queryRslt;
  },

  async changeStatus(status: string, id: number) {
    const queryRslt = await Commande.update(
      { statut: status },
      {
        where: {
          idCommande: id,
        },
      }
    );

    return queryRslt;
  },

  async getUserTotalCommmadePay(idUser: number) {
    //montant total d toutes les commandes payé de l'utilisateur
    const sommeTotal = await Commande.sum("Montant_total", {
      where: { idUser: idUser, statut: "payé" },
    });

    return sommeTotal;
  },
  async getUserTotalCommmade(idUser: number) {
    //toutes les commandes de l'utilisateur
    const nber = await Commande.count({
      where: { idUser: idUser },
    });
    return nber;
  },

  async getUserTotalCommandeNotPay(idUser: number) {
    //somme de toutes les commandes de l'utilisateur en attente de paiement
    const sommeTotal = await Commande.sum("Montant_total", {
      where: { idUser: idUser, statut: "en cours" },
    });

    return sommeTotal;
  },

  async getCommandOwner(idUser: number) {
    const commandsWithUsers = await Commande.findAll({
      where: { idUser: idUser },
    });

    return commandsWithUsers;
  },

  async getAllCommande() {
    try {
      const data = await GestionFacture.getFactureCommandUser(0);
      return data.length != 0 ? [{ data: crypt.encode(data) }] : [];
    } catch (error: any) {
      return [{ message: error.message }];
    }
  },
  async getTotalSeller() {
    try {
      const totalVentes = await Commande.count({
        where: { statut: "payé" }, // Filtrer uniquement les commandes payées
      });

      console.log(`Nombre total de ventes : ${totalVentes}`);
      return totalVentes;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de ventes:",
        error
      );
    }
  },

  async getTotalCommandePending() {
    try {
      const totalVentes = await Commande.count({
        where: { statut: "en attente" }, // Filtrer uniquement les commandes payées
      });

      console.log(`Nombre total de ventes en attente : ${totalVentes}`);
      return totalVentes;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de ventes:",
        error
      );
    }
  },
  async getTotalCommande() {
    try {
      const totalVentes = await Commande.count();

      console.log(`Nombre total de ventes : ${totalVentes}`);
      return totalVentes;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du nombre de ventes:",
        error
      );
    }
  },

  async getGeneralAmount() {
    try {
      const totalAmount = await Commande.sum("Montant_total", {
        where: { statut: "payé" },
      });

      return totalAmount;
    } catch (error: any) {
      console.log("erreur lors du calcul", error.message);
    }
  },

  async getTotalCategorie() {
    try {
      const totalCategorie = Categorie.count();
      return totalCategorie;
    } catch (error: any) {
      console.log("erreur lors du calcul", error.message);
    }
  },
};

export { GestionCommande };
