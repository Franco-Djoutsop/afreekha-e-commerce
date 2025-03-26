import { sequelize } from "../config/database";
import Article from "../models/Article";
import CommandArticle from "../models/CommandArticle";
import Commande from "../models/Commande";
import User from "../models/User";
import { Facture } from "./objets/facture";

const GestionFacture = {
  async create(facture: Facture) {
    try {
      const records = facture.idArtice.map((id) => ({
        idCommande: facture.idCommande,
        idArticle: id,
      }));

            const queryRslt = await CommandArticle.bulkCreate(records);
            return queryRslt;
        } catch (error: any) {
            console.log('erreur de creation', error.message);
        }
    },


    async getFactureCommandUser(offset: number){
        const articlesWithFacturesAndUsers = await Commande.findAll({
            offset: offset,
            limit: 15,
            
            order: [
                ['idCommande', 'DESC']
            ],
            include: [
              {
                model: User,
                attributes: ["idUser", "nom", "prenom", "email", "tel"], // Sélectionne uniquement ces colonnes
              },
              {
                model: Article,
                attributes: ["idArticle", "nom_article", "prix"],
                through: {
                  attributes: ['quantite'], // Récupérer la quantité de chaque article commandé
                }
              }      
            ]
          });
        
          return articlesWithFacturesAndUsers;
    },

    async getFactureOfUser(offset: number, idUser: number){
        const facturesOfUser = await Commande.findAll({
            limit: 15,
            offset: offset,
            where: {idUser: idUser},
            include: [
              {
                model: Article,
                 // INNER JOIN avec Article
                through: {
                  attributes: ['quantite']
                }
              },
              {
                model: User,
                //required: true,
                attributes: ["idUser", "nom", "prenom", "tel"], 
              }
              
            ],
          });

          return facturesOfUser;
    },

};

export { GestionFacture };
