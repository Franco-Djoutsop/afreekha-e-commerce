import express, { Express } from "express";
import  {ArticleController}  from "../controllers/articleController";
import { ImageController } from "../controllers/imageContoller";
import { crypt } from "../config/crypto-js";
import { createArticleValidation, updateArticleValidation, createImgValidation, updateArticleImg } from "../middlewares/validation";

const router = express.Router();

//client route
router.route("/").get((req, res) => {
  res.status(200).json({ message: "displays lists of users" });
});

router.post("/article", crypt.decode, createArticleValidation, ArticleController.create);
router.put('/article', crypt.decode, updateArticleValidation, ArticleController.update)
router.delete('/article/:id', ArticleController.destroy);
router.put('/article-changes-categorie', crypt.decode, ArticleController.updateCategories)
router.post('/image', createArticleValidation, ImageController.create);
router.put('/image', updateArticleImg, ImageController.update);
router.delete('/image/:id', ImageController.destroy);

export default router;
