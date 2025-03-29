import { Request, Response } from "express";
import { GestionArticle } from "../repositry/gestion_articles";
import { crypt } from "../config/crypto-js";
import { Articles } from "../repositry/objets/article";
import { GestionImage } from "../repositry/gestion_images";

//@route /api/admin/article
//@method POST
//@bodyparams :true
const ArticleController = {
  async create(req: Request, res: any) {
    console.log("before try");
    try {
      console.log("first In");
      // Vérification, si des erreurs de validation sont présentes
      if (!req.body.errors) {
        // Si req.body.errors n'existe pas, alor la validation a réussi
        // Les données sont validées et disponibles dans req.body
        let article: any;

        article = req.body as Articles;
        const resp = await GestionArticle.save(article);
        const imgAssigment = await GestionImage.articleImageAssigment(
          resp.idArticle,
          article.imgsID
        );
        console.log("enter before response");
        const response = {
          articleData: resp,
          imgsID: imgAssigment,
        };
        return res
          .status(200)
          .json([{ data: crypt.encode(response), done: true }]);
      } else {
        console.log("something wrong");
        // La validation a échoué, les erreurs sont dans req.body.errors
        return res.status(401).json({ message: req.body.errors[0].msg });
      }
    } catch (err: any) {
      return res.status(400).send([{ ErrorMessage: err.message }]);
    }
  },

  //@route /api/article
  //@method PUT
  //@bodyparam :true
  async update(req: Request, res: any) {
    try {
      if (!req.body.errors) {
        let article: any;

        article = req.body as Articles;
        const resp = await GestionArticle.update(article);
        return resp
          ? res.status(200).json([
              {
                isDone: true,
                data: crypt.encode(resp),
                message: "Mise à jour effectué avec succés",
              },
            ])
          : res.status(200).json([]);
      } else {
        return res.status(400).json({ message: req.body.errors[0].msg });
      }
    } catch (error: any) {
      return res.status(400).send([{ message: error.message }]);
    }
  },

  //@route /api/admin/article
  //@method delete
  //@urlparams :id

  async destroy(req: Request, res: any) {
    try {
      if (req.params.id) {
        const id = crypt.idOnUrlDecoder(req.params.id);
        const resp = await GestionArticle.destroy(id);
        const message =
          resp == 0
            ? "Aucun article supprimé"
            : "Suppréssion éffectuer avec succés !";

        return res
          .status(200)
          .json([{ done: resp != 0, affectedRows: resp, message: message }]);
      } else {
        return res
          .status(400)
          .json([{ done: false, id: req.params.id, message: "ID indéfini" }]);
      }
    } catch (error: any) {
      return res.status(400).send([{ message: error.message }]);
    }
  },

  //@route /api/article-details
  //@method GET
  //@urlparams :id
  async getOne(req: Request, res: any) {
    try {
      if (req.params.id) {
        const id = crypt.idOnUrlDecoder(req.params.id);

        const resp = await GestionArticle.getOne(id);

        return resp.length != 0
          ? res.status(200).json([{ data: crypt.encode(resp) }])
          : res.status(200).json([]);
      } else {
        return res.status(400).json([{ message: "Id de l'article indefini " }]);
      }
    } catch (error: any) {
      return res.status(400).send([{ message: error.message }]);
    }
  },

  //@route /api/article-promo
  //@method GET
  //@urlparams :offset
  async getArticlesOnPromo(req: Request, res: any) {
    //Obtention des articles sous promo

    try {
      if (req.params.offset) {
        const data = await GestionArticle.getArticleOnPromo(
          Number.parseInt(req.params.offset)
        );

        return data
          ? res.status(200).json([{ data: crypt.encode(data) }])
          : res.status(200).json([]);
      } else {
        //numéro de debut de selection d'article pas défini

        const data = await GestionArticle.getArticleOnPromo(1);

        return data.length != 0
          ? res.status(200).json([{ data: crypt.encode(data) }])
          : res.status(200).json([]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },

  //@route /api/article-categorie
  //@method GET
  //@urlparams :id
  async getByCategorie(req: Request, res: any) {
    try {
      if (req.params.id) {
        const id = crypt.idOnUrlDecoder(req.params.id);

        const resp = await GestionArticle.getByCategories(id);

        return resp.length != 0
          ? res.status(200).json([{ data: crypt.encode(resp) }])
          : res.status(200).json([]);
      } else {
        return res
          .status(400)
          .send([{ message: "Id de la categorie indefini" }]);
      }
    } catch (error: any) {
      return res.status(400).send([{ message: error.message }]);
    }
  },

  //@route /api/article
  //@method GET
  //@urlparams :offset
  async getAll(req: Request, res: any) {
    try {
      if (req.params.offset) {
        const data = await GestionArticle.getAll(
          Number.parseInt(req.params.offset)
        );

        return data.length != 0
          ? res.status(200).json([{ data: crypt.encode(data) }])
          : res.status(200).json([]);
      } else {
        const data = await GestionArticle.getAll(1);

        return data.length != 0
          ? res.status(200).json([{ data: crypt.encode(data) }])
          : res.status(200).json([]);
      }
    } catch (error: any) {
      return res.status(400).send([{ message: error.message }]);
    }
  },

  //@route /api/admin/article-changes-categorie
  //@method PUT
  //@bodyparams :true
  async updateCategories(req: Request, res: any) {
    //changer la catégorie d'un article
    try {
      if (!req.body.errors) {
        const { idArticle, new_categorieId } = req.body;

        const resp = await GestionArticle.updateCategories(
          idArticle,
          new_categorieId
        );

        return resp
          ? res
              .status(200)
              .json([{ message: "Mise à jour effectué !", resp: resp }])
          : res
              .status(201)
              .json([{ message: "Aucune Modification éffectué !" }]);
      } else {
        return res.status(400).json([{ message: "IDs manquants !" }]);
      }
    } catch (error: any) {
      return res.status(400).json([{ message: error.message }]);
    }
  },
};

export { ArticleController };
