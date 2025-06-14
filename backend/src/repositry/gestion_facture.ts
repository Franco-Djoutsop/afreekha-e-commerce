import { sequelize } from "../config/database";
import Adresse from "../models/Adresse";
import Article from "../models/Article";
import CommandArticle from "../models/CommandArticle";
import Commande from "../models/Commande";
import Image from "../models/image";
import User from "../models/User";
import { Articles } from "./objets/article";
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
            order: [
                ['idCommande', 'DESC']
            ],
            include: [
              {
                model: User,
                attributes: ["idUser", "nom", "prenom", "email", "tel", "express_adresse"], // Sélectionne uniquement ces colonnes
              },
              {
                model: Article,
                attributes: ["idArticle", "nom_article", "prix"],
                through: {
                  attributes: ['quantite', 'prix_achat', 'prix_total'],
                  as: "total_article" // Récupérer la quantité de chaque article commandé
                },
                include: [
                  {
                    model: Image,
                    attributes: ['lien'],
                  }
                ],
                as: 'articles',
              },
              {
                 model: Adresse
              }    
            ]
          });
        
          return articlesWithFacturesAndUsers;
    },

    async getFactureOfUser(offset: number, idUser: number){
        const facturesOfUser = await Commande.findAll({
            limit: 30,
            offset: offset,
            where: {idUser: idUser},
            include: [
              
              {
                model: User,
                //required: true,
                attributes: ["idUser", "nom", "prenom", "tel"], 
              },
              {
                model: Article,
                 // INNER JOIN avec Article
              
                through: {
                  attributes: ['quantite'],
                  as: "total_article"
                },
                include: [
                  {
                    model: Image,
                    attributes: ['lien']
                  },
                ],
                as: 'articles',
              }
              
            ],
          });

          return facturesOfUser;
    },

};

export { GestionFacture };
