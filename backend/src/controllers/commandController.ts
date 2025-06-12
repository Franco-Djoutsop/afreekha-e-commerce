import { Request } from "express";
import { GestionCommande } from "../repositry/gestion_commande";
import { crypt } from "../config/crypto-js";
import Article from "../models/Article";
import Commande from "../models/Commande";
import { GestionCommandeArticle } from "../repositry/gestion_commandeArticle";
import { GestionArticle } from "../repositry/gestion_articles";
import { GestionExpressUser } from "../repositry/gestion_express_user";

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
          isExpressOrder: boolean;
          statut: string;
          idAdresse: number | null;
          userData: {nom: string, prenom: string, tel: string, express_adresse: string} | null
        };

        let commande_toSave: Commande = new Commande();
        let articlesID: { idArticle: number; qty: number }[] = [];
        let ids: number[] = [];
        let commande_article: {
          idArticle: number;
          idCommande: number;
          quantite: number;
          prix_achat: number,
          prix_total: number
        }[] = [];

        if(!data.isExpressOrder){
          if(!data.idUser){
              throw new Error("Veuillez vous connecter ou créer un compte")
          }
        }

        if (data.article.length != 0) {
          let quantite_articles = data.article.length;
          let total = 0;

          data.article.forEach(
            (art: { product_id: number; quantity: number }) => {
              ids.push(art.product_id);
            }
          );
          const addedUser = data.isExpressOrder ? (await GestionExpressUser.create(data.userData) as any) : null;

          commande_toSave.quantite_articles = quantite_articles;
          commande_toSave.idUser = data.isExpressOrder ? addedUser.idUser : data.idUser;
          commande_toSave.statut = data.statut;
          commande_toSave.idAdresse = data.idAdresse ? data.idAdresse : null;

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

                  const index = verificationRslt.articles.findIndex(
                    (val) => val.idArticle === art.product_id
                  );
                  const prix = (verificationRslt.articles[index].promo && verificationRslt.articles[index].pourcentage_promo) ? verificationRslt.articles[index].prix - (verificationRslt.articles[index].prix * verificationRslt.articles[index].pourcentage_promo) /100 : verificationRslt.articles[index].prix; 
                  commande_article.push({
                    idArticle: art.product_id,
                    idCommande: resp.idCommande,
                    quantite: art.quantity,
                    prix_achat: prix,
                    prix_total: (prix * art.quantity)
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
          .json([{ message: "Erreurs sur les données de traitement!", error: req.body }]);
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
