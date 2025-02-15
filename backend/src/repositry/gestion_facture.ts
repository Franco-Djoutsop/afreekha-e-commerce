import Article from "../models/Article";
import CommandArticle from "../models/CommandArticle";
import Commande from "../models/Commande";
import User from "../models/User";
import { Facture } from "./objets/facture";

const GestionFacture = {
    async create(facture: Facture){
        try {
            const records = facture.idArtice.map(id=> (
                {
                    idCommande: facture.idCommande,
                    idArticle: id
                }
            ));

            const queryRslt = await CommandArticle.bulkCreate(records);
            return queryRslt;
        } catch (error: any) {
            console.log('erreur de creation', error.message);
        }
    },

    async changeStatus(status: string, id: number){
        const queryRslt = await CommandArticle.update(
            {statut: status},
            {
                where: {
                    idCommandArticle: id
                }
            }
        );

        return queryRslt;
    },

    async getFactureCommandUser(offset: number){
        const articlesWithFacturesAndUsers = await CommandArticle.findAll({
            offset: offset,
            limit: 15,
            order: [
                ['idCommandArticle', 'DESC']
            ],
            include: [
              {
                model: Article,
                required: true,
                include: [
                  {
                    model: Commande,
                    required: true,
                    include: [
                      {
                        model: User,
                        required: true,
                        attributes: ["idUser", "nom", "prenom", "email", "tel"], // Sélectionne uniquement ces colonnes
                      },
                    ],
                  },
                ],
              },
            ],
          });

          return articlesWithFacturesAndUsers;
    },

    async getFactureOfUser(offset: number, idUser: number){
        const facturesOfUser = await CommandArticle.findAll({
            limit: 15,
            offset: offset,
            include: [
              {
                model: Commande,
                required: true,
                where: { idUser: idUser },
                include: [
                  {
                    model: User,
                    required: true,
                    attributes: ["idUser", "nom", "prenom", "tel"], 
                  },
                ],
              },
              {
                model: Article,
                required: true, // INNER JOIN avec Article
              },
            ],
          });

          return facturesOfUser;
    }


}

export {GestionFacture};