import { Request } from "express";
import { GestionCommande } from "../repositry/gestion_commande";
import { crypt } from "../config/crypto-js";
import Article from "../models/Article";
import Commande from "../models/Commande";
import { GestionCommandeArticle } from "../repositry/gestion_commandeArticle";
import { GestionArticle } from "../repositry/gestion_articles";

const CommandeController = {
  //@route /api/commande
  //@method POST
  //@bodyparam :true
  async create(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        console.log("enter");
        const data = req.body as {
          article: { product_id: number; quantity: number }[];
          idUser: number;
          statut: string;
          idAdresse: number;
        };

        let commande_toSave: Commande = new Commande();
        let articlesID: { idArticle: number; qty: number }[] = [];
        let ids: number[] = [];
        let commande_article: {
          idArticle: number;
          idCommande: number;
          quantite: number;
        }[] = [];

        if (data.article.length != 0) {
          let quantite_articles = data.article.length;
          let total = 0;

          data.article.forEach(
            (art: { product_id: number; quantity: number }) => {
              ids.push(art.product_id);
            }
          );

          commande_toSave.quantite_articles = quantite_articles;
          commande_toSave.idUser = data.idUser;
          commande_toSave.statut = data.statut;
          commande_toSave.idAdresse = data.idAdresse;

          //verification de l'existence des articles
          const verificationRslt = await GestionCommande.verifyArticlesExist(
            ids
          );

          // Vérifier les stok
          for (const { product_id, quantity } of data.article) {
            const article = verificationRslt.articles.find(
              (a) => a.idArticle === product_id
            );

            if (!article) {
              throw new Error(`Un Article introuvable dans votre commande !`);
            }
            if (article.quantite < quantity) {
              throw new Error(
                `Stock insuffisant pour l'article '${article.nom_article}', quantité disponible: ${article.quantite}`
              );
            }
          }
          if (verificationRslt.exist) {
            //tous les articles existent dans la bd, proceder au calcule du montant de chque article et du montant total

            verificationRslt.articles.forEach((art: Article) => {
              const index = data.article.findIndex(
                (val) => val.product_id === art.idArticle
              );
              if (art.promo && art.pourcentage_promo) {
                const price_promo =
                  art.prix - (art.prix * art.pourcentage_promo) / 100;
                total += price_promo * data.article[index].quantity;
              } else {
                //article pas du tout en promo
                total += art.prix * data.article[index].quantity;
              }
            });

            commande_toSave.Montant_total = total;

            const resp = await GestionCommande.create(
              commande_toSave.dataValues
            );

            if (resp) {
              data.article.forEach(
                (art: { product_id: number; quantity: number }) => {
                  articlesID.push({
                    idArticle: art.product_id,
                    qty: art.quantity,
                  });
                  commande_article.push({
                    idArticle: art.product_id,
                    idCommande: resp.idCommande,
                    quantite: art.quantity,
                  });
                }
              );

              const commandPivotInsertion = await GestionCommandeArticle.create(
                commande_article as any[]
              );

              const updateProductQty = (
                await GestionArticle.updateMultipleArticlesQty(
                  articlesID,
                  verificationRslt.articles
                )
              ).message;

              return res.status(200).json([
                {
                  message: "Commande crée !",
                  data: resp,
                  updateMsg: updateProductQty,
                  amountToBuy: total,
                },
              ]);
            }
          } else {
            throw new Error("Un Article Indisponible dans votre commande !");
          }
        } else {
          throw new Error("Aucun Article présent dans la commande !");
        }
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
        const rslt = await GestionCommande.supprimer(Number(req.params.id));

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
      if (req.params.idUser) {
        const result = await GestionCommande.getCommandOwner(
          Number.parseInt(req.params.idUser)
        );

        return result.length != 0
          ? res.status(200).json([{ data: crypt.encode(result) }])
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
